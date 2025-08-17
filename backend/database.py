# === backend/database.py ===

import sqlite3
import os
from config import DB_PATH
from models import ResumeScore

os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)

def init_db():
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS resumes (
                id TEXT PRIMARY KEY,
                filename TEXT,
                resume_text TEXT,
                jd_text TEXT,
                score REAL,
                keyword_match REAL,
                formatting REAL,
                readability REAL,
                completeness REAL,
                suggestions TEXT
            )
        ''')
        conn.commit()

def insert_resume_entry(id, filename, resume_text, jd_text, score_data):
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO resumes (id, filename, resume_text, jd_text, score,
                                 keyword_match, formatting, readability, completeness, suggestions)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            id,
            filename,
            resume_text,
            jd_text,
            score_data['score'],
            score_data['keyword_match'],
            score_data['formatting'],
            score_data['readability'],
            score_data['completeness'],
            score_data['suggestions']
        ))
        conn.commit()

def get_all_entries():
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT id, filename, score, keyword_match, formatting, readability, completeness FROM resumes')
        rows = cursor.fetchall()
        return [ResumeScore(*row).to_dict() for row in rows]
