# Medikal Healthcare System - Developer Documentation

## Project Overview

Medikal is an AI-powered healthcare system designed to combat Antimicrobial Resistance (AMR) in African contexts. The system provides intelligent treatment recommendations, tracks antibiotic usage, offers real-time AMR risk alerts, and empowers patients with adherence tools and multilingual support.

## Tech Stack

- **Frontend**: React.js with Context API, React Router, Tailwind CSS, Chart.js, Axios
- **Backend**: FastAPI (Python) with MongoDB (Motor), Pydantic, JWT, bcrypt
- **Database**: MongoDB with Motor async driver
- **Authentication**: JWT-based with role-based access control
- **Deployment**: Kubernetes-ready with supervisor service management

## Project Status

### ✅ COMPLETED MODULES

#### 1. Authentication System
- **Status**: ✅ PRODUCTION READY
- **Features**:
  - Role-based access control (Admin, Doctor, Patient, AI Assistant)
  - JWT token authentication with session persistence
  - Password hashing with bcrypt
  - Cross-tab session management
  - Self-service patient registration
  - Admin user management

**Test Credentials:**
- Admin: `admin` / `admin123`
- Doctor: `doctor1` / `doctor123`
- Patient: `patient1` / `patient123`
- AI Assistant: `ai_assistant` / `ai123`

#### 2. Patient Registry Module
- **Status**: ✅ PRODUCTION READY
- **Features**:
  - Comprehensive patient registration with validation
  - Searchable patient list with live filtering
  - Patient details view with visit history
  - PDF export functionality (placeholder implemented)
  - CRUD operations with role-based permissions
  - Visit management and history tracking
  - Tab-based doctor dashboard interface

**API Endpoints:**
- `POST /api/patients/register` - Register new patient
- `GET /api/patients/list` - Get paginated patient list
- `GET /api/patients/search` - Search patients by name/ID/phone
- `GET /api/patients/{id}` - Get patient details
- `PUT /api/patients/{id}` - Update patient information
- `DELETE /api/patients/{id}` - Delete patient (admin only)
- `POST /api/patients/{id}/visits` - Create patient visit
- `GET /api/patients/{id}/visits` - Get patient visit history
- `GET /api/patients/{id}/export-pdf` - Export patient PDF

**Frontend Components:**
- `PatientPortal.js` - Enhanced patient registration form
- `PatientList.js` - Searchable patient management
- `PatientDetails.js` - Detailed patient view with visit history
- `DoctorDashboard.js` - Tab-based navigation for doctors

### 🚧 MODULES TO IMPLEMENT

#### 3. Prescription Interface Module
- **Priority**: Next
- **Features Needed**:
  - Symptom input interface
  - AI-based suggestion panel (placeholder/dummy)
  - Medication dropdown with AWaRe classification
  - Highlight "Watch" or "Reserve" antibiotics
  - AMR risk alerts before prescription submission
  - Prescription confirmation and printing

#### 4. Lab Results Interface
- **Priority**: After Prescription Interface
- **Features Needed**:
  - AST results input (Organism, Antibiotic, S/I/R)
  - UI warnings for resistance patterns
  - Link lab results to prescriptions
  - Resistance detection rules (EUCAST/CLSI simulation)

#### 5. Dashboard & Trends Analytics
- **Priority**: Third
- **Features Needed**:
  - Graphs for antibiotic usage trends
  - Resistance pattern visualization
  - Location-based AMR patterns (simulated)
  - Alert cards for antibiotic overuse
  - KPI monitoring dashboard

#### 6. Patient Notification System
- **Priority**: Fourth
- **Features Needed**:
  - Medication reminder setup
  - SMS/WhatsApp integration (placeholder)
  - Dose scheduling and confirmation
  - Notification preference management

## Architecture Details

### Backend Structure
```
/app/backend/
├── models/                 # Pydantic models
│   ├── patient_registry.py # Patient and visit models
│   ├── auth.py            # Authentication models
│   ├── consultation.py    # Consultation models
│   └── user.py            # User models
├── routes/                # API route handlers
│   ├── patient_registry.py # Patient CRUD operations
│   ├── auth.py            # Authentication routes
│   ├── consultation.py    # Consultation endpoints
│   └── ai.py              # AI integration endpoints
├── server.py              # Main FastAPI application
└── requirements.txt       # Python dependencies
```

### Frontend Structure
```
/app/frontend/src/
├── components/            # Reusable components
│   ├── PatientList.js     # Patient registry list
│   ├── PatientDetails.js  # Patient details modal
│   ├── Header.js          # App header
│   ├── Navigation.js      # Main navigation
│   └── ProtectedRoute.js  # Route protection
├── context/               # React contexts
│   ├── AuthContext.js     # Authentication state
│   └── AppContext.js      # Global app state
├── pages/                 # Main page components
│   ├── PatientPortal.js   # Patient registration
│   ├── DoctorDashboard.js # Doctor interface
│   ├── AdminPanel.js      # Admin interface
│   └── AIAssistant.js     # AI chat interface
├── services/
│   └── api.js             # API integration layer
└── App.js                 # Main app component
```

### Database Schema

