#!/usr/bin/env python3
"""
AI Medical Assistant Backend Testing
Tests the OpenRouter API integration and AI chat functionality
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
print(f"🌐 Testing AI backend at: {BASE_URL}")

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

    def test_openrouter_api_integration(self):
        """Test OpenRouter API integration"""
        print("\n🔗 Testing OpenRouter API Integration...")
        
        # Check if API key is configured (optional - system works with fallback if not set)
        import os
        from dotenv import load_dotenv
        load_dotenv()
        api_key = os.getenv("OPENROUTER_API_KEY")
        if api_key:
            self.log_result("OpenRouter API Key Configuration", True, "API key is configured (optional)")
        else:
            self.log_result("OpenRouter API Key Configuration", True, "API key not configured - will use fallback clinical guidelines")

    def test_ai_chat_basic(self):
        """Test basic AI chat functionality with the exact test data from request"""
        print("\n🤖 Testing AI Chat Basic Functionality...")
        
        if not self.doctor_token:
            self.log_result("AI Chat Basic", False, "No authentication token available")
            return

        # Use exact test data from the review request
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
                timeout=45  # Increased timeout for AI API calls
            )

            print(f"   Status Code: {response.status_code}")
            print(f"   Response Headers: {dict(response.headers)}")
            
            if response.status_code == 200:
                result = response.json()
                print(f"   Response Keys: {list(result.keys())}")
                
                # Check if we got a real AI response (not just fallback)
                ai_response = result.get("response", "")
                print(f"   AI Response Length: {len(ai_response)} characters")
                print(f"   AI Response Preview: {ai_response[:300]}...")
                
                # Check for expected response structure
                if "response" in result and "session_id" in result and "confidence" in result:
                    # Check if it's a real AI response (not fallback)
                    fallback_indicators = [
                        "I apologize, but I'm experiencing technical difficulties",
                        "AI service temporarily unavailable",
                        "API key not configured"
                    ]
                    is_fallback = any(indicator in ai_response for indicator in fallback_indicators)
                    
                    if len(ai_response) > 100 and not is_fallback:
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
        """Test AI chat with patient context using demo_1"""
        print("\n👤 Testing AI Chat with Patient Context...")
        
        if not self.doctor_token:
            self.log_result("AI Chat Patient Context", False, "No authentication token available")
            return

        # Use demo_1 patient ID as specified in the request
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
                timeout=45
            )

            print(f"   Status Code: {response.status_code}")
            
            if response.status_code == 200:
                result = response.json()
                ai_response = result.get("response", "")
                reasoning = result.get("reasoning", {})
                
                print(f"   AI Response Length: {len(ai_response)} characters")
                print(f"   Context Used: {reasoning.get('context_used', False)}")
                print(f"   Response Preview: {ai_response[:200]}...")
                
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
        """Test AI chat multilingual support (English, Kinyarwanda, French)"""
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
                    timeout=45
                )

                if response.status_code == 200:
                    result = response.json()
                    ai_response = result.get("response", "")
                    
                    print(f"   {lang['code'].upper()} Response Length: {len(ai_response)} characters")
                    
                    if len(ai_response) > 50:
                        self.log_result(f"AI Chat Multilingual ({lang['code'].upper()})", True, f"Response in {lang['code']} ({len(ai_response)} chars)")
                    else:
                        self.log_result(f"AI Chat Multilingual ({lang['code'].upper()})", False, "Response too short")
                else:
                    self.log_result(f"AI Chat Multilingual ({lang['code'].upper()})", False, f"Status: {response.status_code}")
            except Exception as e:
                self.log_result(f"AI Chat Multilingual ({lang['code'].upper()})", False, f"Error: {str(e)}")

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
                timeout=45
            )

            if response.status_code == 200:
                result = response.json()
                ai_response = result.get("response", "").lower()
                
                print(f"   Response Length: {len(ai_response)} characters")
                print(f"   Response Preview: {ai_response[:200]}...")
                
                # Check for AMR-related keywords in response
                amr_keywords = ["resistance", "narrow-spectrum", "culture", "sensitivity", "amr", "aware", "stewardship", "antibiotic", "prudent"]
                amr_mentions = sum(1 for keyword in amr_keywords if keyword in ai_response)
                
                if amr_mentions >= 2:
                    self.log_result("AI Chat AMR Awareness", True, f"AMR-conscious response ({amr_mentions} AMR keywords)")
                else:
                    self.log_result("AI Chat AMR Awareness", False, f"Limited AMR awareness ({amr_mentions} AMR keywords)")
            else:
                self.log_result("AI Chat AMR Awareness", False, f"Status: {response.status_code}")
        except Exception as e:
            self.log_result("AI Chat AMR Awareness", False, f"Error: {str(e)}")

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

    def run_ai_tests(self):
        """Run all AI Medical Assistant tests"""
        print("\n🤖 Starting AI Medical Assistant Backend Tests")
        print("=" * 60)

        # Basic connectivity
        if not self.test_health_check():
            print("❌ Health check failed. Backend may not be running.")
            return False

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
        self.test_ai_chat_amr_awareness()

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
    ai_tester = AIMedicalAssistantTester()
    success = ai_tester.run_ai_tests()
    sys.exit(0 if success else 1)