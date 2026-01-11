# Medikal - Product Requirements Document (PRD)

## 1. Overview

**Product Name**: Medikal - AI-Powered Clinical Decision Support System  
**Version**: 1.0.0-beta  
**Last Updated**: December 2025  
**Status**: Demo-Ready for Handover

---

## 2. Problem Statement

Antimicrobial Resistance (AMR) is a critical public health threat in Africa, exacerbated by:
- Limited laboratory infrastructure for culture/sensitivity testing
- Over-the-counter antibiotic availability
- Inadequate surveillance systems
- Healthcare worker shortages
- High infectious disease burden

**Solution**: Medikal provides AI-powered clinical decision support to guide antibiotic prescribing and reduce inappropriate antimicrobial use.

---

## 3. User Personas

### 3.1 Doctor/Clinician
- Needs quick access to patient history
- Wants AI-assisted treatment recommendations
- Must follow AMR stewardship guidelines
- Requires multilingual support (English, Kinyarwanda, French)

### 3.2 Patient
- Self-registration capability
- View prescriptions and reminders
- Access lab results
- Book appointments

### 3.3 Administrator
- System oversight and analytics
- User management
- AMR surveillance monitoring
- WHO AWaRe compliance tracking

---

## 4. Core Requirements

### 4.1 Authentication & Authorization
- [x] JWT-based authentication
- [x] Role-based access control (Patient, Doctor, Admin)
- [x] Secure password hashing
- [x] Session management

### 4.2 AI Medical Assistant
- [x] Real-time AI consultation via OpenRouter
- [x] Patient context integration
- [x] Multilingual support (EN/RW/FR)
- [x] Fallback system with clinical guidelines
- [x] AI status indicator (Live/Offline)

### 4.3 Patient Management
- [x] Patient registration with validation
- [x] Patient search and listing
- [x] Visit history tracking
- [x] Medical record management

### 4.4 Prescription Management
- [x] Prescription creation and tracking
- [x] WHO AWaRe classification
- [ ] Pre-prescription AMR alerts

### 4.5 Lab Results & AST
- [x] Lab results API with sample data
- [x] AST (Antibiotic Susceptibility Testing) display
- [x] Resistance pattern visualization
- [ ] Real lab system integration

### 4.6 Dashboard & Analytics
- [x] Dashboard metrics API
- [x] AMR alerts system
- [x] WHO AWaRe compliance stats
- [ ] Real-time data from database

### 4.7 Notifications
- [x] Notification API with sample data
- [x] Medication reminder system
- [ ] SMS/WhatsApp integration

---

## 5. Technical Architecture

### 5.1 Frontend
- **Framework**: React 18
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Components**: Shadcn/UI

### 5.2 Backend
- **Framework**: FastAPI (Python)
- **Database**: MongoDB
- **Authentication**: JWT + OAuth2
- **AI Gateway**: OpenRouter

### 5.3 Key Files
```
Backend:
- /app/backend/server.py - Main application
- /app/backend/routes/ai.py - AI Medical Assistant
- /app/backend/routes/labs.py - Lab Results API
- /app/backend/routes/dashboard.py - Analytics API
- /app/backend/routes/notifications.py - Notifications API

Frontend:
- /app/frontend/src/App.js - Main routing
- /app/frontend/src/pages/PatientPortal.js - Patient dashboard
- /app/frontend/src/components/AIMedicalAssistant.js - AI chat
- /app/frontend/src/services/api.js - API services
```

---

## 6. What's Been Implemented

### December 2025 - Phase 1 Complete

| Feature | Status | Notes |
|---------|--------|-------|
| Three-role authentication | ✅ Complete | JWT-based |
| Doctor Dashboard (5 tabs) | ✅ Complete | Patient Registry, Queue, Consultation, Diagnostic, AI |
| Patient Portal (7 modules) | ✅ Complete | Registration, Prescriptions, Reminders, History, Notifications, Appointments, Labs |
| AI Medical Assistant | ✅ Complete | With fallback & status indicator |
| Backend APIs | ✅ Complete | 25+ endpoints |
| Labs API | ✅ Complete | Sample data |
| Dashboard API | ✅ Complete | Sample data |
| Notifications API | ✅ Complete | Sample data |
| README documentation | ✅ Complete | Comprehensive handover guide |

---

## 7. Prioritized Backlog

### P0 - Critical (Must Have)
1. **AI API Key Configuration** - Configure OPENROUTER_API_KEY in .env if AI features needed (optional - system works with fallback)
2. **Connect Patient Portal to backend** - Currently using mock data
3. **Database seeding automation** - Reliable demo data

### P1 - High Priority
4. **Real-time notifications** - WebSocket implementation
5. **Actual lab result storage** - MongoDB integration
6. **Prescription history tracking** - Full CRUD with database

### P2 - Medium Priority
7. **Custom ML models for AMR** - Train on East African data
8. **SMS/WhatsApp integration** - Medication reminders
9. **Offline mode** - Low-connectivity support

### P3 - Low Priority (Nice to Have)
10. **Mobile application** - React Native
11. **Multi-facility support** - Hospital network
12. **Advanced analytics** - Predictive models

---

## 8. Known Issues

### 8.1 AI API Status
- **Status**: System works with or without API key
- **With API Key**: Real-time AI consultations via OpenRouter
- **Without API Key**: Uses clinical guidelines fallback system
- **Configuration**: Set OPENROUTER_API_KEY in .env (optional)

### 8.2 Mock Data in Patient Portal
- **Issue**: Patient Portal components use hardcoded mock data
- **Impact**: Data doesn't persist or sync with backend
- **Fix**: Update components to fetch from new backend APIs

---

## 9. API Endpoints Reference

### Authentication
- POST /api/auth/login
- GET /api/auth/me

### AI
- POST /api/ai/chat (with is_ai_live status)
- GET /api/ai/amr/risk/{patient_id}

### Labs (NEW)
- GET /api/labs/ast
- GET /api/labs/results/{patient_id}
- GET /api/labs/resistance-patterns
- POST /api/labs/results

### Dashboard (NEW)
- GET /api/dashboard/metrics
- GET /api/dashboard/trends
- GET /api/dashboard/amr-alerts
- GET /api/dashboard/who-aware-stats

### Notifications (NEW)
- GET /api/notifications
- POST /api/notifications
- GET /api/notifications/medication-reminders/{patient_id}

---

## 10. Demo Credentials

| Role | Username | Password |
|------|----------|----------|
| Patient | patient1 | patient123 |
| Doctor | doctor1 | doctor123 |
| Admin | admin1 | admin123 |

---

## 11. Next Steps for Senior Developers

1. **Verify/Replace OpenRouter API key**
2. **Connect Patient Portal components to backend APIs**:
   - ViewPrescriptions → /api/prescriptions
   - LabResults → /api/labs/results/{patient_id}
   - RecentNotifications → /api/notifications
   - MedicationReminders → /api/notifications/medication-reminders
3. **Add WebSocket for real-time notifications**
4. **Implement automated testing (Jest + pytest)**
5. **Add Docker configuration for deployment**

---

*Document maintained by Medikal Development Team*
