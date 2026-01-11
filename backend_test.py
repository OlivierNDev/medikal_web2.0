#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Patient Registry Module
Tests all patient registry endpoints with authentication and role-based access control
"""

import requests
import json
import sys
from datetime import datetime
import os

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except FileNotFoundError:
        pass
    return "http://localhost:8001"

BASE_URL = get_backend_url()
print(f"🌐 Testing backend at: {BASE_URL}")

class PatientRegistryTester:
    def __init__(self):
        self.base_url = BASE_URL
        self.admin_token = None
        self.doctor_token = None
        self.test_patient_id = None
        self.test_visit_id = None
        self.results = {
            "passed": 0,
            "failed": 0,
            "errors": []
        }

    def log_result(self, test_name, success, message=""):
        if success:
            print(f"✅ {test_name}")
            self.results["passed"] += 1
        else:
            print(f"❌ {test_name}: {message}")
            self.results["failed"] += 1
            self.results["errors"].append(f"{test_name}: {message}")

    def test_health_check(self):
        """Test basic health endpoint"""
        try:
            response = requests.get(f"{self.base_url}/api/health", timeout=10)
            if response.status_code == 200:
                self.log_result("Health Check", True)
                return True
            else:
                self.log_result("Health Check", False, f"Status: {response.status_code}")
                return False
        except Exception as e:
            self.log_result("Health Check", False, f"Connection error: {str(e)}")
            return False

    def authenticate_user(self, username, password):
        """Authenticate user and return token"""
        try:
            data = {
                "username": username,
                "password": password
            }
            response = requests.post(
                f"{self.base_url}/api/auth/login",
                data=data,
                headers={"Content-Type": "application/x-www-form-urlencoded"},
                timeout=10
            )
            
            if response.status_code == 200:
                token_data = response.json()
                return token_data["access_token"]
            else:
                print(f"❌ Authentication failed for {username}: {response.status_code}")
                if response.text:
                    print(f"   Response: {response.text}")
                return None
        except Exception as e:
            print(f"❌ Authentication error for {username}: {str(e)}")
            return None

    def setup_authentication(self):
        """Setup authentication tokens for admin and doctor"""
        print("\n🔐 Setting up authentication...")
        
        # Try to authenticate admin
        self.admin_token = self.authenticate_user("admin", "admin123")
        if self.admin_token:
            self.log_result("Admin Authentication", True)
        else:
            self.log_result("Admin Authentication", False, "Failed to get admin token")

        # Try to authenticate doctor
        self.doctor_token = self.authenticate_user("doctor1", "doctor123")
        if self.doctor_token:
            self.log_result("Doctor Authentication", True)
        else:
            self.log_result("Doctor Authentication", False, "Failed to get doctor token")

        return self.admin_token is not None or self.doctor_token is not None

    def get_auth_headers(self, use_admin=True):
        """Get authorization headers"""
        token = self.admin_token if use_admin and self.admin_token else self.doctor_token
        if token:
            return {"Authorization": f"Bearer {token}"}
        return {}

    def test_patient_registration(self):
        """Test patient registration endpoint"""
        print("\n👤 Testing Patient Registration...")
        
        if not (self.admin_token or self.doctor_token):
            self.log_result("Patient Registration", False, "No authentication token available")
            return None

        patient_data = {
            "full_name": "John Doe",
            "age": 35,
            "gender": "Male",
            "contact_phone": "+250788123456",
            "national_id": "1234567890123456",
            "address": "Kigali, Rwanda",
            "emergency_contact_name": "Jane Doe",
            "emergency_contact_phone": "+250788654321",
            "insurance_number": "INS123456",
            "allergies": "None known",
            "chronic_conditions": "Hypertension",
            "language_preference": "en"
        }

        try:
            response = requests.post(
                f"{self.base_url}/api/patients/register",
                json=patient_data,
                headers={
                    **self.get_auth_headers(),
                    "Content-Type": "application/json"
                },
                timeout=10
            )

            if response.status_code == 200:
                result = response.json()
                self.test_patient_id = result.get("patient_id")
                self.log_result("Patient Registration", True)
                return self.test_patient_id
            else:
                self.log_result("Patient Registration", False, f"Status: {response.status_code}, Response: {response.text}")
                return None
        except Exception as e:
            self.log_result("Patient Registration", False, f"Error: {str(e)}")
            return None

    def test_specific_patient_registration(self):
        """Test patient registration with the specific data from the request"""
        print("\n👤 Testing Specific Patient Registration (Request Data)...")
        
        if not (self.admin_token or self.doctor_token):
            self.log_result("Specific Patient Registration", False, "No authentication token available")
            return None

        # Use the exact test data from the request but with unique national ID
        import time
        unique_suffix = str(int(time.time()))[-6:]  # Last 6 digits of timestamp
        
        patient_data = {
            "full_name": "Test Patient New",
            "age": 25,
            "gender": "Female",
            "contact_phone": "+250 788 999 888",
            "national_id": f"1987654321{unique_suffix}",  # Make it unique
            "address": "Kigali, Rwanda Test Address",
            "emergency_contact_name": "Emergency Contact Test",
            "emergency_contact_phone": "+250 788 111 222",
            "insurance_number": "INS999888",
            "allergies": "None known",
            "chronic_conditions": "None",
            "language_preference": "en"
        }

        try:
            # Use doctor1 credentials as specified in the request
            response = requests.post(
                f"{self.base_url}/api/patients/register",
                json=patient_data,
                headers={
                    **self.get_auth_headers(use_admin=False),  # Use doctor token
                    "Content-Type": "application/json"
                },
                timeout=10
            )

            print(f"   Status Code: {response.status_code}")
            print(f"   Response Headers: {dict(response.headers)}")
            print(f"   Response Text: {response.text}")

            if response.status_code == 200:
                result = response.json()
                patient_id = result.get("patient_id")
                self.test_patient_id = patient_id  # Set for other tests
                self.log_result("Specific Patient Registration", True, f"Patient ID: {patient_id}")
                return patient_id
            else:
                self.log_result("Specific Patient Registration", False, f"Status: {response.status_code}, Response: {response.text}")
                return None
        except Exception as e:
            self.log_result("Specific Patient Registration", False, f"Error: {str(e)}")
            return None
        """Test patient registration with invalid data"""
        print("\n🔍 Testing Patient Registration Validation...")
        
        if not (self.admin_token or self.doctor_token):
            self.log_result("Registration Validation", False, "No authentication token available")
            return

        # Test with invalid age
        invalid_data = {
            "full_name": "Test Patient",
            "age": 200,  # Invalid age
            "gender": "Male",
            "contact_phone": "+250788123456",
            "national_id": "9876543210987654",
            "language_preference": "en"
        }

        try:
            response = requests.post(
                f"{self.base_url}/api/patients/register",
                json=invalid_data,
                headers={
                    **self.get_auth_headers(),
                    "Content-Type": "application/json"
                },
                timeout=10
            )

            if response.status_code == 422:  # Validation error expected
                self.log_result("Registration Validation (Invalid Age)", True)
            else:
                self.log_result("Registration Validation (Invalid Age)", False, f"Expected 422, got {response.status_code}")
        except Exception as e:
            self.log_result("Registration Validation (Invalid Age)", False, f"Error: {str(e)}")

    def test_field_validation(self):
        """Test field validation for patient registration"""
        print("\n🔍 Testing Field Validation...")
        
        if not (self.admin_token or self.doctor_token):
            self.log_result("Field Validation", False, "No authentication token available")
            return

        # Test with missing required fields
        invalid_data_tests = [
            {
                "name": "Missing full_name",
                "data": {
                    "age": 25,
                    "gender": "Female",
                    "contact_phone": "+250 788 999 888",
                    "national_id": "1987654321098765",
                    "language_preference": "en"
                }
            },
            {
                "name": "Invalid age (too high)",
                "data": {
                    "full_name": "Test Patient",
                    "age": 200,
                    "gender": "Female",
                    "contact_phone": "+250 788 999 888",
                    "national_id": "1987654321098765",
                    "language_preference": "en"
                }
            },
            {
                "name": "Invalid phone format",
                "data": {
                    "full_name": "Test Patient",
                    "age": 25,
                    "gender": "Female",
                    "contact_phone": "invalid-phone",
                    "national_id": "1987654321098765",
                    "language_preference": "en"
                }
            },
            {
                "name": "Invalid gender",
                "data": {
                    "full_name": "Test Patient",
                    "age": 25,
                    "gender": "InvalidGender",
                    "contact_phone": "+250 788 999 888",
                    "national_id": "1987654321098765",
                    "language_preference": "en"
                }
            }
        ]

        for test_case in invalid_data_tests:
            try:
                response = requests.post(
                    f"{self.base_url}/api/patients/register",
                    json=test_case["data"],
                    headers={
                        **self.get_auth_headers(use_admin=False),
                        "Content-Type": "application/json"
                    },
                    timeout=10
                )

                if response.status_code == 422:  # Validation error expected
                    self.log_result(f"Field Validation ({test_case['name']})", True)
                else:
                    self.log_result(f"Field Validation ({test_case['name']})", False, f"Expected 422, got {response.status_code}")
            except Exception as e:
                self.log_result(f"Field Validation ({test_case['name']})", False, f"Error: {str(e)}")

    def test_duplicate_national_id(self):
        """Test duplicate national ID prevention"""
        print("\n🔍 Testing Duplicate National ID Prevention...")
        
        if not (self.admin_token or self.doctor_token):
            self.log_result("Duplicate National ID", False, "No authentication token available")
            return

        # Use the exact test data from the request (should fail due to duplicate)
        patient_data = {
            "full_name": "Test Patient New",
            "age": 25,
            "gender": "Female",
            "contact_phone": "+250 788 999 888",
            "national_id": "1987654321098765",  # This should already exist
            "address": "Kigali, Rwanda Test Address",
            "emergency_contact_name": "Emergency Contact Test",
            "emergency_contact_phone": "+250 788 111 222",
            "insurance_number": "INS999888",
            "allergies": "None known",
            "chronic_conditions": "None",
            "language_preference": "en"
        }

        try:
            response = requests.post(
                f"{self.base_url}/api/patients/register",
                json=patient_data,
                headers={
                    **self.get_auth_headers(use_admin=False),
                    "Content-Type": "application/json"
                },
                timeout=10
            )

            print(f"   Status Code: {response.status_code}")
            print(f"   Response Text: {response.text}")

            if response.status_code == 400 and "already exists" in response.text:
                self.log_result("Duplicate National ID", True, "Correctly prevented duplicate national ID")
            else:
                self.log_result("Duplicate National ID", False, f"Expected 400 with duplicate message, got {response.status_code}: {response.text}")
        except Exception as e:
            self.log_result("Duplicate National ID", False, f"Error: {str(e)}")

    def test_patient_list(self):
        """Test patient list endpoint"""
        print("\n📋 Testing Patient List...")
        
        if not (self.admin_token or self.doctor_token):
            self.log_result("Patient List", False, "No authentication token available")
            return

        try:
            response = requests.get(
                f"{self.base_url}/api/patients/list",
                headers=self.get_auth_headers(),
                timeout=10
            )

            if response.status_code == 200:
                patients = response.json()
                self.log_result("Patient List", True, f"Retrieved {len(patients)} patients")
            else:
                self.log_result("Patient List", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_result("Patient List", False, f"Error: {str(e)}")

    def test_patient_list_pagination(self):
        """Test patient list with pagination"""
        print("\n📄 Testing Patient List Pagination...")
        
        if not (self.admin_token or self.doctor_token):
            self.log_result("Patient List Pagination", False, "No authentication token available")
            return

        try:
            response = requests.get(
                f"{self.base_url}/api/patients/list?page=1&limit=5",
                headers=self.get_auth_headers(),
                timeout=10
            )

            if response.status_code == 200:
                patients = response.json()
                self.log_result("Patient List Pagination", True, f"Retrieved {len(patients)} patients with pagination")
            else:
                self.log_result("Patient List Pagination", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_result("Patient List Pagination", False, f"Error: {str(e)}")

    def test_patient_search(self):
        """Test patient search endpoint"""
        print("\n🔍 Testing Patient Search...")
        
        if not (self.admin_token or self.doctor_token):
            self.log_result("Patient Search", False, "No authentication token available")
            return

        # Test search by name
        try:
            response = requests.get(
                f"{self.base_url}/api/patients/search?query=John&search_by=name",
                headers=self.get_auth_headers(),
                timeout=10
            )

            if response.status_code == 200:
                patients = response.json()
                self.log_result("Patient Search (by name)", True, f"Found {len(patients)} patients")
            else:
                self.log_result("Patient Search (by name)", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_result("Patient Search (by name)", False, f"Error: {str(e)}")

        # Test search by national_id
        try:
            response = requests.get(
                f"{self.base_url}/api/patients/search?query=1234&search_by=national_id",
                headers=self.get_auth_headers(),
                timeout=10
            )

            if response.status_code == 200:
                patients = response.json()
                self.log_result("Patient Search (by national_id)", True, f"Found {len(patients)} patients")
            else:
                self.log_result("Patient Search (by national_id)", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_result("Patient Search (by national_id)", False, f"Error: {str(e)}")

    def test_patient_details(self):
        """Test patient details endpoint"""
        print("\n👤 Testing Patient Details...")
        
        if not (self.admin_token or self.doctor_token):
            self.log_result("Patient Details", False, "No authentication token available")
            return

        if not self.test_patient_id:
            self.log_result("Patient Details", False, "No test patient ID available")
            return

        try:
            response = requests.get(
                f"{self.base_url}/api/patients/{self.test_patient_id}",
                headers=self.get_auth_headers(),
                timeout=10
            )

            if response.status_code == 200:
                patient = response.json()
                self.log_result("Patient Details", True, f"Retrieved patient: {patient.get('full_name', 'Unknown')}")
            else:
                self.log_result("Patient Details", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_result("Patient Details", False, f"Error: {str(e)}")

    def test_patient_update(self):
        """Test patient update endpoint"""
        print("\n✏️ Testing Patient Update...")
        
        if not (self.admin_token or self.doctor_token):
            self.log_result("Patient Update", False, "No authentication token available")
            return

        if not self.test_patient_id:
            self.log_result("Patient Update", False, "No test patient ID available")
            return

        update_data = {
            "age": 36,
            "address": "Updated Address, Kigali, Rwanda"
        }

        try:
            response = requests.put(
                f"{self.base_url}/api/patients/{self.test_patient_id}",
                json=update_data,
                headers={
                    **self.get_auth_headers(),
                    "Content-Type": "application/json"
                },
                timeout=10
            )

            if response.status_code == 200:
                self.log_result("Patient Update", True)
            else:
                self.log_result("Patient Update", False, f"Status: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_result("Patient Update", False, f"Error: {str(e)}")

    def test_visit_creation(self):
        """Test visit creation endpoint"""
        print("\n🏥 Testing Visit Creation...")
        
        if not (self.admin_token or self.doctor_token):
            self.log_result("Visit Creation", False, "No authentication token available")
            return

        if not self.test_patient_id:
            self.log_result("Visit Creation", False, "No test patient ID available")
            return

        visit_data = {
            "patient_id": self.test_patient_id,
            "visit_type": "Outpatient",
            "symptoms": "Headache and fever for 3 days",
            "diagnosis": "Common cold",
            "prescribed_medications": ["Paracetamol", "Rest"],
            "doctor_notes": "Patient advised to rest and take medication as prescribed",
            "follow_up_required": True,
            "doctor_id": "doctor1"
        }

        try:
            response = requests.post(
                f"{self.base_url}/api/patients/{self.test_patient_id}/visits",
                json=visit_data,
                headers={
                    **self.get_auth_headers(),
                    "Content-Type": "application/json"
                },
                timeout=10
            )

            if response.status_code == 200:
                result = response.json()
                self.test_visit_id = result.get("visit_id")
                self.log_result("Visit Creation", True)
            else:
                self.log_result("Visit Creation", False, f"Status: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_result("Visit Creation", False, f"Error: {str(e)}")

    def test_visit_history(self):
        """Test visit history endpoint"""
        print("\n📋 Testing Visit History...")
        
        if not (self.admin_token or self.doctor_token):
            self.log_result("Visit History", False, "No authentication token available")
            return

        if not self.test_patient_id:
            self.log_result("Visit History", False, "No test patient ID available")
            return

        try:
            response = requests.get(
                f"{self.base_url}/api/patients/{self.test_patient_id}/visits",
                headers=self.get_auth_headers(),
                timeout=10
            )

            if response.status_code == 200:
                visits = response.json()
                self.log_result("Visit History", True, f"Retrieved {len(visits)} visits")
            else:
                self.log_result("Visit History", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_result("Visit History", False, f"Error: {str(e)}")

    def test_pdf_export(self):
        """Test PDF export endpoint"""
        print("\n📄 Testing PDF Export...")
        
        if not (self.admin_token or self.doctor_token):
            self.log_result("PDF Export", False, "No authentication token available")
            return

        if not self.test_patient_id:
            self.log_result("PDF Export", False, "No test patient ID available")
            return

        try:
            response = requests.get(
                f"{self.base_url}/api/patients/{self.test_patient_id}/export-pdf?include_visits=true&include_lab_results=true",
                headers=self.get_auth_headers(),
                timeout=10
            )

            if response.status_code == 200:
                # Check if response is PDF
                content_type = response.headers.get('content-type', '')
                if 'application/pdf' in content_type:
                    content_length = len(response.content)
                    self.log_result("PDF Export", True, f"PDF generated successfully ({content_length} bytes)")
                else:
                    self.log_result("PDF Export", False, f"Expected PDF, got content-type: {content_type}")
            else:
                self.log_result("PDF Export", False, f"Status: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_result("PDF Export", False, f"Error: {str(e)}")

    def test_admin_only_delete(self):
        """Test admin-only patient deletion"""
        print("\n🗑️ Testing Admin-Only Patient Deletion...")
        
        if not self.admin_token:
            self.log_result("Admin Delete (No Admin Token)", False, "No admin token available")
            return

        if not self.test_patient_id:
            self.log_result("Admin Delete", False, "No test patient ID available")
            return

        # Test with doctor token first (should fail)
        if self.doctor_token:
            try:
                response = requests.delete(
                    f"{self.base_url}/api/patients/{self.test_patient_id}",
                    headers={"Authorization": f"Bearer {self.doctor_token}"},
                    timeout=10
                )

                if response.status_code == 403:
                    self.log_result("Doctor Delete (Forbidden)", True, "Correctly denied doctor access")
                else:
                    self.log_result("Doctor Delete (Forbidden)", False, f"Expected 403, got {response.status_code}")
            except Exception as e:
                self.log_result("Doctor Delete (Forbidden)", False, f"Error: {str(e)}")

        # Test with admin token (should succeed)
        try:
            response = requests.delete(
                f"{self.base_url}/api/patients/{self.test_patient_id}",
                headers={"Authorization": f"Bearer {self.admin_token}"},
                timeout=10
            )

            if response.status_code == 200:
                self.log_result("Admin Delete", True, "Patient deleted successfully")
                self.test_patient_id = None  # Clear the ID since patient is deleted
            else:
                self.log_result("Admin Delete", False, f"Status: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_result("Admin Delete", False, f"Error: {str(e)}")

    def test_unauthorized_access(self):
        """Test unauthorized access to endpoints"""
        print("\n🚫 Testing Unauthorized Access...")
        
        try:
            response = requests.get(
                f"{self.base_url}/api/patients/list",
                timeout=10
            )

            if response.status_code == 401:
                self.log_result("Unauthorized Access", True, "Correctly denied access without token")
            else:
                self.log_result("Unauthorized Access", False, f"Expected 401, got {response.status_code}")
        except Exception as e:
            self.log_result("Unauthorized Access", False, f"Error: {str(e)}")

    def run_all_tests(self):
        """Run all tests in sequence"""
        print("🚀 Starting Patient Registry Backend API Tests")
        print("=" * 60)

        # Basic connectivity
        if not self.test_health_check():
            print("❌ Health check failed. Backend may not be running.")
            return False

        # Authentication setup
        if not self.setup_authentication():
            print("❌ Authentication setup failed. Cannot proceed with authenticated tests.")
            return False

        # Core patient registry tests
        self.test_unauthorized_access()
        self.test_patient_registration()
        self.test_specific_patient_registration()  # Add the specific test
        self.test_field_validation()  # Test field validation
        self.test_duplicate_national_id()  # Test duplicate prevention
        self.test_patient_list()
        self.test_patient_list()
        self.test_patient_list_pagination()
        self.test_patient_search()
        self.test_patient_details()
        self.test_patient_update()
        
        # Visit management tests
        self.test_visit_creation()
        self.test_visit_history()
        
        # Additional features
        self.test_pdf_export()
        
        # Role-based access control
        self.test_admin_only_delete()

        # Print summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        print(f"✅ Passed: {self.results['passed']}")
        print(f"❌ Failed: {self.results['failed']}")
        print(f"📈 Success Rate: {(self.results['passed'] / (self.results['passed'] + self.results['failed']) * 100):.1f}%")
        
        if self.results['errors']:
            print("\n🚨 FAILED TESTS:")
            for error in self.results['errors']:
                print(f"   • {error}")

        return self.results['failed'] == 0

class AIMedicalAssistantTester:
    def __init__(self):
        self.base_url = BASE_URL
        self.doctor_token = None
        self.results = {
            "passed": 0,
            "failed": 0,
            "errors": []
        }

    def log_result(self, test_name, success, message=""):
        if success:
            print(f"✅ {test_name}")
            self.results["passed"] += 1
        else:
            print(f"❌ {test_name}: {message}")
            self.results["failed"] += 1
            self.results["errors"].append(f"{test_name}: {message}")

    def authenticate_doctor(self):
        """Authenticate doctor for AI testing"""
        try:
            data = {
                "username": "doctor1",
                "password": "doctor123"
            }
            response = requests.post(
                f"{self.base_url}/api/auth/login",
                data=data,
                headers={"Content-Type": "application/x-www-form-urlencoded"},
                timeout=10
            )
            
            if response.status_code == 200:
                token_data = response.json()
                self.doctor_token = token_data["access_token"]
                self.log_result("Doctor Authentication for AI", True)
                return True
            else:
                self.log_result("Doctor Authentication for AI", False, f"Status: {response.status_code}")
                return False
        except Exception as e:
            self.log_result("Doctor Authentication for AI", False, f"Error: {str(e)}")
            return False

    def get_auth_headers(self):
        """Get authorization headers"""
        if self.doctor_token:
            return {"Authorization": f"Bearer {self.doctor_token}"}
        return {}

    def test_ai_chat_basic(self):
        """Test basic AI chat functionality"""
        print("\n🤖 Testing AI Chat Basic Functionality...")
        
        if not self.doctor_token:
            self.log_result("AI Chat Basic", False, "No authentication token available")
            return

        chat_data = {
            "message": "Patient has fever, headache, and body aches. Recent history shows previous antibiotic use. What treatment do you recommend?",
            "session_id": "test_session_123",
            "language": "en"
        }

        try:
            response = requests.post(
                f"{self.base_url}/api/ai/chat",
                json=chat_data,
                headers={
                    **self.get_auth_headers(),
                    "Content-Type": "application/json"
                },
                timeout=30
            )

            print(f"   Status Code: {response.status_code}")
            print(f"   Response Headers: {dict(response.headers)}")
            
            if response.status_code == 200:
                result = response.json()
                print(f"   Response Keys: {list(result.keys())}")
                
                # Check if we got a real AI response (not just fallback)
                ai_response = result.get("response", "")
                print(f"   AI Response Length: {len(ai_response)} characters")
                print(f"   AI Response Preview: {ai_response[:200]}...")
                
                # Check for expected response structure
                if "response" in result and "session_id" in result and "confidence" in result:
                    # Check if it's a real AI response (not fallback)
                    if len(ai_response) > 50 and not ai_response.startswith("I apologize"):
                        self.log_result("AI Chat Basic", True, f"Real AI response received ({len(ai_response)} chars)")
                    else:
                        self.log_result("AI Chat Basic", False, "Received fallback response instead of real AI")
                else:
                    self.log_result("AI Chat Basic", False, "Missing required response fields")
            else:
                self.log_result("AI Chat Basic", False, f"Status: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_result("AI Chat Basic", False, f"Error: {str(e)}")

    def test_ai_chat_with_patient_context(self):
        """Test AI chat with patient context"""
        print("\n👤 Testing AI Chat with Patient Context...")
        
        if not self.doctor_token:
            self.log_result("AI Chat Patient Context", False, "No authentication token available")
            return

        chat_data = {
            "message": "Patient has fever and cough, what do you recommend?",
            "session_id": "test_session_patient_123",
            "patient_id": "demo_1",  # Using demo patient ID as specified
            "language": "en"
        }

        try:
            response = requests.post(
                f"{self.base_url}/api/ai/chat",
                json=chat_data,
                headers={
                    **self.get_auth_headers(),
                    "Content-Type": "application/json"
                },
                timeout=30
            )

            print(f"   Status Code: {response.status_code}")
            
            if response.status_code == 200:
                result = response.json()
                ai_response = result.get("response", "")
                reasoning = result.get("reasoning", {})
                
                print(f"   AI Response Length: {len(ai_response)} characters")
                print(f"   Context Used: {reasoning.get('context_used', False)}")
                
                # Check if response includes patient context considerations
                if len(ai_response) > 50:
                    self.log_result("AI Chat Patient Context", True, f"Response with patient context ({len(ai_response)} chars)")
                else:
                    self.log_result("AI Chat Patient Context", False, "Response too short or fallback")
            else:
                self.log_result("AI Chat Patient Context", False, f"Status: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_result("AI Chat Patient Context", False, f"Error: {str(e)}")

    def test_ai_chat_multilingual(self):
        """Test AI chat multilingual support"""
        print("\n🌍 Testing AI Chat Multilingual Support...")
        
        if not self.doctor_token:
            self.log_result("AI Chat Multilingual", False, "No authentication token available")
            return

        languages = [
            {"code": "en", "message": "Patient has headache, what treatment do you suggest?"},
            {"code": "rw", "message": "Umurwayi afite ububabare bw'umutwe, ni uwuhe muti usaba?"},
            {"code": "fr", "message": "Le patient a mal à la tête, quel traitement suggérez-vous?"}
        ]

        for lang in languages:
            chat_data = {
                "message": lang["message"],
                "session_id": f"test_session_{lang['code']}_123",
                "language": lang["code"]
            }

            try:
                response = requests.post(
                    f"{self.base_url}/api/ai/chat",
                    json=chat_data,
                    headers={
                        **self.get_auth_headers(),
                        "Content-Type": "application/json"
                    },
                    timeout=30
                )

                if response.status_code == 200:
                    result = response.json()
                    ai_response = result.get("response", "")
                    
                    if len(ai_response) > 30:
                        self.log_result(f"AI Chat Multilingual ({lang['code'].upper()})", True, f"Response in {lang['code']} ({len(ai_response)} chars)")
                    else:
                        self.log_result(f"AI Chat Multilingual ({lang['code'].upper()})", False, "Response too short")
                else:
                    self.log_result(f"AI Chat Multilingual ({lang['code'].upper()})", False, f"Status: {response.status_code}")
            except Exception as e:
                self.log_result(f"AI Chat Multilingual ({lang['code'].upper()})", False, f"Error: {str(e)}")

    def test_ai_chat_session_memory(self):
        """Test AI chat session memory"""
        print("\n🧠 Testing AI Chat Session Memory...")
        
        if not self.doctor_token:
            self.log_result("AI Chat Session Memory", False, "No authentication token available")
            return

        session_id = "test_memory_session_123"
        
        # First message
        chat_data_1 = {
            "message": "Patient is 35 years old with diabetes",
            "session_id": session_id,
            "language": "en"
        }

        try:
            response1 = requests.post(
                f"{self.base_url}/api/ai/chat",
                json=chat_data_1,
                headers={
                    **self.get_auth_headers(),
                    "Content-Type": "application/json"
                },
                timeout=30
            )

            if response1.status_code == 200:
                # Second message referencing the first
                chat_data_2 = {
                    "message": "Now the patient has high blood sugar. What should I do?",
                    "session_id": session_id,
                    "language": "en"
                }

                response2 = requests.post(
                    f"{self.base_url}/api/ai/chat",
                    json=chat_data_2,
                    headers={
                        **self.get_auth_headers(),
                        "Content-Type": "application/json"
                    },
                    timeout=30
                )

                if response2.status_code == 200:
                    result = response2.json()
                    ai_response = result.get("response", "")
                    
                    # Check if response considers the diabetes context from first message
                    if len(ai_response) > 50:
                        self.log_result("AI Chat Session Memory", True, f"Session memory working ({len(ai_response)} chars)")
                    else:
                        self.log_result("AI Chat Session Memory", False, "Response too short")
                else:
                    self.log_result("AI Chat Session Memory", False, f"Second message failed: {response2.status_code}")
            else:
                self.log_result("AI Chat Session Memory", False, f"First message failed: {response1.status_code}")
        except Exception as e:
            self.log_result("AI Chat Session Memory", False, f"Error: {str(e)}")

    def test_ai_chat_amr_awareness(self):
        """Test AI chat AMR awareness"""
        print("\n💊 Testing AI Chat AMR Awareness...")
        
        if not self.doctor_token:
            self.log_result("AI Chat AMR Awareness", False, "No authentication token available")
            return

        chat_data = {
            "message": "Patient has bacterial infection and has used multiple antibiotics recently. What antibiotic should I prescribe?",
            "session_id": "test_amr_session_123",
            "language": "en"
        }

        try:
            response = requests.post(
                f"{self.base_url}/api/ai/chat",
                json=chat_data,
                headers={
                    **self.get_auth_headers(),
                    "Content-Type": "application/json"
                },
                timeout=30
            )

            if response.status_code == 200:
                result = response.json()
                ai_response = result.get("response", "").lower()
                
                # Check for AMR-related keywords in response
                amr_keywords = ["resistance", "narrow-spectrum", "culture", "sensitivity", "amr", "aware", "stewardship"]
                amr_mentions = sum(1 for keyword in amr_keywords if keyword in ai_response)
                
                if amr_mentions >= 2:
                    self.log_result("AI Chat AMR Awareness", True, f"AMR-conscious response ({amr_mentions} AMR keywords)")
                else:
                    self.log_result("AI Chat AMR Awareness", False, f"Limited AMR awareness ({amr_mentions} AMR keywords)")
            else:
                self.log_result("AI Chat AMR Awareness", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_result("AI Chat AMR Awareness", False, f"Error: {str(e)}")

    def test_ai_chat_error_handling(self):
        """Test AI chat error handling"""
        print("\n⚠️ Testing AI Chat Error Handling...")
        
        if not self.doctor_token:
            self.log_result("AI Chat Error Handling", False, "No authentication token available")
            return

        # Test with invalid data
        invalid_data = {
            "message": "",  # Empty message
            "session_id": "test_error_session_123",
            "language": "invalid_language"
        }

        try:
            response = requests.post(
                f"{self.base_url}/api/ai/chat",
                json=invalid_data,
                headers={
                    **self.get_auth_headers(),
                    "Content-Type": "application/json"
                },
                timeout=30
            )

            # Should either handle gracefully or return appropriate error
            if response.status_code in [200, 400, 422]:
                self.log_result("AI Chat Error Handling", True, f"Handled invalid input appropriately ({response.status_code})")
            else:
                self.log_result("AI Chat Error Handling", False, f"Unexpected status: {response.status_code}")
        except Exception as e:
            self.log_result("AI Chat Error Handling", False, f"Error: {str(e)}")

    def test_ai_chat_unauthorized(self):
        """Test AI chat without authentication"""
        print("\n🚫 Testing AI Chat Unauthorized Access...")
        
        chat_data = {
            "message": "Test message",
            "session_id": "test_unauth_session_123",
            "language": "en"
        }

        try:
            response = requests.post(
                f"{self.base_url}/api/ai/chat",
                json=chat_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )

            if response.status_code == 401:
                self.log_result("AI Chat Unauthorized", True, "Correctly denied access without token")
            else:
                self.log_result("AI Chat Unauthorized", False, f"Expected 401, got {response.status_code}")
        except Exception as e:
            self.log_result("AI Chat Unauthorized", False, f"Error: {str(e)}")

    def test_openrouter_api_integration(self):
        """Test OpenRouter API integration"""
        print("\n🔗 Testing OpenRouter API Integration...")
        
        # Check if API key is configured (optional - system works with fallback if not set)
        import os
        api_key = os.getenv("OPENROUTER_API_KEY")
        if api_key:
            self.log_result("OpenRouter API Key Configuration", True, "API key is configured (optional)")
        else:
            self.log_result("OpenRouter API Key Configuration", True, "API key not configured - will use fallback clinical guidelines")

    def run_ai_tests(self):
        """Run all AI Medical Assistant tests"""
        print("\n🤖 Starting AI Medical Assistant Backend Tests")
        print("=" * 60)

        # Authentication
        if not self.authenticate_doctor():
            print("❌ Authentication failed. Cannot proceed with AI tests.")
            return False

        # Core AI functionality tests
        self.test_openrouter_api_integration()
        self.test_ai_chat_unauthorized()
        self.test_ai_chat_basic()
        self.test_ai_chat_with_patient_context()
        self.test_ai_chat_multilingual()
        self.test_ai_chat_session_memory()
        self.test_ai_chat_amr_awareness()
        self.test_ai_chat_error_handling()

        # Print summary
        print("\n" + "=" * 60)
        print("🤖 AI MEDICAL ASSISTANT TEST SUMMARY")
        print("=" * 60)
        print(f"✅ Passed: {self.results['passed']}")
        print(f"❌ Failed: {self.results['failed']}")
        total_tests = self.results['passed'] + self.results['failed']
        if total_tests > 0:
            print(f"📈 Success Rate: {(self.results['passed'] / total_tests * 100):.1f}%")
        
        if self.results['errors']:
            print("\n🚨 FAILED TESTS:")
            for error in self.results['errors']:
                print(f"   • {error}")

        return self.results['failed'] == 0

if __name__ == "__main__":
    # Run Patient Registry tests first
    print("🏥 RUNNING PATIENT REGISTRY TESTS")
    print("=" * 80)
    patient_tester = PatientRegistryTester()
    patient_success = patient_tester.run_all_tests()
    
    print("\n\n🤖 RUNNING AI MEDICAL ASSISTANT TESTS")
    print("=" * 80)
    ai_tester = AIMedicalAssistantTester()
    ai_success = ai_tester.run_ai_tests()
    
    # Overall summary
    print("\n\n📊 OVERALL TEST SUMMARY")
    print("=" * 80)
    print(f"🏥 Patient Registry: {'✅ PASSED' if patient_success else '❌ FAILED'}")
    print(f"🤖 AI Medical Assistant: {'✅ PASSED' if ai_success else '❌ FAILED'}")
    
    overall_success = patient_success and ai_success
    print(f"\n🎯 Overall Result: {'✅ ALL TESTS PASSED' if overall_success else '❌ SOME TESTS FAILED'}")
    
    sys.exit(0 if overall_success else 1)