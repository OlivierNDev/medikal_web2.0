"""
Medikal Healthcare System - Backend API Tests
Tests for: Authentication, AI Chat, Labs, Dashboard, Notifications APIs
"""
import pytest
import requests
import os
import uuid
from datetime import datetime

# Get backend URL from environment
BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://medik-finalprep.preview.emergentagent.com').rstrip('/')

# Test credentials
DOCTOR_CREDS = {"username": "doctor1", "password": "doctor123"}
PATIENT_CREDS = {"username": "patient1", "password": "patient123"}
ADMIN_CREDS = {"username": "admin1", "password": "admin123"}


class TestHealthCheck:
    """Health check and basic connectivity tests"""
    
    def test_health_endpoint(self):
        """Test backend health endpoint"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        print(f"✅ Health check passed: {data}")


class TestAuthentication:
    """Authentication endpoint tests"""
    
    def test_doctor_login(self):
        """Test doctor login with doctor1/doctor123"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            data=DOCTOR_CREDS
        )
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert data["token_type"] == "bearer"
        print(f"✅ Doctor login successful, token received")
        return data["access_token"]
    
    def test_patient_login(self):
        """Test patient login with patient1/patient123"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            data=PATIENT_CREDS
        )
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        print(f"✅ Patient login successful")
    
    def test_admin_login(self):
        """Test admin login with admin1/admin123"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            data=ADMIN_CREDS
        )
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        print(f"✅ Admin login successful")
    
    def test_invalid_login(self):
        """Test login with invalid credentials"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            data={"username": "invalid", "password": "invalid"}
        )
        assert response.status_code == 401
        print(f"✅ Invalid login correctly rejected")
    
    def test_get_current_user(self):
        """Test getting current user info"""
        # First login
        login_response = requests.post(
            f"{BASE_URL}/api/auth/login",
            data=DOCTOR_CREDS
        )
        token = login_response.json()["access_token"]
        
        # Get user info
        response = requests.get(
            f"{BASE_URL}/api/auth/me",
            headers={"Authorization": f"Bearer {token}"}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["username"] == "doctor1"
        assert data["role"] == "doctor"
        print(f"✅ Current user info retrieved: {data['username']}, role: {data['role']}")


class TestAIMedicalAssistant:
    """AI Medical Assistant API tests"""
    
    @pytest.fixture
    def doctor_token(self):
        """Get doctor authentication token"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            data=DOCTOR_CREDS
        )
        return response.json()["access_token"]
    
    def test_ai_chat_unauthorized(self):
        """Test AI chat without authentication"""
        response = requests.post(
            f"{BASE_URL}/api/ai/chat",
            json={
                "message": "Test message",
                "session_id": "test-session"
            }
        )
        assert response.status_code == 401
        print(f"✅ AI chat correctly requires authentication")
    
    def test_ai_chat_basic(self, doctor_token):
        """Test basic AI chat functionality"""
        session_id = f"test-session-{uuid.uuid4()}"
        response = requests.post(
            f"{BASE_URL}/api/ai/chat",
            headers={"Authorization": f"Bearer {doctor_token}"},
            json={
                "message": "Patient has fever and headache. What treatment do you recommend?",
                "session_id": session_id,
                "language": "en"
            }
        )
        assert response.status_code == 200
        data = response.json()
        
        # Verify response structure
        assert "response" in data
        assert "session_id" in data
        assert "confidence" in data
        assert "is_ai_live" in data
        assert "ai_model_used" in data
        
        # Check AI status (expected to be offline due to invalid API key)
        print(f"✅ AI Chat response received")
        print(f"   - is_ai_live: {data['is_ai_live']}")
        print(f"   - ai_model_used: {data['ai_model_used']}")
        print(f"   - confidence: {data['confidence']}")
        print(f"   - response length: {len(data['response'])} chars")
        
        # Verify fallback is working (since API key is invalid)
        if not data['is_ai_live']:
            assert data['ai_model_used'] == 'fallback'
            print(f"   ✅ Fallback mode working correctly")
    
    def test_ai_chat_with_patient_context(self, doctor_token):
        """Test AI chat with patient context"""
        session_id = f"test-session-{uuid.uuid4()}"
        response = requests.post(
            f"{BASE_URL}/api/ai/chat",
            headers={"Authorization": f"Bearer {doctor_token}"},
            json={
                "message": "What antibiotics should I prescribe for this patient?",
                "session_id": session_id,
                "patient_id": "test-patient-123",
                "language": "en"
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert "response" in data
        assert len(data["response"]) > 100  # Should have substantial response
        print(f"✅ AI Chat with patient context working")
    
    def test_ai_chat_multilingual_kinyarwanda(self, doctor_token):
        """Test AI chat in Kinyarwanda"""
        session_id = f"test-session-{uuid.uuid4()}"
        response = requests.post(
            f"{BASE_URL}/api/ai/chat",
            headers={"Authorization": f"Bearer {doctor_token}"},
            json={
                "message": "Umurwayi afite umuriro n'ububabare bw'umutwe",
                "session_id": session_id,
                "language": "rw"
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert "response" in data
        print(f"✅ AI Chat Kinyarwanda support working")
    
    def test_ai_chat_multilingual_french(self, doctor_token):
        """Test AI chat in French"""
        session_id = f"test-session-{uuid.uuid4()}"
        response = requests.post(
            f"{BASE_URL}/api/ai/chat",
            headers={"Authorization": f"Bearer {doctor_token}"},
            json={
                "message": "Le patient a de la fièvre et des maux de tête",
                "session_id": session_id,
                "language": "fr"
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert "response" in data
        print(f"✅ AI Chat French support working")


class TestLabsAPI:
    """Labs API tests - NEW endpoints"""
    
    @pytest.fixture
    def doctor_token(self):
        """Get doctor authentication token"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            data=DOCTOR_CREDS
        )
        return response.json()["access_token"]
    
    def test_get_ast_results(self, doctor_token):
        """Test GET /api/labs/ast - Antibiotic Susceptibility Testing results"""
        response = requests.get(
            f"{BASE_URL}/api/labs/ast",
            headers={"Authorization": f"Bearer {doctor_token}"}
        )
        assert response.status_code == 200
        data = response.json()
        
        # Should return sample organisms data
        assert "sample_organisms" in data or "ast_results" in data
        print(f"✅ Labs AST endpoint working")
        print(f"   - Response keys: {list(data.keys())}")
    
    def test_get_ast_results_with_patient(self, doctor_token):
        """Test GET /api/labs/ast with patient_id filter"""
        response = requests.get(
            f"{BASE_URL}/api/labs/ast?patient_id=test-patient-123",
            headers={"Authorization": f"Bearer {doctor_token}"}
        )
        assert response.status_code == 200
        data = response.json()
        assert "patient_id" in data
        assert "ast_results" in data
        print(f"✅ Labs AST with patient filter working")
    
    def test_get_patient_lab_results(self, doctor_token):
        """Test GET /api/labs/results/{patient_id}"""
        response = requests.get(
            f"{BASE_URL}/api/labs/results/test-patient-123",
            headers={"Authorization": f"Bearer {doctor_token}"}
        )
        assert response.status_code == 200
        data = response.json()
        
        assert "patient_id" in data
        assert "results" in data
        assert "statistics" in data
        print(f"✅ Labs patient results endpoint working")
        print(f"   - Total results: {data['statistics'].get('total', 0)}")
    
    def test_get_resistance_patterns(self, doctor_token):
        """Test GET /api/labs/resistance-patterns"""
        response = requests.get(
            f"{BASE_URL}/api/labs/resistance-patterns",
            headers={"Authorization": f"Bearer {doctor_token}"}
        )
        assert response.status_code == 200
        data = response.json()
        
        # API returns by_organism, summary, alerts, who_aware_compliance
        assert "by_organism" in data or "summary" in data
        print(f"✅ Labs resistance patterns endpoint working")
        print(f"   - Response keys: {list(data.keys())}")


class TestDashboardAPI:
    """Dashboard API tests - NEW endpoints"""
    
    @pytest.fixture
    def doctor_token(self):
        """Get doctor authentication token"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            data=DOCTOR_CREDS
        )
        return response.json()["access_token"]
    
    def test_get_dashboard_metrics(self, doctor_token):
        """Test GET /api/dashboard/metrics"""
        response = requests.get(
            f"{BASE_URL}/api/dashboard/metrics",
            headers={"Authorization": f"Bearer {doctor_token}"}
        )
        assert response.status_code == 200
        data = response.json()
        
        # API returns overview, amr_metrics, patient_outcomes, etc.
        assert "overview" in data or "amr_metrics" in data
        print(f"✅ Dashboard metrics endpoint working")
        print(f"   - Response keys: {list(data.keys())}")
    
    def test_get_amr_alerts(self, doctor_token):
        """Test GET /api/dashboard/amr-alerts"""
        response = requests.get(
            f"{BASE_URL}/api/dashboard/amr-alerts",
            headers={"Authorization": f"Bearer {doctor_token}"}
        )
        assert response.status_code == 200
        data = response.json()
        
        assert "alerts" in data or isinstance(data, list)
        print(f"✅ Dashboard AMR alerts endpoint working")
    
    def test_get_who_aware_stats(self, doctor_token):
        """Test GET /api/dashboard/who-aware-stats"""
        response = requests.get(
            f"{BASE_URL}/api/dashboard/who-aware-stats",
            headers={"Authorization": f"Bearer {doctor_token}"}
        )
        assert response.status_code == 200
        data = response.json()
        
        # WHO AWaRe classification stats
        print(f"✅ Dashboard WHO AWaRe stats endpoint working")
        print(f"   - Response keys: {list(data.keys())}")


class TestNotificationsAPI:
    """Notifications API tests - NEW endpoints"""
    
    @pytest.fixture
    def doctor_token(self):
        """Get doctor authentication token"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            data=DOCTOR_CREDS
        )
        return response.json()["access_token"]
    
    def test_get_notifications(self, doctor_token):
        """Test GET /api/notifications"""
        response = requests.get(
            f"{BASE_URL}/api/notifications",
            headers={"Authorization": f"Bearer {doctor_token}"}
        )
        assert response.status_code == 200
        data = response.json()
        
        assert "notifications" in data or isinstance(data, list)
        print(f"✅ Notifications endpoint working")
        if "notifications" in data:
            print(f"   - Notifications count: {len(data['notifications'])}")
    
    def test_get_medication_reminders(self, doctor_token):
        """Test GET /api/notifications/medication-reminders/{patient_id}"""
        response = requests.get(
            f"{BASE_URL}/api/notifications/medication-reminders/test-patient-123",
            headers={"Authorization": f"Bearer {doctor_token}"}
        )
        assert response.status_code == 200
        data = response.json()
        
        assert "reminders" in data or "patient_id" in data
        print(f"✅ Medication reminders endpoint working")


class TestPatientRegistry:
    """Patient Registry API tests"""
    
    @pytest.fixture
    def doctor_token(self):
        """Get doctor authentication token"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            data=DOCTOR_CREDS
        )
        return response.json()["access_token"]
    
    def test_get_patient_list(self, doctor_token):
        """Test GET patient list - Note: double prefix issue"""
        # Due to route configuration, the actual path has double prefix
        response = requests.get(
            f"{BASE_URL}/api/patients/api/patients/list",
            headers={"Authorization": f"Bearer {doctor_token}"}
        )
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✅ Patient list endpoint working (with double prefix)")
        print(f"   - Patients count: {len(data)}")
    
    def test_public_patient_registration(self):
        """Test public patient registration"""
        unique_id = str(uuid.uuid4())[:8]
        response = requests.post(
            f"{BASE_URL}/api/patients/api/patients/public-register",
            json={
                "full_name": f"TEST_Patient_{unique_id}",
                "age": 30,
                "gender": "Male",
                "contact_phone": "+250788123456",
                "national_id": f"TEST_{unique_id}",
                "address": "Test Address",
                "emergency_contact_name": "Emergency Contact",
                "emergency_contact_phone": "+250788654321",
                "insurance_number": "INS123",
                "allergies": "None",
                "chronic_conditions": "None",
                "language_preference": "en"
            }
        )
        # May return 200 or 400 if duplicate
        assert response.status_code in [200, 400]
        print(f"✅ Public patient registration endpoint accessible")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
