# init_db.py
from app import app, db

# This script is only needed once to bootstrap tables in your cloud DB
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        print("✅ Database tables created successfully in Postgres!")
