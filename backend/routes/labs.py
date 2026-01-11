"""
Lab Results API Routes for Medikal Healthcare System
Handles AST (Antibiotic Susceptibility Testing) results and lab data
"""
from fastapi import APIRouter, HTTPException, Depends, Query
from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta
from pydantic import BaseModel
from server import db, get_current_user
from bson import ObjectId
import random

router = APIRouter(prefix="/labs", tags=["labs"])


class ASTResult(BaseModel):
    organism: str
    antibiotic: str
    result: str  # S (Sensitive), I (Intermediate), R (Resistant)
    mic_value: Optional[str] = None
    notes: Optional[str] = None


class LabResultCreate(BaseModel):
    patient_id: str
    test_name: str
    test_type: str  # hematology, microbiology, chemistry, radiology
    results: List[Dict[str, Any]]
    interpretation: Optional[str] = None
    notes: Optional[str] = None
    priority: str = "normal"  # normal, urgent, critical
    ordered_by: str
    ast_results: Optional[List[ASTResult]] = None


class LabResultResponse(BaseModel):
    id: str
    patient_id: str
    test_name: str
    test_type: str
    order_date: str
    completed_date: Optional[str] = None
    status: str
    priority: str
    ordered_by: str
    results: List[Dict[str, Any]]
    interpretation: Optional[str] = None
    notes: Optional[str] = None
    amr_related: bool = False
    resistance_detected: bool = False
    ast_results: Optional[List[Dict[str, Any]]] = None


# Sample AST data for demo purposes
SAMPLE_AST_DATA = [
    {
        "organism": "E. coli",
        "antibiotics": [
            {"name": "Ampicillin", "result": "R", "mic": ">32"},
            {"name": "Amoxicillin-Clavulanate", "result": "S", "mic": "4"},
            {"name": "Ciprofloxacin", "result": "S", "mic": "0.25"},
            {"name": "Nitrofurantoin", "result": "S", "mic": "16"},
            {"name": "Trimethoprim-Sulfamethoxazole", "result": "R", "mic": ">320"},
        ]
    },
    {
        "organism": "Staphylococcus aureus",
        "antibiotics": [
            {"name": "Penicillin", "result": "R", "mic": ">2"},
            {"name": "Oxacillin", "result": "S", "mic": "0.5"},
            {"name": "Vancomycin", "result": "S", "mic": "1"},
            {"name": "Clindamycin", "result": "S", "mic": "0.25"},
            {"name": "Erythromycin", "result": "I", "mic": "2"},
        ]
    },
    {
        "organism": "Klebsiella pneumoniae",
        "antibiotics": [
            {"name": "Ampicillin", "result": "R", "mic": ">32"},
            {"name": "Ceftriaxone", "result": "S", "mic": "0.5"},
            {"name": "Ciprofloxacin", "result": "S", "mic": "0.5"},
            {"name": "Meropenem", "result": "S", "mic": "0.125"},
            {"name": "Amikacin", "result": "S", "mic": "4"},
        ]
    }
]


