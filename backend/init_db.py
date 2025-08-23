# init_db.py
from app import app, db

# WARNING: This will DROP all existing tables and recreate them.
# Run this only if you don't need the old data.
if __name__ == "__main__":
    with app.app_context():
        print("⚠️ Dropping all existing tables...")
        db.drop_all()

        print("✅ Creating new tables...")
        db.create_all()

        print("🎉 Database tables reset successfully with updated schema!")
