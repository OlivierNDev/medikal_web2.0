from fastapi import APIRouter, HTTPException, Depends, status, Query, Response
from typing import List, Optional
from datetime import datetime, timedelta
from bson import ObjectId
from server import db, get_current_user
from models.patient_registry import (
    PatientCreate, PatientUpdate, PatientResponse, 
    VisitCreate, VisitResponse, PatientSearchQuery, PDFExportRequest
)
from services.pdf_service import PatientPDFGenerator
import logging

router = APIRouter(tags=["patient-registry"])

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Helper function to convert ObjectId to string
def serialize_patient(patient_doc):
    if patient_doc:
        patient_doc["id"] = str(patient_doc["_id"])
        del patient_doc["_id"] 
        return patient_doc
    return None

def serialize_visit(visit_doc):
    if visit_doc:
        visit_doc["id"] = str(visit_doc["_id"])
        del visit_doc["_id"]
        return visit_doc
    return None

@router.post("/register", response_model=dict)
async def register_patient(
    patient_data: PatientCreate,
    current_user: dict = Depends(get_current_user)
):
    """Register a new patient (authenticated users only)"""
    logger.info(f"Registering new patient: {patient_data.full_name}")
    
    try:
        # Check if patient with same national_id already exists
        existing_patient = await db.patients_registry.find_one({"national_id": patient_data.national_id})
        if existing_patient:
            raise HTTPException(
                status_code=400,
                detail=f"Patient with National ID {patient_data.national_id} already exists"
            )
        
        # Create patient document
        patient_doc = {
            **patient_data.dict(),
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "created_by": current_user["username"],
            "last_visit_date": None,
            "total_visits": 0
        }
        
        result = await db.patients_registry.insert_one(patient_doc)
        
        logger.info(f"Patient registered successfully with ID: {result.inserted_id}")
        
        return {
            "message": "Patient registered successfully",
            "patient_id": str(result.inserted_id)
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error registering patient: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to register patient: {str(e)}"
        )

@router.post("/public-register", response_model=dict)
async def public_register_patient(patient_data: PatientCreate):
    """Public patient registration (no authentication required)"""
    logger.info(f"Public registration for patient: {patient_data.full_name}")
    
    try:
        # Check if patient with same national_id already exists
        existing_patient = await db.patients_registry.find_one({"national_id": patient_data.national_id})
        if existing_patient:
            raise HTTPException(
                status_code=400,
                detail=f"Patient with National ID {patient_data.national_id} already exists"
            )
        
        # Create patient document
        patient_doc = {
            **patient_data.dict(),
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "created_by": "public_registration",
            "last_visit_date": None,
            "total_visits": 0
        }
        
        result = await db.patients_registry.insert_one(patient_doc)
        
        logger.info(f"Patient registered successfully via public endpoint with ID: {result.inserted_id}")
        
        return {
            "message": "Patient registered successfully",
            "patient_id": str(result.inserted_id)
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in public patient registration: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to register patient: {str(e)}"
        )

@router.get("/list", response_model=List[PatientResponse])
async def get_patients_list(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100)
):
    """Get paginated list of patients (simplified for demo)"""
    logger.info(f"Fetching patients list - page: {page}, limit: {limit}")
    
    try:
        skip = (page - 1) * limit
        
        patients = []
        async for patient in db.patients_registry.find().skip(skip).limit(limit).sort("created_at", -1):
            # Get visit count for each patient
            visit_count = await db.patient_visits.count_documents({"patient_id": str(patient["_id"])})
            
            # Get last visit date
            last_visit = await db.patient_visits.find_one(
                {"patient_id": str(patient["_id"])},
                sort=[("visit_date", -1)]
            )
            
            patient_response = PatientResponse(
                id=str(patient["_id"]),
                full_name=patient["full_name"],
                age=patient["age"],
                gender=patient["gender"],
                contact_phone=patient["contact_phone"],
                national_id=patient["national_id"],
                address=patient.get("address"),
                emergency_contact_name=patient.get("emergency_contact_name"),
                emergency_contact_phone=patient.get("emergency_contact_phone"),
                insurance_number=patient.get("insurance_number"),
                allergies=patient.get("allergies"),
                chronic_conditions=patient.get("chronic_conditions"),
                language_preference=patient.get("language_preference", "en"),
                created_at=patient["created_at"],
                updated_at=patient["updated_at"],
                last_visit_date=last_visit["visit_date"] if last_visit else None,
                total_visits=visit_count
            )
            patients.append(patient_response)
        
        logger.info(f"Retrieved {len(patients)} patients")
        return patients
        
    except Exception as e:
        logger.error(f"Error fetching patients list: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch patients: {str(e)}"
        )

