from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import Optional
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
import secrets
import string

from models.auth import (
    UserCreate, PatientSelfRegister, AdminCreateUser, UserLogin,
    PasswordChange, TokenResponse, UserResponse, UserRole, UserStatus
)
from server import db
import os

router = APIRouter(prefix="/api/auth", tags=["authentication"])

# Security configuration
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-here-change-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def generate_temporary_password(length=12):
    """Generate a secure temporary password"""
    characters = string.ascii_letters + string.digits + "!@#$%^&*"
    return ''.join(secrets.choice(characters) for _ in range(length))

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = await db.users.find_one({"username": username})
    if user is None:
        raise credentials_exception
    return user

async def get_admin_user(current_user: dict = Depends(get_current_user)):
    if current_user["role"] != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    return current_user

@router.post("/patient/register", response_model=dict)
async def patient_self_register(patient_data: PatientSelfRegister):
    """Allow patients to self-register their accounts"""
    print(f"📝 Patient registration attempt for: {patient_data.username}")
    print(f"📧 Email: {patient_data.email}")
    print(f"👤 Full name: {patient_data.full_name}")
    
    # Check if username or email already exists
    existing_user = await db.users.find_one({
        "$or": [
            {"username": patient_data.username},
            {"email": patient_data.email}
        ]
    })
    if existing_user:
        print(f"❌ User already exists: {patient_data.username} or {patient_data.email}")
        raise HTTPException(
            status_code=400, 
            detail="Username or email already registered"
        )
    
    # Check if national ID already exists
    existing_patient = await db.patients.find_one({"national_id": patient_data.national_id})
    if existing_patient:
        print(f"❌ National ID already exists: {patient_data.national_id}")
        raise HTTPException(
            status_code=400,
            detail="A patient with this National ID already exists"
        )
    
    print(f"✅ No conflicts found, creating user account...")
    
    # Create user account
    hashed_password = get_password_hash(patient_data.password)
    user_doc = {
        "username": patient_data.username,
        "email": patient_data.email,
        "full_name": patient_data.full_name,
        "password": hashed_password,
        "role": UserRole.PATIENT,
        "status": UserStatus.ACTIVE,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        "last_login": None,
        "must_change_password": False
    }
    
    try:
        user_result = await db.users.insert_one(user_doc)
        user_id = str(user_result.inserted_id)
        print(f"✅ User account created with ID: {user_id}")
        
        # Create patient profile
        patient_doc = {
            "user_id": user_id,
            "full_name": patient_data.full_name,
            "phone": patient_data.phone,
            "national_id": patient_data.national_id,
            "date_of_birth": patient_data.date_of_birth,
            "gender": patient_data.gender,
            "emergency_contact": patient_data.emergency_contact,
            "language_preference": "en",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        patient_result = await db.patients.insert_one(patient_doc)
        print(f"✅ Patient profile created with ID: {str(patient_result.inserted_id)}")
        
        print(f"🎉 Registration successful for: {patient_data.username}")
        
        return {
            "message": "Patient account created successfully",
            "user_id": user_id,
            "username": patient_data.username
        }
        
    except Exception as e:
        print(f"❌ Database error during registration: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Database error: {str(e)}"
        )

@router.post("/admin/create-user", response_model=dict)
async def admin_create_user(
    user_data: AdminCreateUser,
    current_admin: dict = Depends(get_admin_user)
):
    """Allow admin to create accounts for doctors and other staff"""
    # Check if username or email already exists
    existing_user = await db.users.find_one({
        "$or": [
            {"username": user_data.username},
            {"email": user_data.email}
        ]
    })
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Username or email already registered"
        )
    
    # Hash the temporary password
    hashed_password = get_password_hash(user_data.temporary_password)
    
    # Create user document
    user_doc = {
        "username": user_data.username,
        "email": user_data.email,
        "full_name": user_data.full_name,
        "password": hashed_password,
        "role": user_data.role,
        "status": UserStatus.ACTIVE,
        "department": user_data.department,
        "specialization": user_data.specialization,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow(),
        "created_by": current_admin["username"],
        "last_login": None,
        "must_change_password": True  # Force password change on first login
    }
    
    result = await db.users.insert_one(user_doc)
    
    # Log the creation
    await db.user_activities.insert_one({
        "user_id": str(result.inserted_id),
        "action": "user_created",
        "created_by": current_admin["username"],
        "details": {
            "username": user_data.username,
            "role": user_data.role,
            "temporary_password": user_data.temporary_password
        },
        "timestamp": datetime.utcnow()
    })
    
    return {
        "message": "User account created successfully",
        "user_id": str(result.inserted_id),
        "username": user_data.username,
        "temporary_password": user_data.temporary_password,
        "must_change_password": True
    }

