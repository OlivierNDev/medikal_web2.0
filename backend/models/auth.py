from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from enum import Enum

class UserRole(str, Enum):
    PATIENT = "patient"
    DOCTOR = "doctor" 
    ADMIN = "admin"
    AI = "ai"

class UserStatus(str, Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"
    PENDING = "pending"
    SUSPENDED = "suspended"

class UserBase(BaseModel):
    username: str
    email: EmailStr
    full_name: str
    role: UserRole = UserRole.PATIENT
    status: UserStatus = UserStatus.ACTIVE

class UserCreate(UserBase):
    password: str

class PatientSelfRegister(BaseModel):
    username: str
    email: EmailStr
    full_name: str
    password: str
    phone: str
    national_id: str
    date_of_birth: str
    gender: str
    emergency_contact: str

class AdminCreateUser(BaseModel):
    username: str
    email: EmailStr
    full_name: str
    role: UserRole
    department: Optional[str] = None
    specialization: Optional[str] = None
    temporary_password: str

class UserLogin(BaseModel):
    username: str
    password: str

class PasswordChange(BaseModel):
    current_password: str
    new_password: str

class PasswordReset(BaseModel):
    email: EmailStr

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: dict

class UserResponse(BaseModel):
    id: str
    username: str
    email: str
    full_name: str
    role: str
    status: str
    created_at: datetime
    last_login: Optional[datetime] = None
    must_change_password: bool = False