#### Patients Collection (patients_registry)
```javascript
{
  "_id": ObjectId,
  "full_name": String,
  "age": Number (0-150),
  "gender": String ("Male"|"Female"|"Other"),
  "contact_phone": String (validated format),
  "national_id": String (unique),
  "address": String (optional),
  "emergency_contact_name": String (optional),
  "emergency_contact_phone": String (optional),
  "insurance_number": String (optional),
  "allergies": String (optional),
  "chronic_conditions": String (optional),
  "language_preference": String ("en"|"rw"),
  "created_at": DateTime,
  "updated_at": DateTime,
  "created_by": String,
  "total_visits": Number,
  "last_visit_date": DateTime
}
```

#### Patient Visits Collection (patient_visits)
```javascript
{
  "_id": ObjectId,
  "patient_id": String,
  "visit_type": String ("Outpatient"|"Inpatient"|"Emergency"|"Follow-up"),
  "symptoms": String,
  "diagnosis": String (optional),
  "prescribed_medications": Array[String],
  "lab_results": String (optional),
  "doctor_notes": String (optional),
  "follow_up_required": Boolean,
  "follow_up_date": DateTime (optional),
  "doctor_id": String,
  "visit_date": DateTime,
  "created_at": DateTime,
  "created_by": String
}
```

## API Documentation

### Authentication
All API endpoints (except health check) require authentication via Bearer token.

**Headers Required:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

### Error Handling
All APIs return consistent error responses:
```javascript
{
  "detail": "Error message",
  "status_code": 400|401|403|404|500
}
```

### Patient Registry Endpoints

#### Register Patient
```http
POST /api/patients/register
Content-Type: application/json

{
  "full_name": "John Doe",
  "age": 30,
  "gender": "Male",
  "contact_phone": "+250 788 123 456",
  "national_id": "1234567890123456",
  "address": "Kigali, Rwanda",
  "emergency_contact_name": "Jane Doe",
  "emergency_contact_phone": "+250 788 654 321",
  "insurance_number": "INS123456",
  "allergies": "Penicillin",
  "chronic_conditions": "Hypertension",
  "language_preference": "en"
}
```

**Response:**
```javascript
{
  "message": "Patient registered successfully",
  "patient_id": "patient_id_string"
}
```

#### Get Patient List
```http
GET /api/patients/list?page=1&limit=20
```

#### Search Patients
```http
GET /api/patients/search?query=John&search_by=name&limit=20
```

## Development Setup

### Prerequisites
- Python 3.11+
- Node.js 16+
- MongoDB
- Yarn package manager

### Environment Variables

**Backend (.env):**
Copy `.env.example` to `.env` and configure:
- `MONGO_URL` - MongoDB connection string (required)
- `SECRET_KEY` - JWT secret key (required, change in production)
- `OPENROUTER_API_KEY` - Optional, for AI features (leave empty for fallback mode)

**Frontend (.env):**
Copy `.env.example` to `.env` and configure:
- `REACT_APP_BACKEND_URL` - Backend API URL (default: http://localhost:8001)

### Running the Application

1. **Start services:**
   ```bash
   sudo supervisorctl start all
   ```

2. **Check service status:**
   ```bash
   sudo supervisorctl status
   ```

3. **View logs:**
   ```bash
   tail -f /var/log/supervisor/backend.err.log
   tail -f /var/log/supervisor/frontend.err.log
   ```

### Testing

#### Backend Testing
```bash
# Run comprehensive backend tests
python backend_test.py
```

#### Manual Testing
- Use demo credentials for quick access
- Test all CRUD operations via API
- Verify role-based permissions
- Test search and pagination

## Known Issues & TODOs

### High Priority
- [ ] **Patient Edit Functionality**: Complete implementation of patient update in frontend
- [ ] **Actual PDF Generation**: Replace placeholder with real PDF generation (reportlab)
- [ ] **Visit Creation UI**: Add visit creation from doctor dashboard

### Medium Priority
- [ ] **Patient Search Optimization**: Improve search performance for large datasets
- [ ] **Visit Filtering**: Add date range and type filtering for visits
- [ ] **Bulk Operations**: Implement bulk patient operations for admin

### Low Priority
- [ ] **Advanced Filters**: Add more sophisticated patient filtering options
- [ ] **Patient Photos**: Implement patient photo upload and display
- [ ] **Communication Preferences**: Add patient communication settings

## Integration Guidelines

### Adding New Modules

1. **Backend**:
   - Create model in `/models/`
   - Create routes in `/routes/`
   - Include router in `server.py`
   - Add API tests

2. **Frontend**:
   - Create components in `/components/`
   - Add API methods to `services/api.js`
   - Update context if needed
   - Test integration

### Third-Party Integrations
For future integrations (AI APIs, SMS services, etc.):
- Use environment variables for API keys
- Implement proper error handling
- Add placeholder functionality first
- Document expected behavior

## Performance Considerations

- MongoDB indexes on frequently queried fields
- Pagination for large datasets
- Lazy loading for patient details
- Efficient search algorithms
- Image optimization for uploads

## Security Implementation

- JWT token validation on all endpoints
- Role-based access control
- Input validation with Pydantic
- CORS configuration
- Password hashing with bcrypt
- SQL injection prevention (NoSQL)

## Deployment Notes

- Application is Kubernetes-ready
- Uses supervisor for service management
- Environment variables properly configured
- Health check endpoints implemented
- Proper error logging

---

**Last Updated**: Current Development Cycle  
**Status**: Patient Registry Module Complete - Ready for Next Module Implementation  
**Next Priority**: Prescription Interface Module

For questions or support, refer to the main development team.