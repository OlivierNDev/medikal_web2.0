# 🔐 Demo Credentials for Medikal Healthcare System

> **⚠️ IMPORTANT:** These credentials are for **DEVELOPMENT AND TESTING ONLY**.  
> They are created by the `setup_demo_data.py` script and should **NEVER** be used in production environments.  
> Always use secure, unique passwords in production and implement proper password policies.

## Test User Accounts

These accounts are automatically created when you run `python backend/setup_demo_data.py`.

### Administrator Access
- **Username:** `admin1`
- **Password:** `admin123`
- **Role:** Administrator
- **Permissions:** Full system access, user management, patient deletion

### Doctor Access
- **Username:** `doctor1`
- **Password:** `doctor123`
- **Role:** Doctor
- **Permissions:** Patient management, consultations, prescriptions, view all patients

### Patient Access
- **Username:** `patient1`
- **Password:** `patient123`
- **Role:** Patient
- **Permissions:** Self-registration, view own information, appointment booking

### AI Assistant Access
- **Username:** `ai_assistant`
- **Password:** `ai123`
- **Role:** AI Assistant
- **Permissions:** Medical knowledge queries, diagnostic assistance

## Usage Instructions

1. **Setup:** Run `python backend/setup_demo_data.py` to create these accounts
2. **Login:** Use any of the above credentials at the login screen
3. **Role-Based Access:** Each user will see different interfaces based on their role
4. **Testing:** All accounts are fully functional for testing purposes
5. **Production:** Delete these accounts and create new secure user accounts in production

## Features Available by Role

### Admin Dashboard
- System analytics and KPIs
- User management
- Patient registry management
- System health monitoring

### Doctor Dashboard
- Patient Registry (search, view, manage)
- Today's Queue (scheduled patients)
- Consultation interface
- Prescription management

### Patient Portal
- Patient registration
- View medical history
- Appointment booking (upcoming)
- Medical reminders

### AI Assistant
- Medical knowledge chat
- Diagnostic assistance
- Drug interaction checking

---

**⚠️ Important:** These credentials are for development and testing purposes only. In production, use secure password policies and proper authentication mechanisms.