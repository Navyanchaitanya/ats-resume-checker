from flask import Flask, request, jsonify
from flask_cors import CORS
import PyPDF2
from scorer import overall_score

app = Flask(__name__)
CORS(app)

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

@app.route('/analyze', methods=['POST'])
def analyze_resume():
    if 'resume' not in request.files or 'job_description' not in request.form:
        return jsonify({'error': 'Missing resume or job description'}), 400

    resume_file = request.files['resume']
    job_description = request.form['job_description']

    resume_text = extract_text_from_pdf(resume_file)
    jd_text = job_description.strip()

    if not resume_text or not jd_text:
        return jsonify({'error': 'Empty text content'}), 400

    score = overall_score(resume_text, jd_text)

    return jsonify({
        'score': score,
        'filename': resume_file.filename
    })

@app.route('/')
def home():
    return "✅ ATS Resume Checker backend is running"

if __name__ == '__main__':
    app.run(debug=True)
