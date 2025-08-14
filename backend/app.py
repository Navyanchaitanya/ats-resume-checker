from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from models import db, ResumeAnalysis, User
from auth import auth_bp, verify_token
import PyPDF2
from scorer import overall_score
import json
import os

app = Flask(__name__)
CORS(app)

# ✅ Configure SQLite path inside /data
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'data/database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'super-secret-key'  # used for JWT

db.init_app(app)

# ✅ Register blueprint with /api prefix
app.register_blueprint(auth_bp, url_prefix='/api')

# ✅ Extract text from PDF
def extract_text_from_pdf(file):
    try:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        return text.strip()
    except Exception as e:
        print("❌ Error reading PDF:", e)
        return ""

@app.route('/')
def home():
    return "✅ ATS Resume Checker backend is running"

# ✅ UPDATED analyze route with Bearer token fix
@app.route('/analyze', methods=['POST'])
def analyze_resume():
    if 'resume' not in request.files or 'job_description' not in request.form:
        return jsonify({'error': 'Missing resume or job description'}), 400

    resume_file = request.files['resume']
    job_description = request.form['job_description']

    # ✅ Get token and extract actual JWT
    auth_header = request.headers.get('Authorization', '')
    token = auth_header.replace('Bearer ', '').strip()

    resume_text = extract_text_from_pdf(resume_file)
    jd_text = job_description.strip()

    if not resume_text or not jd_text:
        return jsonify({'error': 'Empty text content'}), 400

    # ✅ Get score
    score_data = overall_score(resume_text, jd_text)
    print("🔍 Raw score_data returned:", score_data)

    try:
        total_score = float(score_data.get("total", 0))
    except Exception:
        total_score = 0.0

    # ✅ Verify user from token
    user_id = None
    if token:
        user_id = verify_token(token)
        if not user_id:
            print("⚠️ Invalid token")

    # ✅ Save to database
    analysis = ResumeAnalysis(
        filename=resume_file.filename,
        resume_text=resume_text,
        jd_text=jd_text,
        total_score=total_score,
        similarity=score_data.get("similarity"),
        readability=score_data.get("readability"),
        completeness=score_data.get("completeness"),
        formatting=score_data.get("formatting"),
        grammar_score=score_data.get("grammar_score", 0),
        grammar_issues=json.dumps(score_data.get("grammar_issues", [])),
        matched_keywords=json.dumps(score_data.get("matched_keywords", [])),
        missing_keywords=json.dumps(score_data.get("missing_keywords", [])),
        user_id=user_id
    )

    db.session.add(analysis)
    db.session.commit()

    return jsonify({
        "score": score_data,
        "filename": resume_file.filename
    })

@app.route('/results', methods=['GET'])
def get_results():
    results = ResumeAnalysis.query.order_by(ResumeAnalysis.id.desc()).limit(10).all()
    formatted = []
    for r in results:
        formatted.append({
            "id": r.id,
            "filename": r.filename,
            "score": {
                "total": r.total_score,
                "similarity": r.similarity,
                "readability": r.readability,
                "completeness": r.completeness,
                "formatting": r.formatting,
                "grammar_score": r.grammar_score,
                "grammar_issues": json.loads(r.grammar_issues or "[]"),
                "matched_keywords": json.loads(r.matched_keywords or "[]"),
                "missing_keywords": json.loads(r.missing_keywords or "[]"),
            }
        })
    return jsonify(formatted)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
