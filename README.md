# 🏥 Medikal - AI-Powered Clinical Decision Support System

> **Combating Antimicrobial Resistance (AMR) in Africa through AI/ML-Driven Healthcare**

## 📋 Table of Contents
- [Vision & Problem Statement](#-vision--problem-statement)
- [System Architecture](#-system-architecture)
- [Key Features](#-key-features)
- [Current Progress](#-current-progress)
- [Local Setup Guide](#-local-setup-guide)
- [Usage Guide](#-usage-guide)
- [API Documentation](#-api-documentation)
- [Future Development Roadmap](#-future-development-roadmap)
- [Handover Notes](#-handover-notes)

---

## 🎯 Vision & Problem Statement

### The AMR Crisis in Africa

Antimicrobial Resistance (AMR) is one of the greatest public health threats of our time. In Africa, the burden is particularly severe due to:

- **Limited laboratory infrastructure** for culture and sensitivity testing
- **Over-the-counter antibiotic availability** leading to inappropriate use
- **Inadequate surveillance systems** to track resistance patterns
- **Healthcare worker shortages** requiring decision-support tools
- **High infectious disease burden** driving antibiotic demand

### Why AI/ML/DL is Critical

Medikal addresses these challenges by leveraging artificial intelligence to:

1. **Guide Antibiotic Selection** - AI-powered recommendations based on local resistance patterns
2. **Track Resistance Trends** - Real-time surveillance and predictive analytics
3. **Support Clinical Decisions** - Evidence-based recommendations at point of care
4. **Ensure Stewardship** - WHO AWaRe classification compliance monitoring
5. **Enable Multilingual Access** - Kinyarwanda, English, and French support

### Medikal's Mission

Medikal is a **Clinical Decision Support System (CDSS)** designed to:
- **Assist, not replace** clinical judgment
- **Reduce inappropriate antibiotic prescriptions** by 30%
- **Improve treatment outcomes** through evidence-based recommendations
- **Build local resistance databases** for informed empirical therapy

---

## 🏗 System Architecture

### Technology Stack

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│  React 18 + Tailwind CSS + Context API                      │
│  Multilingual UI (EN/RW/FR)                                 │
└─────────────────────────┬───────────────────────────────────┘
                          │ HTTPS
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                        BACKEND                               │
│  FastAPI (Python 3.11)                                      │
│  JWT Authentication + Role-Based Access Control             │
└─────────────────────────┬───────────────────────────────────┘
                          │
            ┌─────────────┼─────────────┐
            ▼             ▼             ▼
┌───────────────┐ ┌───────────────┐ ┌───────────────┐
│   MongoDB     │ │  OpenRouter   │ │    External   │
│   Database    │ │   AI Gateway  │ │     APIs      │
│               │ │   (GPT/etc)   │ │               │
└───────────────┘ └───────────────┘ └───────────────┘
```

### Directory Structure

```
medikal/
├── backend/
│   ├── routes/
│   │   ├── ai.py              # AI Medical Assistant
│   │   ├── auth.py            # Authentication
│   │   ├── consultation.py    # Patient consultations
│   │   ├── dashboard.py       # Analytics & metrics
│   │   ├── labs.py            # Lab results & AST
│   │   ├── notifications.py   # Patient notifications
│   │   ├── patient_registry.py# Patient management
│   │   ├── prescription.py    # Prescription management
│   │   └── appointment.py     # Appointment scheduling
│   ├── models/                # Pydantic models
│   ├── services/              # Business logic
│   ├── server.py              # FastAPI application
│   ├── setup_demo_data.py     # Demo data seeder
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── patient/       # Patient portal modules
│   │   │   └── ui/            # Shadcn UI components
│   │   ├── context/           # React Context
│   │   ├── pages/             # Page components
│   │   └── services/          # API services
│   ├── package.json
│   └── .env
├── docs/                      # Documentation (to be created)
└── README.md
```

---

## ✨ Key Features

### 1. 👨‍⚕️ AI Medical Assistant
- **Real-time AI consultation** with patient context
- **AMR-conscious recommendations** following WHO guidelines
- **Multilingual support** (English, Kinyarwanda, French)
- **Patient history integration** for personalized advice
- **Fallback system** with clinical guidelines when AI is offline

### 2. 🏥 Doctor Dashboard
- **Patient Registry** - Comprehensive patient management
- **AI Consultation** - AI-powered clinical decision support
- **Prescription Management** - WHO AWaRe classification tracking
- **Today's Queue** - Daily patient workflow
- **Diagnostic Tools** - Skin analysis and more

### 3. 👤 Patient Portal
- **Patient Registration** - Self-registration with multilingual forms
- **View Prescriptions** - Active and past medications
- **Medication Reminders** - Adherence tracking
- **Medical History** - Visit and treatment history
- **Lab Results** - Including AST results with resistance alerts
- **Appointments** - Booking and management
- **Notifications** - Real-time health alerts

### 4. 📊 Admin Panel
- **System Analytics** - KPIs and performance metrics
- **AMR Surveillance** - Resistance pattern tracking
- **User Management** - Role-based access control
- **WHO AWaRe Compliance** - Antibiotic stewardship metrics

### 5. 🧬 AMR-Specific Features
- **AST Results Integration** - Antibiotic Susceptibility Testing
- **Resistance Pattern Alerts** - Real-time warnings
- **WHO AWaRe Classification** - Access/Watch/Reserve tracking
- **Regional Resistance Data** - East African context
- **Stewardship Dashboard** - Prescribing compliance

---

## 📈 Current Progress

### ✅ COMPLETED (Demo-Ready)

| Feature | Status | Notes |
|---------|--------|-------|
| Three-role Authentication | ✅ Complete | Patient, Doctor, Admin |
| Doctor Dashboard | ✅ Complete | 5 functional tabs |
| Patient Portal UI | ✅ Complete | 6 modules with multilingual UI |
| AI Medical Assistant | ✅ Complete | With fallback system |
| Patient Registration | ✅ Complete | Full CRUD operations |
| Prescription Management | ✅ Complete | WHO AWaRe classification |
| Role-based Routing | ✅ Complete | Proper redirects |
| Backend API | ✅ Complete | 20+ endpoints |

### 🟡 DEMO MODE (Mock Data)

| Feature | Status | Notes |
|---------|--------|-------|
| Lab Results Display | 🟡 Mock | Frontend shows sample data |
| Medication Reminders | 🟡 Mock | UI complete, needs backend |
| Dashboard Analytics | 🟡 Mock | Charts with sample data |
| Notifications | 🟡 Mock | UI complete, needs real-time |

### ⚠️ KNOWN LIMITATIONS

1. **AI API Key** - Configure OPENROUTER_API_KEY in .env for AI features (optional - system uses fallback clinical guidelines if not configured)
2. **Patient Portal Data** - Components use mock data, not connected to backend
3. **Real-time Features** - No WebSocket implementation yet

---

## 🚀 Local Setup Guide

### Prerequisites

- **Python 3.11+**
- **Node.js 18+**
- **MongoDB 6.0+**
- **Git**

### Step 1: Clone Repository

```bash
git clone <your-repository-url>
cd medikal
```

### Step 2: Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file template
cp .env.example .env
# Edit .env and add your configuration values
# Required: MONGO_URL, SECRET_KEY
# Optional: OPENROUTER_API_KEY (leave empty to use fallback clinical guidelines)

# Start MongoDB (if not running)
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
# Windows: net start MongoDB

# Setup demo data (IMPORTANT)
python setup_demo_data.py

# Start backend server
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

### Step 3: Frontend Setup

```bash
# In a new terminal, navigate to frontend
cd frontend

# Install dependencies
yarn install

# Copy environment file template
cp .env.example .env
# Edit .env if you need to change the backend URL

# Start frontend
yarn start
```

### Step 4: Verify Installation

1. Open browser to `http://localhost:3000`
2. Login with demo credentials (see below)
3. Test AI Medical Assistant
4. Navigate through all dashboards

---

## 📖 Usage Guide

### Demo Credentials

| Role | Username | Password | Access |
|------|----------|----------|--------|
| Patient | `patient1` | `patient123` | Patient Portal |
| Doctor | `doctor1` | `doctor123` | Doctor Dashboard + AI |
| Admin | `admin1` | `admin123` | Admin Panel + All |

### Workflow Examples

#### Doctor: AI-Assisted Consultation
1. Login as `doctor1`
2. Click "AI Medical Assistant" tab
3. Select a patient from the list
4. Describe symptoms: "Patient has fever 38.5°C, productive cough for 3 days"
5. Review AI recommendations including AMR considerations

#### Patient: View Lab Results
1. Login as `patient1`
2. Navigate to "Lab Results" tab
3. View AST results with resistance indicators
4. Check AMR alerts for antibiotic resistance

#### Admin: Review AMR Statistics
1. Login as `admin1`
2. View KPI dashboard
3. Check WHO AWaRe compliance metrics
4. Review resistance pattern alerts

---

## 📚 API Documentation

### Authentication
```
POST /api/auth/login      - User authentication
GET  /api/auth/me         - Current user info
```

### AI Medical Assistant
```
POST /api/ai/chat         - AI consultation (with is_ai_live status)
GET  /api/ai/amr/risk/{patient_id} - AMR risk assessment
```

### Patient Management
```
GET  /api/patients/list   - List patients
POST /api/patients/register - Register patient
GET  /api/patients/{id}   - Patient details
```

### Lab Results (NEW)
```
GET  /api/labs/ast        - Get AST results
GET  /api/labs/results/{patient_id} - Patient lab results
GET  /api/labs/resistance-patterns - AMR patterns
```

### Dashboard (NEW)
```
GET  /api/dashboard/metrics - Dashboard KPIs
GET  /api/dashboard/trends  - Trend data for charts
GET  /api/dashboard/amr-alerts - Active AMR alerts
GET  /api/dashboard/who-aware-stats - WHO AWaRe compliance
```

### Notifications (NEW)
```
GET  /api/notifications   - Get notifications
POST /api/notifications   - Create notification
GET  /api/notifications/medication-reminders/{patient_id} - Med reminders
```

---

## 🗺 Future Development Roadmap

### Phase 1: Data Integration (Priority: High)
- [ ] Connect Patient Portal components to real backend APIs
- [ ] Implement real-time notification system (WebSocket)
- [ ] Add actual lab result storage and retrieval
- [ ] Enable prescription history tracking

### Phase 2: AI Enhancement (Priority: High)
- [ ] Train custom ML models on East African resistance patterns
- [ ] Implement predictive AMR risk scoring
- [ ] Add AI-based prescription suggestions with resistance awareness
- [ ] Integrate with regional resistance databases

### Phase 3: Clinical Workflow (Priority: Medium)
- [ ] Pre-submission AMR risk alerts before prescribing
- [ ] Integration with laboratory information systems
- [ ] SMS/WhatsApp notification integration
- [ ] Offline mode for low-connectivity areas

### Phase 4: Analytics & Surveillance (Priority: Medium)
- [ ] Advanced AMR surveillance dashboard
- [ ] Geographic resistance mapping
- [ ] Antibiotic consumption reports
- [ ] Integration with national health systems

### Phase 5: Scale & Compliance (Priority: Low)
- [ ] HIPAA/GDPR compliance features
- [ ] Multi-facility support
- [ ] API for third-party integration
- [ ] Mobile application (React Native)

---

## 📝 Handover Notes

### For Senior Developers

#### Priority Items
1. **AI Configuration** - The system works with or without an OpenRouter API key:
   - With API key: Real-time AI consultations via OpenRouter
   - Without API key: Uses clinical guidelines fallback system
   - Obtain API key from openrouter.ai if needed

2. **Data Connection** - Patient Portal components need backend integration:
   - `ViewPrescriptions.js` - Connect to `/api/prescriptions`
   - `LabResults.js` - Connect to `/api/labs/results/{patient_id}`
   - `RecentNotifications.js` - Connect to `/api/notifications`
   - `MedicationReminders.js` - Connect to `/api/notifications/medication-reminders`

3. **Database Seeding** - Ensure `setup_demo_data.py` is run for demo users

#### Code Quality Notes
- All components follow React best practices with hooks
- API services centralized in `frontend/src/services/api.js`
- Backend uses Pydantic for validation
- JWT authentication with role-based access

#### Known Technical Debt
- Patient components use mock data (search for `mockPrescriptions`, `mockResults`)
- No automated tests (add Jest for frontend, pytest for backend)
- No Docker configuration yet

### Contact & Resources
- **AMR Guidelines**: WHO AWaRe Classification
- **Clinical Guidelines**: WHO Essential Medicines List
- **Regional Data**: East African Network for Surveillance of AMR

---

## 🙏 Acknowledgments

This project is aligned with global efforts to combat AMR, following principles from:
- World Health Organization (WHO) Global Action Plan on AMR
- Africa CDC AMR Framework
- East African Health Research Commission

---

## 📄 License

This project is proprietary software developed for healthcare applications.

---

*Last Updated: December 2025*
*Version: 1.0.0-beta*
