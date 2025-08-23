from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    profession = db.Column(db.String(100))
    location = db.Column(db.String(100))
    bio = db.Column(db.Text)

    # ✅ relationship: a user can have many resume analyses
    analyses = db.relationship("ResumeAnalysis", backref="user", lazy=True)


class ResumeAnalysis(db.Model):
    __tablename__ = "resume_analysis"

    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(120))
    resume_text = db.Column(db.Text)
    jd_text = db.Column(db.Text)
    total_score = db.Column(db.Float)
    similarity = db.Column(db.Float)
    readability = db.Column(db.Float)
    completeness = db.Column(db.Float)
    formatting = db.Column(db.Float)
    grammar_score = db.Column(db.Float)
    grammar_issues = db.Column(db.Text)
    matched_keywords = db.Column(db.Text)
    missing_keywords = db.Column(db.Text)

    # ✅ foreign key linking to User
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=True)
