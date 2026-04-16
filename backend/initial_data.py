import sys
import os
sys.path.append(os.getcwd())

from db.session import SessionLocal
from db.models.user import User
from core.security import get_password_hash

def init_db():
    db = SessionLocal()
    user = db.query(User).filter(User.username == "admin").first()
    if not user:
        user = User(
            username="admin",
            hashed_password=get_password_hash("admin123"),
            is_active=True,
        )
        db.add(user)
        db.commit()
        print("Admin user created")
    else:
        print("Admin user already exists")

if __name__ == "__main__":
    print("Creating initial data")
    init_db()