@router.get("/search", response_model=List[PatientResponse])
async def search_patients(
    query: str = Query(..., min_length=1),
    search_by: str = Query("name", pattern=r'^(name|national_id|phone)$'),
    limit: int = Query(20, le=50),
    current_user: dict = Depends(get_current_user)
):
    """Search patients by name, national ID, or phone"""
    logger.info(f"Searching patients: {query} by {search_by}")
    
    try:
        # Build search filter based on search_by parameter
        if search_by == "name":
            search_filter = {"full_name": {"$regex": query, "$options": "i"}}
        elif search_by == "national_id":
            search_filter = {"national_id": {"$regex": query, "$options": "i"}}
        elif search_by == "phone":
            search_filter = {"contact_phone": {"$regex": query, "$options": "i"}}
        else:
            search_filter = {"full_name": {"$regex": query, "$options": "i"}}
        
        patients = []
        async for patient in db.patients_registry.find(search_filter).limit(limit):
            # Get visit count
            visit_count = await db.patient_visits.count_documents({"patient_id": str(patient["_id"])})
            
            # Get last visit date
            last_visit = await db.patient_visits.find_one(
                {"patient_id": str(patient["_id"])},
                sort=[("visit_date", -1)]
            )
            
            patient_response = PatientResponse(
                id=str(patient["_id"]),
                full_name=patient["full_name"],
                age=patient["age"],
                gender=patient["gender"],
                contact_phone=patient["contact_phone"],
                national_id=patient["national_id"],
                address=patient.get("address"),
                emergency_contact_name=patient.get("emergency_contact_name"),
                emergency_contact_phone=patient.get("emergency_contact_phone"),
                insurance_number=patient.get("insurance_number"),
                allergies=patient.get("allergies"),
                chronic_conditions=patient.get("chronic_conditions"),
                language_preference=patient.get("language_preference", "en"),
                created_at=patient["created_at"],
                updated_at=patient["updated_at"],
                last_visit_date=last_visit["visit_date"] if last_visit else None,
                total_visits=visit_count
            )
            patients.append(patient_response)
        
        logger.info(f"Found {len(patients)} patients matching '{query}'")
        return patients
        
    except Exception as e:
        logger.error(f"Error searching patients: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Search failed: {str(e)}"
        )