@router.post("/login", response_model=TokenResponse)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """User login endpoint"""
    print(f"🔐 Login attempt for username: {form_data.username}")
    
    user = await db.users.find_one({"username": form_data.username})
    
    if not user:
        print(f"❌ User not found: {form_data.username}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    print(f"✅ User found: {user['username']}, checking password...")
    
    if not verify_password(form_data.password, user["password"]):
        print(f"❌ Password verification failed for: {form_data.username}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    print(f"✅ Password verified for: {form_data.username}")
    
    if user["status"] != UserStatus.ACTIVE:
        print(f"❌ User not active: {form_data.username}, status: {user['status']}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Account is {user['status']}. Please contact administrator.",
        )
    
    print(f"✅ User is active: {form_data.username}")
    
    # Update last login
    await db.users.update_one(
        {"_id": user["_id"]},
        {"$set": {"last_login": datetime.utcnow()}}
    )
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["username"]}, 
        expires_delta=access_token_expires
    )
    
    user_response = {
        "id": str(user["_id"]),
        "username": user["username"],
        "email": user["email"],
        "full_name": user["full_name"],
        "role": user["role"],
        "status": user["status"],
        "must_change_password": user.get("must_change_password", False)
    }
    
    print(f"🎉 Login successful for: {form_data.username}, role: {user['role']}")
    
    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user=user_response
    )

@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    """Get current user information"""
    return UserResponse(
        id=str(current_user["_id"]),
        username=current_user["username"],
        email=current_user["email"],
        full_name=current_user["full_name"],
        role=current_user["role"],
        status=current_user["status"],
        created_at=current_user["created_at"],
        last_login=current_user.get("last_login"),
        must_change_password=current_user.get("must_change_password", False)
    )

@router.post("/change-password", response_model=dict)
async def change_password(
    password_data: PasswordChange,
    current_user: dict = Depends(get_current_user)
):
    """Change user password"""
    # Verify current password
    if not verify_password(password_data.current_password, current_user["password"]):
        raise HTTPException(
            status_code=400,
            detail="Current password is incorrect"
        )
    
    # Hash new password
    new_password_hash = get_password_hash(password_data.new_password)
    
    # Update password in database
    await db.users.update_one(
        {"_id": current_user["_id"]},
        {
            "$set": {
                "password": new_password_hash,
                "must_change_password": False,
                "updated_at": datetime.utcnow()
            }
        }
    )
    
    # Log password change
    await db.user_activities.insert_one({
        "user_id": str(current_user["_id"]),
        "action": "password_changed",
        "timestamp": datetime.utcnow()
    })
    
    return {"message": "Password changed successfully"}

@router.post("/admin/reset-password/{user_id}", response_model=dict)
async def admin_reset_password(
    user_id: str,
    current_admin: dict = Depends(get_admin_user)
):
    """Admin can reset any user's password"""
    from bson import ObjectId
    
    try:
        user = await db.users.find_one({"_id": ObjectId(user_id)})
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Generate new temporary password
        temp_password = generate_temporary_password()
        hashed_password = get_password_hash(temp_password)
        
        # Update user password
        await db.users.update_one(
            {"_id": ObjectId(user_id)},
            {
                "$set": {
                    "password": hashed_password,
                    "must_change_password": True,
                    "updated_at": datetime.utcnow()
                }
            }
        )
        
        # Log the reset
        await db.user_activities.insert_one({
            "user_id": user_id,
            "action": "password_reset_by_admin",
            "reset_by": current_admin["username"],
            "timestamp": datetime.utcnow()
        })
        
        return {
            "message": "Password reset successfully",
            "temporary_password": temp_password,
            "username": user["username"]
        }
        
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid user ID")

@router.get("/admin/users", response_model=list)
async def get_all_users(current_admin: dict = Depends(get_admin_user)):
    """Get all users (admin only)"""
    users = []
    async for user in db.users.find():
        users.append({
            "id": str(user["_id"]),
            "username": user["username"],
            "email": user["email"],
            "full_name": user["full_name"],
            "role": user["role"],
            "status": user["status"],
            "created_at": user["created_at"],
            "last_login": user.get("last_login"),
            "must_change_password": user.get("must_change_password", False)
        })
    return users

@router.post("/logout", response_model=dict)
async def logout(current_user: dict = Depends(get_current_user)):
    """Logout user (client should remove token)"""
    # Log the logout
    await db.user_activities.insert_one({
        "user_id": str(current_user["_id"]),
        "action": "logout",
        "timestamp": datetime.utcnow()
    })
    
    return {"message": "Logged out successfully"}