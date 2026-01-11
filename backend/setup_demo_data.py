import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from passlib.context import CryptContext
from datetime import datetime

# Database setup
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017/medikal")
client = AsyncIOMotorClient(MONGO_URL)
db = client.medikal

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def create_demo_users():
    """Create demo users for testing"""
    demo_users = [
        {
            "username": "admin1",
            "email": "admin@medikal.rw",
            "full_name": "System Administrator",
            "password": "admin123",
            "role": "admin",
            "must_change_password": False
        },
        {
            "username": "patient1",
            "email": "patient1@medikal.rw",
            "full_name": "Jean Paul Uwimana",
            "password": "patient123",
            "role": "patient",
            "must_change_password": False
        },
        {
            "username": "doctor1",
            "email": "doctor1@medikal.rw",
            "full_name": "Dr. Sarah Johnson",
            "password": "doctor123",
            "role": "doctor",
            "department": "General Medicine",
            "specialization": "Internal Medicine",
            "must_change_password": False
        }
    ]
    
    print("🔄 Creating demo users...")
    for user_data in demo_users:
        # Check if user already exists
        existing_user = await db.users.find_one({"username": user_data["username"]})
        if not existing_user:
            # Hash password
            hashed_password = pwd_context.hash(user_data["password"])
            
            # Create user document
            user_doc = {
                "username": user_data["username"],
                "email": user_data["email"],
                "full_name": user_data["full_name"],
                "password": hashed_password,
                "role": user_data["role"],
                "status": "active",
                "department": user_data.get("department"),
                "specialization": user_data.get("specialization"),
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow(),
                "last_login": None,
                "must_change_password": user_data.get("must_change_password", False)
            }
            
            # Insert user
            result = await db.users.insert_one(user_doc)
            print(f"✅ Created user: {user_data['username']} (role: {user_data['role']}) - Password: {user_data['password']}")
        else:
            print(f"👤 User already exists: {user_data['username']}")

async def create_demo_patients():
    """Create demo patients for testing"""
    # Get the patient user ID
    patient_user = await db.users.find_one({"username": "patient1"})
    if not patient_user:
        print("❌ Patient user not found, skipping patient profiles")
        return
    
    demo_patients = [
        {
            "user_id": str(patient_user["_id"]),
            "full_name": "Jean Paul Uwimana",
            "phone": "+250 788 123 456",
            "national_id": "1234567890123456",
            "date_of_birth": "1990-01-15",
            "gender": "Male",
            "emergency_contact": "Marie Uwimana +250 788 123 457",
            "language_preference": "en"
        },
        {
            "user_id": "self_registered",
            "full_name": "Marie Mukamana",
            "phone": "+250 788 123 458",
            "national_id": "1234567890123457",
            "date_of_birth": "1985-03-22",
            "gender": "Female",
            "emergency_contact": "Jean Mukamana +250 788 123 459",
            "language_preference": "rw"
        }
    ]
    
    print("🔄 Creating demo patient profiles...")
    for patient_data in demo_patients:
        # Check if patient already exists
        existing_patient = await db.patients.find_one({"national_id": patient_data["national_id"]})
        if not existing_patient:
            patient_doc = {
                **patient_data,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
            
            result = await db.patients.insert_one(patient_doc)
            print(f"✅ Created patient profile: {patient_data['full_name']}")
        else:
            print(f"👤 Patient profile already exists: {patient_data['full_name']}")

async def main():
    print("🏥 Setting up Medikal demo data...")
    print("="*50)
    
    await create_demo_users()
    await create_demo_patients()
    
    print("="*50)
    print("✅ Demo data setup complete!")
    print("\n📝 Demo accounts created. See DEMO_CREDENTIALS.md for login details.")
    print("\n⚠️  SECURITY NOTE:")
    print("   These are development/test accounts only.")
    print("   DO NOT use these credentials in production!")
    print("\n📝 Notes:")
    print("- Patients can also self-register")
    print("- Admin can create accounts for doctors/staff")
    print("- Sessions persist across browser tabs")
    print("- Role-based dashboard redirection")
    
    # Close the database connection
    client.close()

if __name__ == "__main__":
    asyncio.run(main())