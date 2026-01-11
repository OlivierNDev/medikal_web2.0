"""
Setup demo data for appointment system
Creates sample hospitals and doctors for testing
"""

import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
import os

# MongoDB connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017/medikal')
client = AsyncIOMotorClient(MONGO_URL)
db = client.medikal

async def setup_appointment_demo_data():
    """Setup demo hospitals, doctors, and appointment data"""
    
    print("🏥 Setting up appointment system demo data...")
    
    # Sample hospitals
    hospitals_data = [
        {
            "name": "Kigali University Teaching Hospital",
            "address": "KN 4 Ave, Kigali, Rwanda",
            "phone": "+250 788 123 456",
            "email": "info@kuthkigali.rw",
            "departments": ["Cardiology", "Pediatrics", "General Medicine", "Surgery", "Emergency"],
            "operating_hours": {
                "monday": "08:00-17:00",
                "tuesday": "08:00-17:00", 
                "wednesday": "08:00-17:00",
                "thursday": "08:00-17:00",
                "friday": "08:00-17:00",
                "saturday": "09:00-13:00",
                "sunday": "Emergency Only"
            },
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "created_by": "system",
            "total_doctors": 0,
            "active": True
        },
        {
            "name": "King Faisal Hospital",
            "address": "KG 544 St, Kigali, Rwanda", 
            "phone": "+250 788 234 567",
            "email": "info@kfh.rw",
            "departments": ["Oncology", "Neurology", "Orthopedics", "General Medicine", "Emergency"],
            "operating_hours": {
                "monday": "07:00-18:00",
                "tuesday": "07:00-18:00",
                "wednesday": "07:00-18:00", 
                "thursday": "07:00-18:00",
                "friday": "07:00-18:00",
                "saturday": "08:00-14:00",
                "sunday": "Emergency Only"
            },
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "created_by": "system",
            "total_doctors": 0,
            "active": True
        },
        {
            "name": "Rwanda Military Hospital",
            "address": "KN 5 Rd, Kigali, Rwanda",
            "phone": "+250 788 345 678",
            "email": "info@rmh.rw",
            "departments": ["General Medicine", "Surgery", "Emergency", "Mental Health"],
            "operating_hours": {
                "monday": "08:00-16:00",
                "tuesday": "08:00-16:00",
                "wednesday": "08:00-16:00",
                "thursday": "08:00-16:00", 
                "friday": "08:00-16:00",
                "saturday": "Emergency Only",
                "sunday": "Emergency Only"
            },
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "created_by": "system",
            "total_doctors": 0,
            "active": True
        }
    ]
    
    # Clear existing data
    await db.hospitals.delete_many({"created_by": "system"})
    await db.doctors.delete_many({"created_by": "system"})
    
    # Insert hospitals
    hospital_results = await db.hospitals.insert_many(hospitals_data)
    hospital_ids = [str(id) for id in hospital_results.inserted_ids]
    
    print(f"✅ Created {len(hospital_ids)} hospitals")
    
    # Sample doctors
    doctors_data = [
        # KUTH doctors
        {
            "full_name": "Dr. Jean Baptiste Uwimana",
            "specialization": "Cardiology",
            "department": "Cardiology",
            "hospital_id": hospital_ids[0],
            "phone": "+250 788 111 222",
            "email": "jb.uwimana@kuthkigali.rw",
            "license_number": "RWD001234",
            "consultation_fee": 50000.0,
            "availability_schedule": {
                "monday": ["09:00", "10:00", "11:00", "14:00", "15:00"],
                "tuesday": ["09:00", "10:00", "11:00", "14:00", "15:00"],
                "wednesday": ["09:00", "10:00", "11:00", "14:00", "15:00"],
                "thursday": ["09:00", "10:00", "11:00", "14:00", "15:00"],
                "friday": ["09:00", "10:00", "11:00", "14:00", "15:00"]
            },
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "created_by": "system",
            "total_appointments": 0,
            "rating": 4.8,
            "active": True
        },
        {
            "full_name": "Dr. Marie Claire Mukamana",
            "specialization": "Pediatrics",
            "department": "Pediatrics", 
            "hospital_id": hospital_ids[0],
            "phone": "+250 788 222 333",
            "email": "mc.mukamana@kuthkigali.rw",
            "license_number": "RWD001235",
            "consultation_fee": 40000.0,
            "availability_schedule": {
                "monday": ["08:00", "09:00", "10:00", "14:00", "15:00", "16:00"],
                "tuesday": ["08:00", "09:00", "10:00", "14:00", "15:00", "16:00"],
                "wednesday": ["08:00", "09:00", "10:00", "14:00", "15:00", "16:00"],
                "thursday": ["08:00", "09:00", "10:00", "14:00", "15:00", "16:00"],
                "friday": ["08:00", "09:00", "10:00", "14:00", "15:00", "16:00"]
            },
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "created_by": "system",
            "total_appointments": 0,
            "rating": 4.9,
            "active": True
        },
        {
            "full_name": "Dr. Paul Kagame Nzeyimana",
            "specialization": "General Medicine",
            "department": "General Medicine",
            "hospital_id": hospital_ids[0],
            "phone": "+250 788 333 444",
            "email": "pk.nzeyimana@kuthkigali.rw",
            "license_number": "RWD001236",
            "consultation_fee": 30000.0,
            "availability_schedule": {
                "monday": ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
                "tuesday": ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
                "wednesday": ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
                "thursday": ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
                "friday": ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00"]
            },
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "created_by": "system",
            "total_appointments": 0,
            "rating": 4.7,
            "active": True
        },
        # King Faisal doctors
        {
            "full_name": "Dr. Sarah Nyirahabimana",
            "specialization": "Oncology",
            "department": "Oncology",
            "hospital_id": hospital_ids[1],
            "phone": "+250 788 444 555",
            "email": "s.nyirahabimana@kfh.rw", 
            "license_number": "RWD001237",
            "consultation_fee": 80000.0,
            "availability_schedule": {
                "monday": ["10:00", "11:00", "14:00", "15:00"],
                "tuesday": ["10:00", "11:00", "14:00", "15:00"],
                "wednesday": ["10:00", "11:00", "14:00", "15:00"],
                "thursday": ["10:00", "11:00", "14:00", "15:00"],
                "friday": ["10:00", "11:00", "14:00", "15:00"]
            },
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "created_by": "system",
            "total_appointments": 0,
            "rating": 4.9,
            "active": True
        },
        {
            "full_name": "Dr. Emmanuel Mudahunga",
            "specialization": "Neurology",
            "department": "Neurology",
            "hospital_id": hospital_ids[1],
            "phone": "+250 788 555 666",
            "email": "e.mudahunga@kfh.rw",
            "license_number": "RWD001238",
            "consultation_fee": 70000.0,
            "availability_schedule": {
                "monday": ["09:00", "10:00", "11:00", "15:00", "16:00"],
                "tuesday": ["09:00", "10:00", "11:00", "15:00", "16:00"],
                "wednesday": ["09:00", "10:00", "11:00", "15:00", "16:00"],
                "thursday": ["09:00", "10:00", "11:00", "15:00", "16:00"],
                "friday": ["09:00", "10:00", "11:00", "15:00", "16:00"]
            },
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "created_by": "system",
            "total_appointments": 0,
            "rating": 4.6,
            "active": True
        },
        # Military Hospital doctors
        {
            "full_name": "Dr. Grace Uwimana",
            "specialization": "General Medicine",
            "department": "General Medicine",
            "hospital_id": hospital_ids[2],
            "phone": "+250 788 666 777",
            "email": "g.uwimana@rmh.rw",
            "license_number": "RWD001239",
            "consultation_fee": 25000.0,
            "availability_schedule": {
                "monday": ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00"],
                "tuesday": ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00"],
                "wednesday": ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00"],
                "thursday": ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00"],
                "friday": ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00"]
            },
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "created_by": "system",
            "total_appointments": 0,
            "rating": 4.5,
            "active": True
        }
    ]
    
    # Insert doctors
    doctor_results = await db.doctors.insert_many(doctors_data)
    
    # Update hospital doctor counts
    for hospital_id in hospital_ids:
        doctor_count = await db.doctors.count_documents({"hospital_id": hospital_id, "active": True})
        await db.hospitals.update_one(
            {"_id": hospital_results.inserted_ids[hospital_ids.index(hospital_id)]},
            {"$set": {"total_doctors": doctor_count}}
        )
    
    print(f"✅ Created {len(doctor_results.inserted_ids)} doctors")
    print("✅ Appointment system demo data setup complete!")

if __name__ == "__main__":
    asyncio.run(setup_appointment_demo_data())