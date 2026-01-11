from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

class GenderEnum(str, Enum):
    MALE = "Male"
    FEMALE = "Female"
    OTHER = "Other"

class VisitTypeEnum(str, Enum):
    OUTPATIENT = "Outpatient"
    INPATIENT = "Inpatient"
    EMERGENCY = "Emergency"
    FOLLOW_UP = "Follow-up"

# Patient Registry Models
class PatientCreate(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=100)
    age: int = Field(..., ge=0, le=150)
    gender: GenderEnum
    contact_phone: str = Field(..., pattern=r'^\+?[\d\s\-\(\)]{10,15}$')
    national_id: str = Field(..., min_length=10, max_length=20)
    address: Optional[str] = Field(None, max_length=200)
    emergency_contact_name: Optional[str] = Field(None, max_length=100)
    emergency_contact_phone: Optional[str] = Field(None, pattern=r'^\+?[\d\s\-\(\)]{10,15}$')
    insurance_number: Optional[str] = Field(None, max_length=50)
    allergies: Optional[str] = Field(None, max_length=500)
    chronic_conditions: Optional[str] = Field(None, max_length=500)
    language_preference: str = Field(default="en", pattern=r'^(en|rw)$')

class PatientUpdate(BaseModel):
    full_name: Optional[str] = Field(None, min_length=2, max_length=100)
    age: Optional[int] = Field(None, ge=0, le=150)
    gender: Optional[GenderEnum] = None
    contact_phone: Optional[str] = Field(None, pattern=r'^\+?[\d\s\-\(\)]{10,15}$')
    address: Optional[str] = Field(None, max_length=200)
    emergency_contact_name: Optional[str] = Field(None, max_length=100)
    emergency_contact_phone: Optional[str] = Field(None, pattern=r'^\+?[\d\s\-\(\)]{10,15}$')
    insurance_number: Optional[str] = Field(None, max_length=50)
    allergies: Optional[str] = Field(None, max_length=500)
    chronic_conditions: Optional[str] = Field(None, max_length=500)
    language_preference: Optional[str] = Field(None, pattern=r'^(en|rw)$')

class PatientResponse(BaseModel):
    id: str
    full_name: str
    age: int
    gender: str
    contact_phone: str
    national_id: str
    address: Optional[str] = None
    emergency_contact_name: Optional[str] = None
    emergency_contact_phone: Optional[str] = None
    insurance_number: Optional[str] = None
    allergies: Optional[str] = None
    chronic_conditions: Optional[str] = None
    language_preference: str
    created_at: datetime
    updated_at: datetime
    last_visit_date: Optional[datetime] = None
    total_visits: int = 0

# Visit History Models
class VisitCreate(BaseModel):
    patient_id: str
    visit_type: VisitTypeEnum
    symptoms: str = Field(..., min_length=5, max_length=1000)
    diagnosis: Optional[str] = Field(None, max_length=500)
    prescribed_medications: Optional[List[str]] = Field(default=[])
    lab_results: Optional[str] = Field(None, max_length=1000)
    doctor_notes: Optional[str] = Field(None, max_length=1000)
    follow_up_required: bool = Field(default=False)
    follow_up_date: Optional[datetime] = None
    doctor_id: str

class VisitResponse(BaseModel):
    id: str
    patient_id: str
    visit_type: str
    symptoms: str
    diagnosis: Optional[str] = None
    prescribed_medications: List[str] = []
    lab_results: Optional[str] = None
    doctor_notes: Optional[str] = None
    follow_up_required: bool = False
    follow_up_date: Optional[datetime] = None
    doctor_id: str
    visit_date: datetime
    created_at: datetime

class PatientSearchQuery(BaseModel):
    query: str = Field(..., min_length=1, max_length=100)
    search_by: str = Field(default="name", pattern=r'^(name|national_id|phone)$')
    limit: int = Field(default=20, le=100)

class PDFExportRequest(BaseModel):
    patient_id: str
    include_visits: bool = Field(default=True)
    include_lab_results: bool = Field(default=True)
    date_from: Optional[datetime] = None
    date_to: Optional[datetime] = None