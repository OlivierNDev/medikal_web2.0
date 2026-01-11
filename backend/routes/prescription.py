"""
Prescription Management Routes
Handles prescription creation, AI suggestions, and AWaRe classification
"""

from fastapi import APIRouter, HTTPException, Depends, status, Query
from typing import List, Optional, Dict
from datetime import datetime, timedelta
from bson import ObjectId
from server import db, get_current_user
from models.prescription import (
    PrescriptionCreate, PrescriptionUpdate, PrescriptionResponse,
    MedicationDatabase, AIAnalysisRequest, AIAnalysisResponse,
    AMRAlert, PrescriptionAnalytics, AWaReClassification,
    PrescriptionStatus, SymptomAnalysis, AIRecommendation
)
import logging
import json

logger = logging.getLogger(__name__)
router = APIRouter()

# Sample medication database with AWaRe classification
MEDICATION_DATABASE = [
    {
        "id": "med_001",
        "name": "Amoxicillin 500mg",
        "generic_name": "Amoxicillin",
        "category": "Antibiotic",
        "is_antibiotic": True,
        "aware_classification": AWaReClassification.ACCESS,
        "standard_dosage": "500mg 3 times daily",
        "common_indications": ["Respiratory tract infections", "Urinary tract infections", "Skin infections"],
        "contraindications": ["Penicillin allergy", "Severe kidney disease"],
        "side_effects": ["Nausea", "Diarrhea", "Skin rash"],
        "interactions": ["Warfarin", "Methotrexate"],
        "pregnancy_category": "B",
        "age_restrictions": "Safe for children over 3 months"
    },
    {
        "id": "med_002", 
        "name": "Azithromycin 250mg",
        "generic_name": "Azithromycin",
        "category": "Antibiotic",
        "is_antibiotic": True,
        "aware_classification": AWaReClassification.WATCH,
        "standard_dosage": "500mg daily for 3 days",
        "common_indications": ["Respiratory tract infections", "Sexually transmitted infections"],
        "contraindications": ["Liver disease", "Heart rhythm disorders"],
        "side_effects": ["Nausea", "Abdominal pain", "Diarrhea"],
        "interactions": ["Digoxin", "Warfarin"],
        "pregnancy_category": "B",
        "age_restrictions": "Safe for children over 6 months"
    },
    {
        "id": "med_003",
        "name": "Meropenem 1g",
        "generic_name": "Meropenem",
        "category": "Antibiotic",
        "is_antibiotic": True,
        "aware_classification": AWaReClassification.RESERVE,
        "standard_dosage": "1g IV every 8 hours",
        "common_indications": ["Severe infections", "Multi-drug resistant infections"],
        "contraindications": ["Severe penicillin allergy"],
        "side_effects": ["Injection site reactions", "Nausea", "Headache"],
        "interactions": ["Probenecid", "Valproic acid"],
        "pregnancy_category": "B",
        "age_restrictions": "Hospital use only"
    },
    {
        "id": "med_004",
        "name": "Paracetamol 500mg",
        "generic_name": "Acetaminophen",
        "category": "Analgesic/Antipyretic",
        "is_antibiotic": False,
        "aware_classification": None,
        "standard_dosage": "500mg-1g every 6-8 hours",
        "common_indications": ["Pain relief", "Fever reduction"],
        "contraindications": ["Severe liver disease"],
        "side_effects": ["Rare at therapeutic doses"],
        "interactions": ["Warfarin (high doses)"],
        "pregnancy_category": "A",
        "age_restrictions": "Safe for all ages with appropriate dosing"
    },
    {
        "id": "med_005",
        "name": "Ibuprofen 400mg",
        "generic_name": "Ibuprofen",
        "category": "NSAID",
        "is_antibiotic": False,
        "aware_classification": None,
        "standard_dosage": "400mg every 8 hours with food",
        "common_indications": ["Pain relief", "Inflammation", "Fever"],
        "contraindications": ["Peptic ulcer", "Severe heart failure", "Third trimester pregnancy"],
        "side_effects": ["Stomach upset", "Headache", "Dizziness"],
        "interactions": ["Warfarin", "ACE inhibitors", "Diuretics"],
        "pregnancy_category": "C",
        "age_restrictions": "Not for children under 6 months"
    }
]

