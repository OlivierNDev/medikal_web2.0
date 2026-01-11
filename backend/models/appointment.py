"""
Appointment Management Models
Handles appointment booking, scheduling, and reminder functionality
"""

from pydantic import BaseModel, Field, validator
from typing import Optional, List
from datetime import datetime
from enum import Enum

class AppointmentStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed" 
    CANCELLED = "cancelled"
    COMPLETED = "completed"
    NO_SHOW = "no_show"

class AppointmentType(str, Enum):
    CONSULTATION = "consultation"
    FOLLOW_UP = "follow_up"
    EMERGENCY = "emergency"
    CHECKUP = "checkup"
    PRESCRIPTION_REVIEW = "prescription_review"

class ReminderMethod(str, Enum):
    SMS = "sms"
    EMAIL = "email"
    WHATSAPP = "whatsapp"
    IN_APP = "in_app"

class HospitalCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=200)
    address: str = Field(..., min_length=5, max_length=500)
    phone: str = Field(..., pattern=r'^\+250\s?\d{3}\s?\d{3}\s?\d{3}$')
    email: Optional[str] = Field(None, pattern=r'^[\w\.-]+@[\w\.-]+\.\w+$')
    departments: List[str] = Field(default_factory=list)
    operating_hours: dict = Field(default_factory=dict)

class HospitalResponse(HospitalCreate):
    id: str
    created_at: datetime
    updated_at: datetime
    total_doctors: int = 0
    active: bool = True

class DoctorCreate(BaseModel):
    full_name: str = Field(..., min_length=2, max_length=200)
    specialization: str = Field(..., min_length=2, max_length=100)
    department: str = Field(..., min_length=2, max_length=100)
    hospital_id: str
    phone: str = Field(..., pattern=r'^\+250\s?\d{3}\s?\d{3}\s?\d{3}$')
    email: Optional[str] = Field(None, pattern=r'^[\w\.-]+@[\w\.-]+\.\w+$')
    license_number: str = Field(..., min_length=5, max_length=50)
    consultation_fee: Optional[float] = Field(0.0, ge=0)
    availability_schedule: dict = Field(default_factory=dict)

class DoctorResponse(DoctorCreate):
    id: str
    created_at: datetime
    updated_at: datetime
    total_appointments: int = 0
    rating: float = 0.0
    active: bool = True

class AppointmentCreate(BaseModel):
    patient_id: str
    doctor_id: str
    hospital_id: str
    appointment_type: AppointmentType = AppointmentType.CONSULTATION
    preferred_date: datetime
    preferred_time_slot: str = Field(..., pattern=r'^(0[8-9]|1[0-7]):(00|30)$')  # 08:00 to 17:30
    symptoms: Optional[str] = Field(None, max_length=1000)
    notes: Optional[str] = Field(None, max_length=500)
    reminder_methods: List[ReminderMethod] = Field(default_factory=lambda: [ReminderMethod.SMS])
    reminder_times: List[int] = Field(default_factory=lambda: [24, 2])  # Hours before appointment

    @validator('preferred_date')
    def validate_preferred_date(cls, v):
        if v <= datetime.utcnow():
            raise ValueError('Appointment date must be in the future')
        return v

class AppointmentUpdate(BaseModel):
    status: Optional[AppointmentStatus] = None
    actual_date: Optional[datetime] = None
    actual_time_slot: Optional[str] = None
    doctor_notes: Optional[str] = None
    patient_notes: Optional[str] = None
    reminder_sent: Optional[bool] = None

class AppointmentResponse(BaseModel):
    id: str
    patient_id: str
    patient_name: str
    doctor_id: str
    doctor_name: str
    doctor_specialization: str
    hospital_id: str
    hospital_name: str
    appointment_type: AppointmentType
    status: AppointmentStatus
    preferred_date: datetime
    preferred_time_slot: str
    actual_date: Optional[datetime]
    actual_time_slot: Optional[str]
    symptoms: Optional[str]
    notes: Optional[str]
    doctor_notes: Optional[str]
    patient_notes: Optional[str]
    consultation_fee: float
    reminder_methods: List[ReminderMethod]
    reminder_times: List[int]
    reminder_sent: bool
    created_at: datetime
    updated_at: datetime
    created_by: str

class ReminderCreate(BaseModel):
    appointment_id: str
    reminder_method: ReminderMethod
    reminder_time: datetime
    message: str
    recipient_phone: Optional[str] = None
    recipient_email: Optional[str] = None

class ReminderResponse(ReminderCreate):
    id: str
    sent: bool = False
    sent_at: Optional[datetime] = None
    error_message: Optional[str] = None
    created_at: datetime

class AppointmentSearch(BaseModel):
    patient_name: Optional[str] = None
    doctor_name: Optional[str] = None
    hospital_name: Optional[str] = None
    status: Optional[AppointmentStatus] = None
    appointment_type: Optional[AppointmentType] = None
    date_from: Optional[datetime] = None
    date_to: Optional[datetime] = None