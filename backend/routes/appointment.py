"""
Appointment Management Routes
Handles appointment booking, scheduling, and reminder functionality
"""

from fastapi import APIRouter, HTTPException, Depends, status, Query, Response
from typing import List, Optional
from datetime import datetime, timedelta
from bson import ObjectId
from server import db, get_current_user
from models.appointment import (
    HospitalCreate, HospitalResponse, DoctorCreate, DoctorResponse,
    AppointmentCreate, AppointmentUpdate, AppointmentResponse, 
    ReminderCreate, ReminderResponse, AppointmentSearch,
    AppointmentStatus, AppointmentType, ReminderMethod
)
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

# Utility functions
def serialize_hospital(hospital_doc):
    if hospital_doc:
        hospital_doc["id"] = str(hospital_doc["_id"])
        del hospital_doc["_id"]
        return hospital_doc
    return None

def serialize_doctor(doctor_doc):
    if doctor_doc:
        doctor_doc["id"] = str(doctor_doc["_id"])
        del doctor_doc["_id"]
        return doctor_doc
    return None

def serialize_appointment(appointment_doc):
    if appointment_doc:
        appointment_doc["id"] = str(appointment_doc["_id"])
        del appointment_doc["_id"]
        return appointment_doc
    return None

# Hospital Management
@router.post("/hospitals", response_model=dict)
async def create_hospital(
    hospital_data: HospitalCreate,
    current_user: dict = Depends(get_current_user)
):
    """Create a new hospital (admin only)"""
    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Only administrators can create hospitals")
    
    logger.info(f"Creating hospital: {hospital_data.name}")
    
    try:
        hospital_doc = {
            **hospital_data.dict(),
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "created_by": current_user["username"],
            "total_doctors": 0,
            "active": True
        }
        
        result = await db.hospitals.insert_one(hospital_doc)
        
        return {
            "message": "Hospital created successfully",
            "hospital_id": str(result.inserted_id)
        }
    except Exception as e:
        logger.error(f"Error creating hospital: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to create hospital: {str(e)}")

@router.get("/hospitals", response_model=List[HospitalResponse])
async def get_hospitals(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100)
):
    """Get list of hospitals (simplified for demo)"""
    logger.info(f"Fetching hospitals list - page: {page}, limit: {limit}")
    
    try:
        skip = (page - 1) * limit
        hospitals = []
        
        async for hospital in db.hospitals.find({"active": True}).skip(skip).limit(limit):
            # Count doctors for each hospital
            doctor_count = await db.doctors.count_documents({"hospital_id": str(hospital["_id"]), "active": True})
            hospital["total_doctors"] = doctor_count
            hospitals.append(serialize_hospital(hospital))
        
        logger.info(f"Retrieved {len(hospitals)} hospitals")
        return hospitals
    except Exception as e:
        logger.error(f"Error fetching hospitals: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch hospitals: {str(e)}")