def serialize_prescription(prescription_doc):
    if prescription_doc:
        prescription_doc["id"] = str(prescription_doc["_id"])
        del prescription_doc["_id"]
        return prescription_doc
    return None

@router.get("/medications/database", response_model=List[MedicationDatabase])
async def get_medication_database(
    category: Optional[str] = Query(None),
    is_antibiotic: Optional[bool] = Query(None),
    current_user: dict = Depends(get_current_user)
):
    """Get medication database with filtering options"""
    logger.info("Fetching medication database")
    
    try:
        filtered_meds = MEDICATION_DATABASE.copy()
        
        if category:
            filtered_meds = [med for med in filtered_meds if med["category"].lower() == category.lower()]
        
        if is_antibiotic is not None:
            filtered_meds = [med for med in filtered_meds if med["is_antibiotic"] == is_antibiotic]
        
        logger.info(f"Retrieved {len(filtered_meds)} medications")
        return filtered_meds
    except Exception as e:
        logger.error(f"Error fetching medication database: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch medications")

@router.post("/ai-analysis", response_model=AIAnalysisResponse)
async def analyze_symptoms_ai(
    analysis_request: AIAnalysisRequest,
    current_user: dict = Depends(get_current_user)
):
    """AI-powered symptom analysis and medication recommendations"""
    logger.info("Performing AI symptom analysis")
    
    try:
        # This is a placeholder for actual AI integration
        # In production, this would connect to OpenAI, Claude, or other medical AI services
        
        symptoms_text = ", ".join([s.symptom for s in analysis_request.symptoms])
        
        # Mock AI analysis based on common symptoms
        possible_conditions = []
        medication_suggestions = []
        amr_alerts = []
        
        # Simple rule-based analysis (placeholder for real AI)
        if any("fever" in s.symptom.lower() or "temperature" in s.symptom.lower() for s in analysis_request.symptoms):
            possible_conditions.append(AIRecommendation(
                condition="Upper Respiratory Tract Infection",
                confidence=0.75,
                reasoning="Fever is commonly associated with respiratory infections",
                recommended_medications=["Paracetamol 500mg", "Amoxicillin 500mg"],
                amr_risk_level="low",
                precautions=["Complete full antibiotic course", "Monitor temperature"],
                follow_up_required=True
            ))
            
            medication_suggestions.append({
                "medication": "Paracetamol 500mg",
                "reason": "For fever and pain relief",
                "dosage": "500mg every 6-8 hours",
                "is_antibiotic": False
            })
        
        if any("cough" in s.symptom.lower() for s in analysis_request.symptoms):
            possible_conditions.append(AIRecommendation(
                condition="Bronchitis",
                confidence=0.65,
                reasoning="Persistent cough may indicate bronchial infection",
                recommended_medications=["Amoxicillin 500mg"],
                amr_risk_level="medium",
                precautions=["Avoid unnecessary antibiotic use", "Consider viral cause first"],
                follow_up_required=False
            ))
        
        if any("sore throat" in s.symptom.lower() or "throat" in s.symptom.lower() for s in analysis_request.symptoms):
            # Check for Watch antibiotic recommendation
            medication_suggestions.append({
                "medication": "Azithromycin 250mg",
                "reason": "For bacterial throat infection",
                "dosage": "500mg daily for 3 days",
                "is_antibiotic": True,
                "aware_classification": "watch"
            })
            
            amr_alerts.append("⚠️ WATCH Antibiotic: Azithromycin should be used with caution due to resistance potential")
        
        # Check patient's antibiotic history (mock)
        if analysis_request.current_medications and any("antibiotic" in med.lower() for med in analysis_request.current_medications):
            amr_alerts.append("🚨 Patient currently on antibiotics - check for drug interactions")
        
        # Age-based recommendations
        if analysis_request.patient_age < 12:
            amr_alerts.append("👶 Pediatric patient - adjust dosages accordingly")
        elif analysis_request.patient_age > 65:
            amr_alerts.append("👵 Elderly patient - consider reduced dosages and kidney function")
        
        response = AIAnalysisResponse(
            possible_conditions=possible_conditions,
            medication_suggestions=medication_suggestions,
            amr_alerts=amr_alerts,
            general_recommendations=[
                "Complete full course of antibiotics if prescribed",
                "Return if symptoms worsen or don't improve in 3-5 days",
                "Stay hydrated and get adequate rest"
            ],
            confidence_score=0.7,
            requires_specialist=len(possible_conditions) > 2 or any(c.confidence < 0.5 for c in possible_conditions)
        )
        
        logger.info(f"AI analysis completed with {len(possible_conditions)} conditions identified")
        return response
        
    except Exception as e:
        logger.error(f"Error in AI analysis: {str(e)}")
        raise HTTPException(status_code=500, detail="AI analysis failed")