def generate_sample_lab_results(patient_id: str) -> List[Dict[str, Any]]:
    """Generate sample lab results with realistic data"""
    now = datetime.utcnow()
    
    results = [
        {
            "id": f"lab_{patient_id}_1",
            "patient_id": patient_id,
            "test_name": "Complete Blood Count (CBC)",
            "test_type": "hematology",
            "order_date": (now - timedelta(days=3)).isoformat(),
            "completed_date": (now - timedelta(days=2)).isoformat(),
            "status": "completed",
            "priority": "normal",
            "ordered_by": "Dr. Sarah Johnson",
            "results": [
                {"parameter": "White Blood Cells", "value": "7.2", "unit": "10^3/μL", "range": "4.5-11.0", "status": "normal"},
                {"parameter": "Red Blood Cells", "value": "4.8", "unit": "10^6/μL", "range": "4.5-5.5", "status": "normal"},
                {"parameter": "Hemoglobin", "value": "14.2", "unit": "g/dL", "range": "12.0-15.5", "status": "normal"},
                {"parameter": "Platelets", "value": "280", "unit": "10^3/μL", "range": "150-450", "status": "normal"}
            ],
            "interpretation": "All blood parameters are within normal limits. No signs of infection or anemia.",
            "notes": "Follow-up CBC in 6 months if no symptoms develop.",
            "amr_related": False,
            "resistance_detected": False,
            "ast_results": None
        },
        {
            "id": f"lab_{patient_id}_2",
            "patient_id": patient_id,
            "test_name": "Culture & Sensitivity - Urine (AST)",
            "test_type": "microbiology",
            "order_date": (now - timedelta(days=5)).isoformat(),
            "completed_date": (now - timedelta(days=2)).isoformat(),
            "status": "completed",
            "priority": "critical",
            "ordered_by": "Dr. Michael Brown",
            "results": [
                {"parameter": "Organism", "value": "E. coli", "unit": "", "range": "No growth expected", "status": "abnormal"},
                {"parameter": "Colony Count", "value": ">100,000", "unit": "CFU/mL", "range": "<10,000", "status": "abnormal"},
            ],
            "interpretation": "Urinary tract infection with E. coli. Organism shows resistance to Ampicillin and TMP-SMX but sensitive to Ciprofloxacin and Nitrofurantoin.",
            "notes": "AMR Alert: Multiple resistance detected. Consider narrow-spectrum alternatives based on AST. Patient was treated with Ciprofloxacin successfully.",
            "amr_related": True,
            "resistance_detected": True,
            "ast_results": SAMPLE_AST_DATA[0]["antibiotics"]
        },
        {
            "id": f"lab_{patient_id}_3",
            "patient_id": patient_id,
            "test_name": "Blood Culture (AST)",
            "test_type": "microbiology",
            "order_date": (now - timedelta(days=7)).isoformat(),
            "completed_date": (now - timedelta(days=4)).isoformat(),
            "status": "completed",
            "priority": "critical",
            "ordered_by": "Dr. Sarah Johnson",
            "results": [
                {"parameter": "Organism", "value": "Staphylococcus aureus", "unit": "", "range": "No growth expected", "status": "abnormal"},
                {"parameter": "Growth Time", "value": "24", "unit": "hours", "range": "N/A", "status": "abnormal"},
            ],
            "interpretation": "Blood culture positive for Staphylococcus aureus (MSSA). Sensitive to Oxacillin - not MRSA.",
            "notes": "AMR Alert: Penicillin resistance detected. Recommend Oxacillin or Vancomycin based on clinical response.",
            "amr_related": True,
            "resistance_detected": True,
            "ast_results": SAMPLE_AST_DATA[1]["antibiotics"]
        },
        {
            "id": f"lab_{patient_id}_4",
            "patient_id": patient_id,
            "test_name": "Liver Function Tests",
            "test_type": "chemistry",
            "order_date": (now - timedelta(days=10)).isoformat(),
            "completed_date": (now - timedelta(days=9)).isoformat(),
            "status": "completed",
            "priority": "normal",
            "ordered_by": "Dr. Sarah Johnson",
            "results": [
                {"parameter": "ALT (SGPT)", "value": "25", "unit": "U/L", "range": "7-45", "status": "normal"},
                {"parameter": "AST (SGOT)", "value": "22", "unit": "U/L", "range": "8-40", "status": "normal"},
                {"parameter": "Bilirubin Total", "value": "0.8", "unit": "mg/dL", "range": "0.3-1.2", "status": "normal"},
                {"parameter": "Alkaline Phosphatase", "value": "68", "unit": "U/L", "range": "44-147", "status": "normal"}
            ],
            "interpretation": "Liver function tests are normal. No evidence of hepatic dysfunction.",
            "notes": "Continue current medications. No liver toxicity observed.",
            "amr_related": False,
            "resistance_detected": False,
            "ast_results": None
        },
        {
            "id": f"lab_{patient_id}_5",
            "patient_id": patient_id,
            "test_name": "Sputum Culture (AST)",
            "test_type": "microbiology",
            "order_date": (now - timedelta(days=1)).isoformat(),
            "completed_date": None,
            "status": "pending",
            "priority": "urgent",
            "ordered_by": "Dr. Michael Brown",
            "results": [],
            "interpretation": "Test results pending. Culture in progress.",
            "notes": "Sputum culture ordered for suspected lower respiratory tract infection.",
            "amr_related": True,
            "resistance_detected": False,
            "ast_results": None
        }
    ]
    
    return results


