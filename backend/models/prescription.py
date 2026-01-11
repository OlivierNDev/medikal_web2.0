"""
Prescription Management Models
Handles prescription creation, AI suggestions, and AWaRe classification
"""

from pydantic import BaseModel, Field, validator
from typing import Optional, List, Dict
from datetime import datetime
from enum import Enum

class AWaReClassification(str, Enum):
    ACCESS = "access"      # First-line antibiotics with broad spectrum
    WATCH = "watch"        # Antibiotics with high resistance potential
    RESERVE = "reserve"    # Last-resort antibiotics for severe cases

class PrescriptionStatus(str, Enum):
    DRAFT = "draft"
    PRESCRIBED = "prescribed"
    DISPENSED = "dispensed"
    COMPLETED = "completed"
    CANCELLED = "cancelled"

class SeverityLevel(str, Enum):
    MILD = "mild"
    MODERATE = "moderate"
    SEVERE = "severe"
    CRITICAL = "critical"

class MedicationCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=200)
    generic_name: Optional[str] = Field(None, max_length=200)
    dosage: str = Field(..., min_length=1, max_length=100)
    frequency: str = Field(..., min_length=1, max_length=100)
    duration: str = Field(..., min_length=1, max_length=100)
    route: str = Field(default="oral", max_length=50)
    instructions: Optional[str] = Field(None, max_length=1000)
    is_antibiotic: bool = Field(default=False)
    aware_classification: Optional[AWaReClassification] = None
    quantity: Optional[int] = Field(None, ge=1)
    
    @validator('aware_classification')
    def validate_aware_classification(cls, v, values):
        if values.get('is_antibiotic') and v is None:
            raise ValueError('AWaRe classification is required for antibiotics')
        return v

class MedicationResponse(MedicationCreate):
    id: str
    created_at: datetime

class SymptomAnalysis(BaseModel):
    symptom: str = Field(..., min_length=1, max_length=200)
    severity: SeverityLevel = SeverityLevel.MILD
    duration: Optional[str] = None
    additional_notes: Optional[str] = None

class AIRecommendation(BaseModel):
    condition: str
    confidence: float = Field(..., ge=0.0, le=1.0)
    reasoning: str
    recommended_medications: List[str]
    amr_risk_level: str = Field(..., pattern="^(low|medium|high)$")
    precautions: List[str]
    follow_up_required: bool = False
    
class PrescriptionCreate(BaseModel):
    patient_id: str
    doctor_id: str
    visit_id: Optional[str] = None
    symptoms: List[SymptomAnalysis]
    diagnosis: Optional[str] = Field(None, max_length=1000)
    medications: List[MedicationCreate]
    ai_recommendations: Optional[List[AIRecommendation]] = None
    notes: Optional[str] = Field(None, max_length=2000)
    follow_up_date: Optional[datetime] = None
    amr_risk_assessment: Optional[str] = None

class PrescriptionUpdate(BaseModel):
    status: Optional[PrescriptionStatus] = None
    diagnosis: Optional[str] = None
    medications: Optional[List[MedicationCreate]] = None
    notes: Optional[str] = None
    follow_up_date: Optional[datetime] = None
    dispensed_by: Optional[str] = None
    dispensed_at: Optional[datetime] = None

class PrescriptionResponse(BaseModel):
    id: str
    patient_id: str
    patient_name: str
    doctor_id: str
    doctor_name: str
    visit_id: Optional[str]
    status: PrescriptionStatus
    symptoms: List[SymptomAnalysis]
    diagnosis: Optional[str]
    medications: List[MedicationResponse]
    ai_recommendations: Optional[List[AIRecommendation]]
    notes: Optional[str]
    follow_up_date: Optional[datetime]
    amr_risk_assessment: Optional[str]
    created_at: datetime
    updated_at: datetime
    created_by: str
    dispensed_by: Optional[str] = None
    dispensed_at: Optional[datetime] = None

class MedicationDatabase(BaseModel):
    """Sample medication database with AWaRe classification"""
    id: str
    name: str
    generic_name: str
    category: str
    is_antibiotic: bool
    aware_classification: Optional[AWaReClassification]
    standard_dosage: str
    common_indications: List[str]
    contraindications: List[str]
    side_effects: List[str]
    interactions: List[str]
    pregnancy_category: Optional[str]
    age_restrictions: Optional[str]

class AIAnalysisRequest(BaseModel):
    symptoms: List[SymptomAnalysis]
    patient_age: int
    patient_gender: str
    medical_history: Optional[str] = None
    current_medications: Optional[List[str]] = None
    allergies: Optional[List[str]] = None
    
class AIAnalysisResponse(BaseModel):
    possible_conditions: List[AIRecommendation]
    medication_suggestions: List[Dict]
    amr_alerts: List[str]
    general_recommendations: List[str]
    confidence_score: float
    requires_specialist: bool = False

class AMRAlert(BaseModel):
    type: str = Field(..., pattern="^(overuse|resistance|watch_antibiotic|reserve_antibiotic)$")
    severity: str = Field(..., pattern="^(low|medium|high|critical)$")
    message: str
    recommendation: str
    medication_name: Optional[str] = None
    
class PrescriptionAnalytics(BaseModel):
    total_prescriptions: int
    antibiotic_prescriptions: int
    antibiotic_percentage: float
    aware_distribution: Dict[str, int]
    common_conditions: List[Dict]
    amr_risk_trends: List[Dict]
    date_range: str