@router.post("/amr-check", response_model=List[AMRAlert])
async def check_amr_risks(
    patient_id: str,
    proposed_medications: List[str],
    current_user: dict = Depends(get_current_user)
):
    """Check for AMR risks before prescribing"""
    logger.info(f"Checking AMR risks for patient: {patient_id}")
    
    try:
        alerts = []
        
        # Get patient's prescription history
        prescription_history = []
        async for prescription in db.prescriptions.find({"patient_id": patient_id}).sort("created_at", -1).limit(10):
            prescription_history.append(prescription)
        
        # Count recent antibiotic prescriptions (last 3 months)
        three_months_ago = datetime.utcnow() - timedelta(days=90)
        recent_antibiotics = 0
        
        for prescription in prescription_history:
            if prescription.get("created_at", datetime.min) > three_months_ago:
                for medication in prescription.get("medications", []):
                    if medication.get("is_antibiotic", False):
                        recent_antibiotics += 1
        
        # AMR risk checks
        if recent_antibiotics >= 3:
            alerts.append(AMRAlert(
                type="overuse",
                severity="high",
                message="Patient has received 3+ antibiotic prescriptions in the last 3 months",
                recommendation="Consider culture and sensitivity test before prescribing antibiotics"
            ))
        
        # Check for WATCH and RESERVE antibiotics in proposed medications
        for med_name in proposed_medications:
            for db_med in MEDICATION_DATABASE:
                if db_med["name"].lower() in med_name.lower() and db_med["is_antibiotic"]:
                    if db_med["aware_classification"] == AWaReClassification.WATCH:
                        alerts.append(AMRAlert(
                            type="watch_antibiotic",
                            severity="medium",
                            message=f"{med_name} is classified as a WATCH antibiotic",
                            recommendation="Use only when ACCESS antibiotics are ineffective",
                            medication_name=med_name
                        ))
                    elif db_med["aware_classification"] == AWaReClassification.RESERVE:
                        alerts.append(AMRAlert(
                            type="reserve_antibiotic",
                            severity="critical",
                            message=f"{med_name} is classified as a RESERVE antibiotic",
                            recommendation="Use only for severe infections when other options fail",
                            medication_name=med_name
                        ))
        
        # Check for repeated use of same antibiotic
        for med_name in proposed_medications:
            recent_same_med = 0
            for prescription in prescription_history[:5]:  # Last 5 prescriptions
                for medication in prescription.get("medications", []):
                    if med_name.lower() in medication.get("name", "").lower():
                        recent_same_med += 1
            
            if recent_same_med >= 2:
                alerts.append(AMRAlert(
                    type="resistance",
                    severity="medium",
                    message=f"Patient has received {med_name} multiple times recently",
                    recommendation="Consider alternative antibiotic to prevent resistance",
                    medication_name=med_name
                ))
        
        logger.info(f"AMR check completed with {len(alerts)} alerts")
        return alerts
        
    except Exception as e:
        logger.error(f"Error in AMR check: {str(e)}")
        raise HTTPException(status_code=500, detail="AMR check failed")

