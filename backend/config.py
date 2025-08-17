# === backend/config.py ===

import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, 'uploads')
DB_PATH = os.path.join(BASE_DIR, 'data', 'ats_resume_checker.db')

DEBUG = True
ALLOWED_EXTENSIONS = {'pdf', 'docx'}