@router.get("/{patient_id}", response_model=PatientResponse)
async def get_patient_details(
    patient_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Get detailed patient information"""
    logger.info(f"Fetching patient details: {patient_id}")
    
    try:
        patient = await db.patients_registry.find_one({"_id": ObjectId(patient_id)})
        if not patient:
            raise HTTPException(status_code=404, detail="Patient not found")
        
        # Get visit count and last visit
        visit_count = await db.patient_visits.count_documents({"patient_id": patient_id})
        last_visit = await db.patient_visits.find_one(
            {"patient_id": patient_id},
            sort=[("visit_date", -1)]
        )
        
        patient_response = PatientResponse(
            id=str(patient["_id"]),
            full_name=patient["full_name"],
            age=patient["age"],
            gender=patient["gender"],
            contact_phone=patient["contact_phone"],
            national_id=patient["national_id"],
            address=patient.get("address"),
            emergency_contact_name=patient.get("emergency_contact_name"),
            emergency_contact_phone=patient.get("emergency_contact_phone"),
            insurance_number=patient.get("insurance_number"),
            allergies=patient.get("allergies"),
            chronic_conditions=patient.get("chronic_conditions"),
            language_preference=patient.get("language_preference", "en"),
            created_at=patient["created_at"],
            updated_at=patient["updated_at"],
            last_visit_date=last_visit["visit_date"] if last_visit else None,
            total_visits=visit_count
        )
        
        return patient_response
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching patient details: {str(e)}")
        raise HTTPException(
            status_code=400,
            detail="Invalid patient ID format"
        )

@router.put("/{patient_id}", response_model=dict)
async def update_patient(
    patient_id: str,
    patient_update: PatientUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Update patient information"""
    logger.info(f"Updating patient: {patient_id}")
    
    try:
        # Check if patient exists
        existing_patient = await db.patients_registry.find_one({"_id": ObjectId(patient_id)})
        if not existing_patient:
            raise HTTPException(status_code=404, detail="Patient not found")
        
        # Build update document
        update_data = {k: v for k, v in patient_update.dict().items() if v is not None}
        if update_data:
            update_data["updated_at"] = datetime.utcnow()
            update_data["updated_by"] = current_user["username"]
            
            result = await db.patients_registry.update_one(
                {"_id": ObjectId(patient_id)},
                {"$set": update_data}
            )
            
            if result.modified_count == 0:
                raise HTTPException(status_code=400, detail="No changes made")
        
        logger.info(f"Patient updated successfully: {patient_id}")
        return {"message": "Patient updated successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating patient: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to update patient: {str(e)}"
        )

@router.delete("/{patient_id}")
async def delete_patient(
    patient_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Delete patient (admin only)"""
    if current_user.get("role") != "admin":
        raise HTTPException(
            status_code=403,
            detail="Only administrators can delete patients"
        )
    
    logger.info(f"Deleting patient: {patient_id}")
    
    try:
        # Check if patient exists
        patient = await db.patients_registry.find_one({"_id": ObjectId(patient_id)})
        if not patient:
            raise HTTPException(status_code=404, detail="Patient not found")
        
        # Delete patient visits first
        await db.patient_visits.delete_many({"patient_id": patient_id})
        
        # Delete patient
        result = await db.patients_registry.delete_one({"_id": ObjectId(patient_id)})
        
        if result.deleted_count == 0:
            raise HTTPException(status_code=400, detail="Failed to delete patient")
        
        logger.info(f"Patient deleted successfully: {patient_id}")
        return {"message": "Patient and associated visits deleted successfully"}
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting patient: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to delete patient: {str(e)}"
        )

# Visit History Endpoints
@router.post("/{patient_id}/visits", response_model=dict)
async def create_visit(
    patient_id: str,
    visit_data: VisitCreate,
    current_user: dict = Depends(get_current_user)
):
    """Create a new visit for patient"""
    logger.info(f"Creating visit for patient: {patient_id}")
    
    try:
        # Verify patient exists
        patient = await db.patients_registry.find_one({"_id": ObjectId(patient_id)})
        if not patient:
            raise HTTPException(status_code=404, detail="Patient not found")
        
        # Create visit document
        visit_doc = {
            **visit_data.dict(),
            "patient_id": patient_id,
            "visit_date": datetime.utcnow(),
            "created_at": datetime.utcnow(),
            "created_by": current_user["username"]
        }
        
        result = await db.patient_visits.insert_one(visit_doc)
        
        # Update patient's last visit date and visit count
        await db.patients_registry.update_one(
            {"_id": ObjectId(patient_id)},
            {
                "$set": {"last_visit_date": datetime.utcnow()},
                "$inc": {"total_visits": 1}
            }
        )
        
        logger.info(f"Visit created successfully: {result.inserted_id}")
        return {
            "message": "Visit created successfully",
            "visit_id": str(result.inserted_id)
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating visit: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to create visit: {str(e)}"
        )

@router.get("/{patient_id}/visits", response_model=List[VisitResponse])
async def get_patient_visits(
    patient_id: str,
    limit: int = Query(10, le=50),
    current_user: dict = Depends(get_current_user)
):
    """Get patient's visit history"""
    logger.info(f"Fetching visits for patient: {patient_id}")
    
    try:
        # Verify patient exists
        patient = await db.patients_registry.find_one({"_id": ObjectId(patient_id)})
        if not patient:
            raise HTTPException(status_code=404, detail="Patient not found")
        
        visits = []
        async for visit in db.patient_visits.find({"patient_id": patient_id}).sort("visit_date", -1).limit(limit):
            visit_response = VisitResponse(
                id=str(visit["_id"]),
                patient_id=visit["patient_id"],
                visit_type=visit["visit_type"],
                symptoms=visit["symptoms"],
                diagnosis=visit.get("diagnosis"),
                prescribed_medications=visit.get("prescribed_medications", []),
                lab_results=visit.get("lab_results"),
                doctor_notes=visit.get("doctor_notes"),
                follow_up_required=visit.get("follow_up_required", False),
                follow_up_date=visit.get("follow_up_date"),
                doctor_id=visit["doctor_id"],
                visit_date=visit["visit_date"],
                created_at=visit["created_at"]
            )
            visits.append(visit_response)
        
        logger.info(f"Retrieved {len(visits)} visits for patient {patient_id}")
        return visits
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching patient visits: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch visits: {str(e)}"
        )

@router.get("/{patient_id}/export-pdf")
async def export_patient_pdf(
    patient_id: str,
    include_visits: bool = Query(True),
    include_lab_results: bool = Query(True),
    current_user: dict = Depends(get_current_user)
):
    """Export patient information as PDF"""
    logger.info(f"Exporting PDF for patient: {patient_id}")
    
    try:
        # Get patient information
        patient = await db.patients_registry.find_one({"_id": ObjectId(patient_id)})
        if not patient:
            raise HTTPException(status_code=404, detail="Patient not found")
        
        # Get patient visits if requested
        visits = []
        if include_visits:
            async for visit in db.patient_visits.find({"patient_id": patient_id}).sort("visit_date", -1):
                visits.append({
                    "id": str(visit["_id"]),
                    "visit_type": visit.get("visit_type"),
                    "symptoms": visit.get("symptoms"),
                    "diagnosis": visit.get("diagnosis"),
                    "prescribed_medications": visit.get("prescribed_medications", []),
                    "lab_results": visit.get("lab_results") if include_lab_results else None,
                    "doctor_notes": visit.get("doctor_notes"),
                    "follow_up_required": visit.get("follow_up_required", False),
                    "follow_up_date": visit.get("follow_up_date"),
                    "visit_date": visit.get("visit_date"),
                    "created_at": visit.get("created_at")
                })
        
        # Prepare patient data for PDF
        patient_data = {
            "id": str(patient["_id"]),
            "full_name": patient["full_name"],
            "age": patient["age"],
            "gender": patient["gender"],
            "contact_phone": patient["contact_phone"],
            "national_id": patient["national_id"],
            "address": patient.get("address"),
            "emergency_contact_name": patient.get("emergency_contact_name"),
            "emergency_contact_phone": patient.get("emergency_contact_phone"),
            "insurance_number": patient.get("insurance_number"),
            "allergies": patient.get("allergies"),
            "chronic_conditions": patient.get("chronic_conditions"),
            "language_preference": patient.get("language_preference", "en"),
            "created_at": patient["created_at"],
            "updated_at": patient["updated_at"],
            "total_visits": len(visits)
        }
        
        # Generate PDF
        pdf_generator = PatientPDFGenerator()
        pdf_buffer = pdf_generator.generate_patient_report(
            patient_data=patient_data,
            visits=visits,
            include_visits=include_visits,
            include_lab_results=include_lab_results
        )
        
        # Prepare filename
        filename = f"patient_record_{patient['full_name'].replace(' ', '_').lower()}_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}.pdf"
        
        logger.info(f"PDF generated successfully for patient {patient_id}")
        
        # Return PDF as response
        return Response(
            content=pdf_buffer.getvalue(),
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename={filename}",
                "Content-Type": "application/pdf"
            }
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error exporting PDF: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"PDF export failed: {str(e)}"
        )