# Doctor Management
@router.post("/doctors", response_model=dict)
async def create_doctor(
    doctor_data: DoctorCreate,
    current_user: dict = Depends(get_current_user)
):
    """Create a new doctor (admin only)"""
    if current_user["role"] != "admin":
        raise HTTPException(status_code=403, detail="Only administrators can create doctors")
    
    logger.info(f"Creating doctor: {doctor_data.full_name}")
    
    try:
        # Verify hospital exists
        hospital = await db.hospitals.find_one({"_id": ObjectId(doctor_data.hospital_id)})
        if not hospital:
            raise HTTPException(status_code=404, detail="Hospital not found")
        
        doctor_doc = {
            **doctor_data.dict(),
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "created_by": current_user["username"],
            "total_appointments": 0,
            "rating": 0.0,
            "active": True
        }
        
        result = await db.doctors.insert_one(doctor_doc)
        
        # Update hospital doctor count
        await db.hospitals.update_one(
            {"_id": ObjectId(doctor_data.hospital_id)},
            {"$inc": {"total_doctors": 1}}
        )
        
        return {
            "message": "Doctor created successfully",
            "doctor_id": str(result.inserted_id)
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating doctor: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to create doctor: {str(e)}")

@router.get("/doctors", response_model=List[DoctorResponse])
async def get_doctors(
    hospital_id: Optional[str] = Query(None),
    specialization: Optional[str] = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    current_user: dict = Depends(get_current_user)
):
    """Get list of doctors"""
    logger.info(f"Fetching doctors list - hospital_id: {hospital_id}, specialization: {specialization}")
    
    try:
        skip = (page - 1) * limit
        query = {"active": True}
        
        if hospital_id:
            query["hospital_id"] = hospital_id
        if specialization:
            query["specialization"] = {"$regex": specialization, "$options": "i"}
        
        doctors = []
        async for doctor in db.doctors.find(query).skip(skip).limit(limit):
            # Count appointments for each doctor
            appointment_count = await db.appointments.count_documents({"doctor_id": str(doctor["_id"])})
            doctor["total_appointments"] = appointment_count
            doctors.append(serialize_doctor(doctor))
        
        logger.info(f"Retrieved {len(doctors)} doctors")
        return doctors
    except Exception as e:
        logger.error(f"Error fetching doctors: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch doctors: {str(e)}")

# Appointment Management
@router.post("/appointments", response_model=dict)
async def create_appointment(
    appointment_data: AppointmentCreate,
    current_user: dict = Depends(get_current_user)
):
    """Create a new appointment"""
    logger.info(f"Creating appointment for patient: {appointment_data.patient_id}")
    
    try:
        # Verify patient exists
        patient = await db.patients_registry.find_one({"_id": ObjectId(appointment_data.patient_id)})
        if not patient:
            raise HTTPException(status_code=404, detail="Patient not found")
        
        # Verify doctor exists
        doctor = await db.doctors.find_one({"_id": ObjectId(appointment_data.doctor_id)})
        if not doctor:
            raise HTTPException(status_code=404, detail="Doctor not found")
        
        # Verify hospital exists
        hospital = await db.hospitals.find_one({"_id": ObjectId(appointment_data.hospital_id)})
        if not hospital:
            raise HTTPException(status_code=404, detail="Hospital not found")
        
        # Check for conflicting appointments
        existing_appointment = await db.appointments.find_one({
            "doctor_id": appointment_data.doctor_id,
            "preferred_date": appointment_data.preferred_date,
            "preferred_time_slot": appointment_data.preferred_time_slot,
            "status": {"$nin": ["cancelled", "completed"]}
        })
        
        if existing_appointment:
            raise HTTPException(
                status_code=409,
                detail="Doctor is not available at the requested time"
            )
        
        appointment_doc = {
            **appointment_data.dict(),
            "status": AppointmentStatus.PENDING,
            "actual_date": None,
            "actual_time_slot": None,
            "doctor_notes": None,
            "patient_notes": None,
            "consultation_fee": doctor.get("consultation_fee", 0.0),
            "reminder_sent": False,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "created_by": current_user["username"]
        }
        
        result = await db.appointments.insert_one(appointment_doc)
        
        # Update doctor appointment count
        await db.doctors.update_one(
            {"_id": ObjectId(appointment_data.doctor_id)},
            {"$inc": {"total_appointments": 1}}
        )
        
        logger.info(f"Appointment created successfully with ID: {result.inserted_id}")
        
        return {
            "message": "Appointment created successfully",
            "appointment_id": str(result.inserted_id)
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating appointment: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to create appointment: {str(e)}")

@router.get("/appointments", response_model=List[AppointmentResponse])
async def get_appointments(
    patient_id: Optional[str] = Query(None),
    doctor_id: Optional[str] = Query(None),
    status: Optional[AppointmentStatus] = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    current_user: dict = Depends(get_current_user)
):
    """Get list of appointments"""
    logger.info(f"Fetching appointments - patient_id: {patient_id}, doctor_id: {doctor_id}, status: {status}")
    
    try:
        skip = (page - 1) * limit
        query = {}
        
        if patient_id:
            query["patient_id"] = patient_id
        if doctor_id:
            query["doctor_id"] = doctor_id
        if status:
            query["status"] = status
        
        appointments = []
        async for appointment in db.appointments.find(query).sort("preferred_date", -1).skip(skip).limit(limit):
            # Get patient info
            patient = await db.patients_registry.find_one({"_id": ObjectId(appointment["patient_id"])})
            # Get doctor info
            doctor = await db.doctors.find_one({"_id": ObjectId(appointment["doctor_id"])})
            # Get hospital info
            hospital = await db.hospitals.find_one({"_id": ObjectId(appointment["hospital_id"])})
            
            # Enrich appointment with related data
            appointment_response = {
                **serialize_appointment(appointment),
                "patient_name": patient.get("full_name", "Unknown") if patient else "Unknown",
                "doctor_name": doctor.get("full_name", "Unknown") if doctor else "Unknown",
                "doctor_specialization": doctor.get("specialization", "Unknown") if doctor else "Unknown",
                "hospital_name": hospital.get("name", "Unknown") if hospital else "Unknown"
            }
            
            appointments.append(appointment_response)
        
        logger.info(f"Retrieved {len(appointments)} appointments")
        return appointments
    except Exception as e:
        logger.error(f"Error fetching appointments: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch appointments: {str(e)}")

@router.put("/appointments/{appointment_id}", response_model=dict)
async def update_appointment(
    appointment_id: str,
    appointment_update: AppointmentUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Update appointment status and details"""
    logger.info(f"Updating appointment: {appointment_id}")
    
    try:
        # Verify appointment exists
        appointment = await db.appointments.find_one({"_id": ObjectId(appointment_id)})
        if not appointment:
            raise HTTPException(status_code=404, detail="Appointment not found")
        
        # Prepare update data
        update_data = {}
        for field, value in appointment_update.dict(exclude_unset=True).items():
            if value is not None:
                update_data[field] = value
        
        update_data["updated_at"] = datetime.utcnow()
        
        # Update appointment
        await db.appointments.update_one(
            {"_id": ObjectId(appointment_id)},
            {"$set": update_data}
        )
        
        logger.info(f"Appointment {appointment_id} updated successfully")
        
        return {
            "message": "Appointment updated successfully",
            "appointment_id": appointment_id
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating appointment: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to update appointment: {str(e)}")

@router.get("/appointments/upcoming", response_model=List[AppointmentResponse])
async def get_upcoming_appointments(
    days_ahead: int = Query(7, ge=1, le=30),
    current_user: dict = Depends(get_current_user)
):
    """Get upcoming appointments for the next N days"""
    logger.info(f"Fetching upcoming appointments for next {days_ahead} days")
    
    try:
        # Calculate date range
        start_date = datetime.utcnow()
        end_date = start_date + timedelta(days=days_ahead)
        
        query = {
            "preferred_date": {
                "$gte": start_date,
                "$lte": end_date
            },
            "status": {"$nin": ["cancelled", "completed"]}
        }
        
        # If user is a doctor, show only their appointments
        if current_user["role"] == "doctor":
            # Find doctor record
            doctor = await db.doctors.find_one({"email": current_user.get("email")})
            if doctor:
                query["doctor_id"] = str(doctor["_id"])
        
        appointments = []
        async for appointment in db.appointments.find(query).sort("preferred_date", 1):
            # Get patient info
            patient = await db.patients_registry.find_one({"_id": ObjectId(appointment["patient_id"])})
            # Get doctor info
            doctor = await db.doctors.find_one({"_id": ObjectId(appointment["doctor_id"])})
            # Get hospital info
            hospital = await db.hospitals.find_one({"_id": ObjectId(appointment["hospital_id"])})
            
            # Enrich appointment with related data
            appointment_response = {
                **serialize_appointment(appointment),
                "patient_name": patient.get("full_name", "Unknown") if patient else "Unknown",
                "doctor_name": doctor.get("full_name", "Unknown") if doctor else "Unknown",
                "doctor_specialization": doctor.get("specialization", "Unknown") if doctor else "Unknown",
                "hospital_name": hospital.get("name", "Unknown") if hospital else "Unknown"
            }
            
            appointments.append(appointment_response)
        
        logger.info(f"Retrieved {len(appointments)} upcoming appointments")
        return appointments
    except Exception as e:
        logger.error(f"Error fetching upcoming appointments: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch upcoming appointments: {str(e)}")

# Reminder Management
@router.post("/reminders", response_model=dict)
async def create_reminder(
    reminder_data: ReminderCreate,
    current_user: dict = Depends(get_current_user)
):
    """Create a new reminder (placeholder - integration with SMS/email services needed)"""
    logger.info(f"Creating reminder for appointment: {reminder_data.appointment_id}")
    
    try:
        # Verify appointment exists
        appointment = await db.appointments.find_one({"_id": ObjectId(reminder_data.appointment_id)})
        if not appointment:
            raise HTTPException(status_code=404, detail="Appointment not found")
        
        reminder_doc = {
            **reminder_data.dict(),
            "sent": False,
            "sent_at": None,
            "error_message": None,
            "created_at": datetime.utcnow()
        }
        
        result = await db.reminders.insert_one(reminder_doc)
        
        logger.info(f"Reminder created successfully with ID: {result.inserted_id}")
        
        return {
            "message": "Reminder created successfully",
            "reminder_id": str(result.inserted_id),
            "note": "SMS/Email integration required for actual delivery"
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating reminder: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to create reminder: {str(e)}")

@router.get("/reminders/pending", response_model=List[ReminderResponse])
async def get_pending_reminders(
    current_user: dict = Depends(get_current_user)
):
    """Get pending reminders that need to be sent"""
    logger.info("Fetching pending reminders")
    
    try:
        current_time = datetime.utcnow()
        
        reminders = []
        async for reminder in db.reminders.find({
            "sent": False,
            "reminder_time": {"$lte": current_time}
        }).sort("reminder_time", 1):
            reminder["id"] = str(reminder["_id"])
            del reminder["_id"]
            reminders.append(reminder)
        
        logger.info(f"Retrieved {len(reminders)} pending reminders")
        return reminders
    except Exception as e:
        logger.error(f"Error fetching pending reminders: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch reminders: {str(e)}")

@router.put("/reminders/{reminder_id}/mark-sent", response_model=dict)
async def mark_reminder_sent(
    reminder_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Mark reminder as sent"""
    logger.info(f"Marking reminder as sent: {reminder_id}")
    
    try:
        # Update reminder
        await db.reminders.update_one(
            {"_id": ObjectId(reminder_id)},
            {"$set": {
                "sent": True,
                "sent_at": datetime.utcnow()
            }}
        )
        
        return {
            "message": "Reminder marked as sent",
            "reminder_id": reminder_id
        }
    except Exception as e:
        logger.error(f"Error marking reminder as sent: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to mark reminder as sent: {str(e)}")