@router.post("/prescriptions", response_model=dict)
async def create_prescription(
    prescription_data: PrescriptionCreate,
    current_user: dict = Depends(get_current_user)
):
    """Create a new prescription with AMR checks"""
    logger.info(f"Creating prescription for patient: {prescription_data.patient_id}")
    
    try:
        # Verify patient exists
        patient = await db.patients_registry.find_one({"_id": ObjectId(prescription_data.patient_id)})
        if not patient:
            raise HTTPException(status_code=404, detail="Patient not found")
        
        # Verify doctor exists (if specified)
        if prescription_data.doctor_id:
            doctor = await db.doctors.find_one({"_id": ObjectId(prescription_data.doctor_id)})
            if not doctor:
                raise HTTPException(status_code=404, detail="Doctor not found")
        
        # Convert medications to proper format
        medications_list = []
        for med in prescription_data.medications:
            med_dict = med.dict()
            med_dict["id"] = f"med_{datetime.utcnow().timestamp()}"
            med_dict["created_at"] = datetime.utcnow()
            medications_list.append(med_dict)
        
        prescription_doc = {
            "patient_id": prescription_data.patient_id,
            "doctor_id": prescription_data.doctor_id,
            "visit_id": prescription_data.visit_id,
            "status": PrescriptionStatus.PRESCRIBED,
            "symptoms": [symptom.dict() for symptom in prescription_data.symptoms],
            "diagnosis": prescription_data.diagnosis,
            "medications": medications_list,
            "ai_recommendations": [rec.dict() for rec in prescription_data.ai_recommendations] if prescription_data.ai_recommendations else [],
            "notes": prescription_data.notes,
            "follow_up_date": prescription_data.follow_up_date,
            "amr_risk_assessment": prescription_data.amr_risk_assessment,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "created_by": current_user["username"],
            "dispensed_by": None,
            "dispensed_at": None
        }
        
        result = await db.prescriptions.insert_one(prescription_doc)
        
        logger.info(f"Prescription created successfully with ID: {result.inserted_id}")
        
        return {
            "message": "Prescription created successfully",
            "prescription_id": str(result.inserted_id)
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating prescription: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to create prescription: {str(e)}")

@router.get("/prescriptions", response_model=List[PrescriptionResponse])
async def get_prescriptions(
    patient_id: Optional[str] = Query(None),
    doctor_id: Optional[str] = Query(None),
    status: Optional[PrescriptionStatus] = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    current_user: dict = Depends(get_current_user)
):
    """Get prescriptions with filtering"""
    logger.info("Fetching prescriptions")
    
    try:
        skip = (page - 1) * limit
        query = {}
        
        if patient_id:
            query["patient_id"] = patient_id
        if doctor_id:
            query["doctor_id"] = doctor_id
        if status:
            query["status"] = status
        
        prescriptions = []
        async for prescription in db.prescriptions.find(query).sort("created_at", -1).skip(skip).limit(limit):
            # Get patient and doctor info
            patient = await db.patients_registry.find_one({"_id": ObjectId(prescription["patient_id"])})
            doctor = await db.doctors.find_one({"_id": ObjectId(prescription["doctor_id"])}) if prescription.get("doctor_id") else None
            
            prescription_response = {
                **serialize_prescription(prescription),
                "patient_name": patient.get("full_name", "Unknown") if patient else "Unknown",
                "doctor_name": doctor.get("full_name", "Unknown") if doctor else "Unknown"
            }
            
            prescriptions.append(prescription_response)
        
        logger.info(f"Retrieved {len(prescriptions)} prescriptions")
        return prescriptions
    except Exception as e:
        logger.error(f"Error fetching prescriptions: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch prescriptions")

@router.get("/analytics/amr", response_model=PrescriptionAnalytics)
async def get_amr_analytics(
    days_back: int = Query(30, ge=1, le=365),
    current_user: dict = Depends(get_current_user)
):
    """Get AMR analytics and trends"""
    logger.info(f"Fetching AMR analytics for last {days_back} days")
    
    try:
        start_date = datetime.utcnow() - timedelta(days=days_back)
        
        # Get prescriptions in date range
        prescriptions = []
        async for prescription in db.prescriptions.find({
            "created_at": {"$gte": start_date}
        }):
            prescriptions.append(prescription)
        
        total_prescriptions = len(prescriptions)
        antibiotic_prescriptions = 0
        aware_distribution = {"access": 0, "watch": 0, "reserve": 0}
        condition_counts = {}
        
        for prescription in prescriptions:
            has_antibiotics = False
            for medication in prescription.get("medications", []):
                if medication.get("is_antibiotic", False):
                    has_antibiotics = True
                    aware_class = medication.get("aware_classification", "").lower()
                    if aware_class in aware_distribution:
                        aware_distribution[aware_class] += 1
            
            if has_antibiotics:
                antibiotic_prescriptions += 1
            
            # Count diagnoses
            diagnosis = prescription.get("diagnosis", "Unknown")
            condition_counts[diagnosis] = condition_counts.get(diagnosis, 0) + 1
        
        antibiotic_percentage = (antibiotic_prescriptions / total_prescriptions * 100) if total_prescriptions > 0 else 0
        
        # Most common conditions
        common_conditions = [
            {"condition": condition, "count": count}
            for condition, count in sorted(condition_counts.items(), key=lambda x: x[1], reverse=True)[:5]
        ]
        
        # AMR risk trends (simplified)
        amr_risk_trends = [
            {"date": (datetime.utcnow() - timedelta(days=i)).strftime("%Y-%m-%d"), "risk_score": min(50 + i, 100)}
            for i in range(0, days_back, 7)
        ]
        
        analytics = PrescriptionAnalytics(
            total_prescriptions=total_prescriptions,
            antibiotic_prescriptions=antibiotic_prescriptions,
            antibiotic_percentage=round(antibiotic_percentage, 1),
            aware_distribution=aware_distribution,
            common_conditions=common_conditions,
            amr_risk_trends=amr_risk_trends,
            date_range=f"Last {days_back} days"
        )
        
        logger.info(f"AMR analytics calculated for {total_prescriptions} prescriptions")
        return analytics
        
    except Exception as e:
        logger.error(f"Error fetching AMR analytics: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch analytics")

@router.put("/prescriptions/{prescription_id}", response_model=dict)
async def update_prescription(
    prescription_id: str,
    prescription_update: PrescriptionUpdate,
    current_user: dict = Depends(get_current_user)
):
    """Update prescription status and details"""
    logger.info(f"Updating prescription: {prescription_id}")
    
    try:
        # Verify prescription exists
        prescription = await db.prescriptions.find_one({"_id": ObjectId(prescription_id)})
        if not prescription:
            raise HTTPException(status_code=404, detail="Prescription not found")
        
        # Prepare update data
        update_data = {}
        for field, value in prescription_update.dict(exclude_unset=True).items():
            if value is not None:
                update_data[field] = value
        
        update_data["updated_at"] = datetime.utcnow()
        
        # Update prescription
        await db.prescriptions.update_one(
            {"_id": ObjectId(prescription_id)},
            {"$set": update_data}
        )
        
        logger.info(f"Prescription {prescription_id} updated successfully")
        
        return {
            "message": "Prescription updated successfully",
            "prescription_id": prescription_id
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating prescription: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to update prescription")

@router.get("/prescriptions/{prescription_id}", response_model=PrescriptionResponse)
async def get_prescription_by_id(
    prescription_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Get prescription by ID"""
    logger.info(f"Fetching prescription: {prescription_id}")
    
    try:
        prescription = await db.prescriptions.find_one({"_id": ObjectId(prescription_id)})
        if not prescription:
            raise HTTPException(status_code=404, detail="Prescription not found")
        
        # Get patient and doctor info
        patient = await db.patients_registry.find_one({"_id": ObjectId(prescription["patient_id"])})
        doctor = await db.doctors.find_one({"_id": ObjectId(prescription["doctor_id"])}) if prescription.get("doctor_id") else None
        
        prescription_response = {
            **serialize_prescription(prescription),
            "patient_name": patient.get("full_name", "Unknown") if patient else "Unknown",
            "doctor_name": doctor.get("full_name", "Unknown") if doctor else "Unknown"
        }
        
        return prescription_response
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching prescription: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch prescription")