@router.get("/ast")
async def get_ast_results(
    patient_id: Optional[str] = Query(None, description="Filter by patient ID"),
    current_user: dict = Depends(get_current_user)
):
    """
    Get Antibiotic Susceptibility Testing (AST) results
    Core AMR feature for resistance tracking
    """
    try:
        # In production, fetch from database
        # For demo, return sample data
        if patient_id:
            # Get AST results for specific patient
            lab_results = generate_sample_lab_results(patient_id)
            ast_results = [r for r in lab_results if r.get("ast_results")]
            return {
                "patient_id": patient_id,
                "ast_results": ast_results,
                "total_count": len(ast_results),
                "resistance_alerts": sum(1 for r in ast_results if r.get("resistance_detected")),
                "common_organisms": list(set([SAMPLE_AST_DATA[i]["organism"] for i in range(len(SAMPLE_AST_DATA))]))
            }
        else:
            # Return all sample AST patterns
            return {
                "sample_organisms": SAMPLE_AST_DATA,
                "message": "Provide patient_id for patient-specific AST results"
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching AST results: {str(e)}")


@router.get("/results/{patient_id}")
async def get_patient_lab_results(
    patient_id: str,
    status: Optional[str] = Query(None, description="Filter by status: pending, completed"),
    test_type: Optional[str] = Query(None, description="Filter by type: hematology, microbiology, chemistry, radiology"),
    current_user: dict = Depends(get_current_user)
):
    """
    Get all lab results for a patient
    """
    try:
        # Generate sample results (in production, fetch from database)
        all_results = generate_sample_lab_results(patient_id)
        
        # Apply filters
        if status:
            all_results = [r for r in all_results if r["status"] == status]
        if test_type:
            all_results = [r for r in all_results if r["test_type"] == test_type]
        
        # Calculate statistics
        completed = sum(1 for r in all_results if r["status"] == "completed")
        pending = sum(1 for r in all_results if r["status"] == "pending")
        with_resistance = sum(1 for r in all_results if r.get("resistance_detected"))
        
        return {
            "patient_id": patient_id,
            "results": all_results,
            "statistics": {
                "total": len(all_results),
                "completed": completed,
                "pending": pending,
                "with_resistance": with_resistance,
                "amr_alerts": with_resistance
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching lab results: {str(e)}")


@router.post("/results")
async def create_lab_result(
    lab_result: LabResultCreate,
    current_user: dict = Depends(get_current_user)
):
    """
    Create a new lab result entry
    """
    try:
        # Determine if AMR-related based on test type
        amr_related = lab_result.test_type == "microbiology" or bool(lab_result.ast_results)
        resistance_detected = False
        
        if lab_result.ast_results:
            resistance_detected = any(ast.result == "R" for ast in lab_result.ast_results)
        
        lab_doc = {
            "patient_id": lab_result.patient_id,
            "test_name": lab_result.test_name,
            "test_type": lab_result.test_type,
            "order_date": datetime.utcnow(),
            "completed_date": None,
            "status": "pending",
            "priority": lab_result.priority,
            "ordered_by": lab_result.ordered_by,
            "results": lab_result.results,
            "interpretation": lab_result.interpretation,
            "notes": lab_result.notes,
            "amr_related": amr_related,
            "resistance_detected": resistance_detected,
            "ast_results": [ast.dict() for ast in lab_result.ast_results] if lab_result.ast_results else None,
            "created_by": str(current_user["_id"]),
            "created_at": datetime.utcnow()
        }
        
        result = await db.lab_results.insert_one(lab_doc)
        
        return {
            "message": "Lab result created successfully",
            "lab_result_id": str(result.inserted_id),
            "amr_alert": resistance_detected
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating lab result: {str(e)}")


@router.get("/resistance-patterns")
async def get_resistance_patterns(
    current_user: dict = Depends(get_current_user)
):
    """
    Get aggregated antibiotic resistance patterns for AMR surveillance
    """
    try:
        # In production, aggregate from actual database
        # For demo, return sample resistance data
        patterns = {
            "summary": {
                "total_cultures": 150,
                "positive_cultures": 89,
                "resistance_detected": 42,
                "reporting_period": "Last 30 days"
            },
            "by_organism": [
                {
                    "organism": "E. coli",
                    "total_isolates": 45,
                    "resistance_rates": {
                        "Ampicillin": 78,
                        "TMP-SMX": 65,
                        "Ciprofloxacin": 15,
                        "Nitrofurantoin": 5,
                        "Ceftriaxone": 12
                    }
                },
                {
                    "organism": "Staphylococcus aureus",
                    "total_isolates": 28,
                    "resistance_rates": {
                        "Penicillin": 92,
                        "Oxacillin (MRSA)": 18,
                        "Clindamycin": 8,
                        "Erythromycin": 22,
                        "Vancomycin": 0
                    }
                },
                {
                    "organism": "Klebsiella pneumoniae",
                    "total_isolates": 16,
                    "resistance_rates": {
                        "Ampicillin": 100,
                        "Ceftriaxone": 25,
                        "Ciprofloxacin": 18,
                        "Meropenem": 6,
                        "Amikacin": 12
                    }
                }
            ],
            "alerts": [
                {
                    "level": "high",
                    "message": "Rising Ciprofloxacin resistance in E. coli (15% → 23%)",
                    "recommendation": "Consider Nitrofurantoin for uncomplicated UTIs"
                },
                {
                    "level": "medium",
                    "message": "MRSA rate stable at 18%",
                    "recommendation": "Continue empirical Vancomycin for suspected MRSA"
                }
            ],
            "who_aware_compliance": {
                "access_antibiotics": 68,
                "watch_antibiotics": 28,
                "reserve_antibiotics": 4
            }
        }
        
        return patterns
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching resistance patterns: {str(e)}")
