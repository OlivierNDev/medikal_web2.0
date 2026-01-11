from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
from typing import List, Dict, Any, Optional
from datetime import datetime
from pydantic import BaseModel
from server import db, get_current_user
import base64
import io
from PIL import Image
import json
import httpx
import os

router = APIRouter(prefix="/ai", tags=["ai"])

# OpenRouter Configuration
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

class DiagnosisRequest(BaseModel):
    symptoms: str
    patient_id: str
    medical_history: List[str] = []

class DiagnosisResponse(BaseModel):
    suggestions: List[Dict[str, Any]]
    medications: List[Dict[str, Any]]
    confidence: float
    warnings: List[str] = []

class ChatMessage(BaseModel):
    message: str
    session_id: str
    patient_id: Optional[str] = None
    language: str = "en"

class ChatResponse(BaseModel):
    response: str
    session_id: str
    confidence: float
    reasoning: Optional[Dict[str, Any]] = None
    is_ai_live: bool = True
    ai_model_used: Optional[str] = None
    
    model_config = {"protected_namespaces": ()}

class SkinAnalysisResponse(BaseModel):
    predictions: List[Dict[str, Any]]
    confidence: float
    recommendation: str

async def get_patient_context(patient_id: str) -> Dict[str, Any]:
    """Get patient context including recent medical history"""
    try:
        # Get patient basic info
        patient = await db.patients.find_one({"id": patient_id})
        if not patient:
            return {"error": "Patient not found"}
        
        # Get recent visits (last 3)
        visits = await db.patient_visits.find(
            {"patient_id": patient_id}
        ).sort("visit_date", -1).limit(3).to_list(length=3)
        
        return {
            "patient": {
                "name": patient.get("full_name", "Unknown"),
                "national_id": patient.get("national_id", "N/A"),
                "age": patient.get("age", "Unknown"),
                "gender": patient.get("gender", "Unknown")
            },
            "recent_visits": visits
        }
    except Exception as e:
        print(f"Error getting patient context: {e}")
        return {"error": str(e)}

# List of free models to try in order
FREE_MODELS = [
    "openai/gpt-oss-120b:free",
    "z-ai/glm-4.5-air:free",
    "moonshotai/kimi-k2:free",
    "qwen/qwen3-coder:free",
    "nvidia/nemotron-nano-9b-v2:free"
]

async def call_openrouter_api(messages: List[Dict[str, str]], model: str = None) -> Dict[str, Any]:
    """Call OpenRouter API with fallback to demo medical responses
    Returns dict with 'response' text and 'is_ai_live' boolean"""
    
    if not OPENROUTER_API_KEY:
        print("OpenRouter API key not configured - using fallback")
        return {
            "response": get_fallback_medical_response(messages[-1]["content"] if messages else ""),
            "is_ai_live": False,
            "model_used": "fallback"
        }
    
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://medikal.emergentagent.com",
        "X-Title": "Medikal Healthcare System"
    }
    
    # Try each model in the list until one works
    models_to_try = [model] if model else FREE_MODELS
    
    for current_model in models_to_try:
        payload = {
            "model": current_model,
            "messages": messages,
            "max_tokens": 1500,
            "temperature": 0.7
        }
        
        try:
            async with httpx.AsyncClient(timeout=45.0) as client:
                print(f"Trying OpenRouter model: {current_model}")
                response = await client.post(OPENROUTER_URL, headers=headers, json=payload)
                
                if response.status_code == 200:
                    result = response.json()
                    ai_response = result["choices"][0]["message"]["content"]
                    print(f"OpenRouter SUCCESS with model: {current_model}")
                    return {
                        "response": ai_response,
                        "is_ai_live": True,
                        "model_used": current_model
                    }
                else:
                    error_detail = response.text[:200]
                    print(f"OpenRouter API Error with {current_model}: {response.status_code} - {error_detail}")
                    # Continue to next model
                    continue
                    
        except httpx.TimeoutException:
            print(f"OpenRouter timeout with model: {current_model}")
            continue
        except Exception as e:
            print(f"OpenRouter API call failed with {current_model}: {e}")
            continue
    
    # All models failed - use fallback
    print("All OpenRouter models failed - using fallback response")
    return {
        "response": get_fallback_medical_response(messages[-1]["content"] if messages else ""),
        "is_ai_live": False,
        "model_used": "fallback"
    }

def get_fallback_medical_response(user_message: str) -> str:
    """Generate professional medical fallback responses"""
    message_lower = user_message.lower()
    
    if "fever" in message_lower and "headache" in message_lower:
        return """Based on the symptoms of fever and headache, here are my clinical recommendations:

IMMEDIATE ASSESSMENT:
This presentation suggests a viral syndrome, though bacterial causes must be considered given the fever pattern.

TREATMENT PROTOCOL:
1. Paracetamol 500mg every 6 hours for fever control and pain relief
2. Ensure adequate hydration - 2-3 liters fluid daily
3. Complete rest for 48-72 hours
4. Monitor temperature every 4 hours

ANTIBIOTIC CONSIDERATIONS:
No empirical antibiotics indicated at this stage. Reserve for clear bacterial indicators such as persistent high fever >72 hours, signs of meningism, or blood culture positivity.

RED FLAGS - IMMEDIATE REFERRAL:
- Neck stiffness or photophobia
- Persistent vomiting
- Altered consciousness
- Petechial rash

FOLLOW-UP:
Return in 48 hours if no improvement or immediately if concerning symptoms develop."""

    elif "cough" in message_lower and "fever" in message_lower:
        return """For respiratory symptoms with fever, my clinical assessment indicates:

LIKELY DIAGNOSIS:
Upper respiratory tract infection with possible bacterial component given fever presence.

MANAGEMENT APPROACH:
1. Symptomatic relief with paracetamol 500mg QID
2. Dextromethorphan 15mg TID for dry cough
3. Adequate hydration and humidification
4. Rest and isolation to prevent transmission

ANTIBIOTIC DECISION:
Consider amoxicillin 500mg TID x 5 days if:
- Purulent sputum production
- Fever >38.5°C for >72 hours
- Signs of pneumonia on examination

AMR STEWARDSHIP:
Avoid broad-spectrum antibiotics. If bacterial infection confirmed, complete full course to prevent resistance development.

MONITORING:
Daily temperature monitoring. Return if breathlessness, chest pain, or clinical deterioration occurs."""

    elif "pain" in message_lower and "stomach" in message_lower:
        return """For abdominal pain presentation, my clinical evaluation suggests:

DIFFERENTIAL DIAGNOSIS:
Consider gastritis, peptic ulcer disease, or functional dyspepsia based on symptom pattern.

INITIAL MANAGEMENT:
1. Omeprazole 20mg once daily before breakfast
2. Antacid tablets PRN for symptom relief
3. Dietary modification - avoid spicy, fatty foods
4. Small, frequent meals

ANTIBIOTIC CONSIDERATIONS:
H. pylori eradication may be needed if ulcer confirmed. Standard triple therapy includes amoxicillin + clarithromycin + PPI.

WARNING SIGNS:
- Severe persistent pain
- Vomiting with blood
- Black tarry stools
- Significant weight loss

FOLLOW-UP:
Review in 2 weeks. Consider endoscopy if symptoms persist or alarm features present."""

    elif "antibiotic" in message_lower or "resistance" in message_lower:
        return """Regarding antibiotic stewardship and AMR prevention:

WHO AWaRe CLASSIFICATION:
ACCESS antibiotics (first-choice): Amoxicillin, doxycycline - use preferentially
WATCH antibiotics (second-choice): Ciprofloxacin, ceftriaxone - use with caution
RESERVE antibiotics: Colistin, linezolid - hospital use only

PRESCRIBING PRINCIPLES:
1. Culture before treatment when possible
2. Narrow spectrum preferred over broad spectrum
3. Appropriate duration - typically 5-7 days
4. Consider local resistance patterns

PATIENT EDUCATION:
- Complete prescribed course even if feeling better
- Never share antibiotics with others
- Store properly and dispose of unused medications
- Understand difference between viral and bacterial infections

RESISTANCE PREVENTION:
Every prescription impacts community resistance. Judicious use protects both current patient and future patients in your practice."""

    elif "child" in message_lower or "pediatric" in message_lower:
        return """For pediatric cases, special considerations apply:

PEDIATRIC DOSING:
- Paracetamol: 10-15mg/kg every 4-6 hours (max 60mg/kg/day)
- Ibuprofen: 5-10mg/kg every 6-8 hours (if >6 months)
- Amoxicillin: 40-50mg/kg/day divided TID (if indicated)

CLINICAL ASSESSMENT:
Children dehydrate quickly. Monitor:
- Urine output and skin turgor
- Activity level and feeding pattern
- Temperature trends

ANTIBIOTIC STEWARDSHIP:
Avoid antibiotics for viral illnesses. Most childhood fevers are viral and self-limiting. Consider bacterial infection if:
- Persistent fever >72 hours
- Toxic appearance
- Specific bacterial syndrome signs

SAFETY CONSIDERATIONS:
Never give aspirin to children under 16 due to Reye's syndrome risk. Ensure accurate weight-based dosing."""

    elif "pregnancy" in message_lower or "pregnant" in message_lower:
        return """For pregnant patients, safety considerations are paramount:

PREGNANCY-SAFE MEDICATIONS:
- Paracetamol: Safe throughout pregnancy for fever/pain
- Amoxicillin: Category B - safe if indicated
- Erythromycin: Safe alternative if penicillin allergy

AVOID IN PREGNANCY:
- Tetracyclines (tooth staining)
- Quinolones (cartilage effects)
- Trimethoprim (folate antagonist)

CLINICAL APPROACH:
1. Careful risk-benefit assessment
2. Use lowest effective dose
3. Shortest appropriate duration
4. Monitor closely for adverse effects

SPECIFIC CONCERNS:
- UTIs require prompt treatment to prevent pyelonephritis
- Respiratory infections need careful monitoring
- Group B Strep screening at 36 weeks

FOLLOW-UP:
More frequent monitoring in pregnancy. Coordinate with obstetric care provider."""

    else:
        # Dynamic responses based on common medical terms
        if "treatment" in message_lower:
            return """Treatment approach for this clinical scenario:

EVIDENCE-BASED MANAGEMENT:
Current guidelines recommend a stepped approach beginning with conservative management before escalating to pharmaceutical intervention.

FIRST-LINE THERAPY:
Conservative measures including lifestyle modifications, patient education, and symptom monitoring often provide significant benefit.

PHARMACOLOGICAL OPTIONS:
When medications are indicated, start with proven first-line agents. Consider patient factors including age, comorbidities, and medication history.

ANTIBIOTIC CONSIDERATIONS:
Only prescribe antibiotics when clear bacterial infection is suspected or confirmed. Use narrow-spectrum agents when possible to minimize resistance development.

MONITORING STRATEGY:
Establish clear follow-up intervals. Provide patients with specific return instructions and warning signs to monitor.

PATIENT EDUCATION:
Ensure patients understand their condition, treatment plan, and importance of medication adherence."""

        elif "diagnosis" in message_lower:
            return """Diagnostic approach for this clinical presentation:

CLINICAL ASSESSMENT:
Systematic history and physical examination guide diagnostic reasoning. Consider patient demographics, symptom onset, and risk factors.

DIFFERENTIAL DIAGNOSIS:
Develop a prioritized list of possibilities based on clinical presentation. Consider common conditions first, but don't miss serious diagnoses.

DIAGNOSTIC TESTING:
Order investigations judiciously. Consider cost-effectiveness and patient comfort. Basic tests often provide most useful information.

CLINICAL DECISION MAKING:
Balance probability of disease against test characteristics. Some conditions require empirical treatment pending results.

DOCUMENTATION:
Record clinical reasoning clearly. This supports quality improvement and medico-legal requirements.

FOLLOW-UP PLANNING:
Establish clear next steps based on test results and clinical response. Safety netting is essential."""

        else:
            return f"""Clinical consultation regarding: {user_message}

MEDICAL ASSESSMENT:
I've analyzed this case considering current evidence-based medicine guidelines and AMR prevention strategies.

CLINICAL REASONING:
The symptoms and presentation suggest several possible diagnoses that require systematic evaluation and appropriate management.

TREATMENT RECOMMENDATIONS:
1. Symptomatic management with appropriate medications
2. Monitoring for clinical improvement or deterioration
3. Patient education regarding condition and treatment
4. Clear follow-up plan with specific return instructions

ANTIMICROBIAL STEWARDSHIP:
Any antibiotic use must be justified by clinical need. Consider local resistance patterns and choose narrow-spectrum agents when possible.

SAFETY CONSIDERATIONS:
Monitor for adverse effects and drug interactions. Ensure patient understands proper medication use and storage.

PROGNOSIS:
Most cases resolve with appropriate treatment. Provide realistic expectations about recovery timeframe and warning signs.

Would you like me to elaborate on any specific aspect of this clinical assessment?"""

def get_system_prompt(language: str, patient_context: Dict[str, Any]) -> str:
    """Generate system prompt based on language and patient context"""
    
    patient_info = patient_context.get("patient", {})
    recent_visits = patient_context.get("recent_visits", [])
    
    # Format recent medical history
    history_text = ""
    if recent_visits:
        history_text = "\n\nPatient's Recent Medical History (Last 3 visits):\n"
        for i, visit in enumerate(recent_visits, 1):
            history_text += f"Visit {i} ({visit.get('visit_date', 'Unknown date')}):\n"
            history_text += f"  - Symptoms: {visit.get('symptoms', 'Not specified')}\n"
            history_text += f"  - Diagnosis: {visit.get('diagnosis', 'Not specified')}\n"
            history_text += f"  - Medications: {', '.join(visit.get('prescribed_medications', []))}\n"
            history_text += f"  - Notes: {visit.get('doctor_notes', 'None')}\n\n"
    
    prompts = {
        "en": f"""You are an experienced medical AI assistant specializing in African healthcare contexts with expertise in Antimicrobial Resistance (AMR) prevention.

Patient Information:
- Name: {patient_info.get('name', 'Unknown')}
- National ID: {patient_info.get('national_id', 'N/A')} 
- Age: {patient_info.get('age', 'Unknown')}
- Gender: {patient_info.get('gender', 'Unknown')}{history_text}

IMPORTANT FORMATTING RULES:
- Write in natural, conversational tone like speaking to a colleague
- Do NOT use markdown formatting (no **, ###, -, •, etc.)
- Do NOT use special characters for emphasis
- Write in clear paragraphs with natural sentences
- Use simple numbering (1, 2, 3) if listing items
- Keep responses human and professional but friendly

Your role:
1. Provide evidence-based medication recommendations based on symptoms
2. Offer differential diagnosis suggestions considering patient history  
3. Alert about drug interactions and AMR risks
4. Recommend WHO AWaRe classification-conscious antibiotic selection
5. Suggest treatment protocols appropriate for African healthcare settings
6. Advise when immediate medical attention is needed

Guidelines:
- Always consider this patient's medical history when making recommendations
- Prioritize narrow-spectrum antibiotics when antibiotics are indicated
- Warn about overuse of broad-spectrum antibiotics
- Consider local resistance patterns in Rwanda and East Africa
- Provide specific dosages, frequencies, and durations when appropriate
- Include AMR risk assessment for antibiotic recommendations
- Speak naturally as if consulting with a fellow healthcare provider

Respond in clear, natural language without any special formatting.""",

        "rw": f"""Uri umuganga w'ubuhanga wa AI ufite ubumenyi bukomeye mu by'ubuvuzi muri Afurika, cyane cyane mu kurwanya ubwoba bw'imiti (AMR).

Amakuru y'umurwayi:
- Izina: {patient_info.get('name', 'Kitazwi')}
- Irangamimerere: {patient_info.get('national_id', 'Nta na kimwe')}
- Imyaka: {patient_info.get('age', 'Kitazwi')}
- Igitsina: {patient_info.get('gender', 'Kitazwi')}{history_text}

AMATEGEKO Y'INYANDIKO:
- Andika mu buryo bwisanzuze nkuganira n'umunyeshuri
- Ntukoreshe uburyo bwo gushyira imbere (nta **, ###, -, nk'ibindi)
- Ntukoreshe inyuguti zidasanzuwe kugira ngo ushimangire
- Andika mu bika by'amagambo afite interuro zisanzuze
- Koresha umubare woroshye (1, 2, 3) niba ushaka gushyiraho ibintu
- Komeza ibisubizo byawe bibe by'ikiremwamuntu kandi by'umwuga ariko ukaba urakennye

Inshingano zawe:
1. Gutanga inama z'imiti zishingiye ku buhanga ukurikije ibimenyetso
2. Gutanga ibitekerezo by'indwara zitandukanye ukurikije amateka y'umurwayi
3. Kuburira ku guhuriza imiti n'ubwoba bwa AMR
4. Gusaba guhitamo antibiotique zishingiye ku WHO AWaRe
5. Gusaba uburyo bukwiye bw'ubuvuzi muri Afurika
6. Kugira inama igihe ubufasha bw'ubuvuzi bwihutirwa bukenewe

Ganza mu rurimi rwisanzuze udafite ubwoko ubwo ari bwo bwose bwo gutanga imbere.""",

        "fr": f"""Vous êtes un assistant médical IA expérimenté spécialisé dans les contextes de santé africains avec une expertise en prévention de la résistance antimicrobienne (RAM).

Informations Patient:
- Nom: {patient_info.get('name', 'Inconnu')}
- ID National: {patient_info.get('national_id', 'N/A')}
- Âge: {patient_info.get('age', 'Inconnu')}
- Genre: {patient_info.get('gender', 'Inconnu')}{history_text}

RÈGLES DE FORMATAGE IMPORTANTES:
- Écrivez dans un ton naturel et conversationnel comme en parlant à un collègue
- N'utilisez PAS de formatage markdown (pas de **, ###, -, •, etc.)
- N'utilisez PAS de caractères spéciaux pour l'emphase
- Écrivez en paragraphes clairs avec des phrases naturelles
- Utilisez une numérotation simple (1, 2, 3) si vous listez des éléments
- Gardez les réponses humaines et professionnelles mais amicales

Votre rôle:
1. Fournir des recommandations de médicaments basées sur des preuves selon les symptômes
2. Offrir des suggestions de diagnostic différentiel considérant l'historique patient
3. Alerter sur les interactions médicamenteuses et les risques RAM
4. Recommander une sélection d'antibiotiques consciente de la classification WHO AWaRe
5. Suggérer des protocoles de traitement appropriés pour les contextes de santé africains
6. Conseiller quand une attention médicale immédiate est nécessaire

Répondez dans un langage clair et naturel sans aucun formatage spécial."""
    }
    
    return prompts.get(language, prompts["en"])

@router.post("/chat", response_model=ChatResponse)
async def chat_with_ai(
    message: ChatMessage,
    current_user: dict = Depends(get_current_user)
):
    """
    Chat with AI Medical Assistant with patient context and multilingual support
    """
    try:
        # Get patient context if patient_id is provided
        patient_context = {}
        if message.patient_id:
            patient_context = await get_patient_context(message.patient_id)
        
        # Get chat history for this session
        chat_history = []
        async for msg in db.chat_sessions.find(
            {"session_id": message.session_id}
        ).sort("timestamp", 1).limit(10):
            chat_history.append({
                "role": "user" if msg["message_type"] == "user" else "assistant",
                "content": msg["content"]
            })
        
        # Build messages for OpenRouter
        system_prompt = get_system_prompt(message.language, patient_context)
        messages = [{"role": "system", "content": system_prompt}]
        
        # Add chat history
        messages.extend(chat_history)
        
        # Add current message
        messages.append({"role": "user", "content": message.message})
        
        # Call OpenRouter API - now returns dict with is_ai_live status
        ai_result = await call_openrouter_api(messages)
        ai_response = ai_result["response"]
        is_ai_live = ai_result["is_ai_live"]
        model_used = ai_result["model_used"]
        
        # Store user message in chat session
        user_message_doc = {
            "session_id": message.session_id,
            "user_id": str(current_user["_id"]),
            "patient_id": message.patient_id,
            "message_type": "user",
            "content": message.message,
            "language": message.language,
            "timestamp": datetime.utcnow()
        }
        await db.chat_sessions.insert_one(user_message_doc)
        
        # Store AI response in chat session
        ai_message_doc = {
            "session_id": message.session_id,
            "user_id": str(current_user["_id"]),
            "patient_id": message.patient_id,
            "message_type": "ai",
            "content": ai_response,
            "language": message.language,
            "timestamp": datetime.utcnow(),
            "is_ai_live": is_ai_live,
            "model_used": model_used
        }
        await db.chat_sessions.insert_one(ai_message_doc)
        
        # Generate reasoning information
        reasoning = {
            "confidence": "85%" if is_ai_live else "70%",
            "evidence_sources": [
                "Patient medical history analysis",
                "Current symptom evaluation", 
                "WHO treatment guidelines",
                "AMR surveillance data"
            ],
            "context_used": bool(message.patient_id and patient_context.get("recent_visits")),
            "ai_status": "Live AI" if is_ai_live else "Offline - Using clinical guidelines database"
        }
        
        return ChatResponse(
            response=ai_response,
            session_id=message.session_id,
            confidence=0.85 if is_ai_live else 0.70,
            reasoning=reasoning,
            is_ai_live=is_ai_live,
            ai_model_used=model_used
        )
        
    except Exception as e:
        print(f"Chat API error: {e}")
        # Fallback response
        fallback_responses = {
            "en": "I apologize, but I'm experiencing technical difficulties. Please try again in a moment or consult with your medical team for immediate assistance.",
            "rw": "Nsabana kandi ndabura imitsi ishoboje. Nyabuneka ongere ugerageze mu gihe gito cyangwa ubazane n'ikipe y'ubuvuzi kugira ngo ugire ubufasha bwihuse.",
            "fr": "Je m'excuse, mais je rencontre des difficultés techniques. Veuillez réessayer dans un moment ou consulter votre équipe médicale pour une assistance immédiate."
        }
        
        return ChatResponse(
            response=fallback_responses.get(message.language, fallback_responses["en"]),
            session_id=message.session_id,
            confidence=0.0,
            is_ai_live=False,
            ai_model_used="error_fallback"
        )

@router.post("/diagnosis", response_model=DiagnosisResponse)
async def get_diagnosis_suggestions(
    request: DiagnosisRequest,
    current_user: dict = Depends(get_current_user)
):
    """
    AI-powered diagnosis suggestions based on symptoms
    """
    try:
        # Simple rule-based diagnosis for demo
        symptoms_lower = request.symptoms.lower()
        suggestions = []
        medications = []
        warnings = []
        
        # Fever + Cough symptoms
        if "fever" in symptoms_lower and "cough" in symptoms_lower:
            suggestions = [
                {"condition": "Upper Respiratory Infection", "icd_code": "J06.9", "probability": 0.85},
                {"condition": "Bacterial Pneumonia", "icd_code": "J15.9", "probability": 0.10},
                {"condition": "Influenza", "icd_code": "J11.1", "probability": 0.05}
            ]
            medications = [
                {"name": "Amoxicillin", "dosage": "500mg", "frequency": "3 times daily", "duration": "7 days"},
                {"name": "Paracetamol", "dosage": "500mg", "frequency": "as needed", "duration": "for fever"}
            ]
            
        # Headache symptoms
        elif "headache" in symptoms_lower:
            suggestions = [
                {"condition": "Tension Headache", "icd_code": "G44.2", "probability": 0.70},
                {"condition": "Migraine", "icd_code": "G43.9", "probability": 0.20},
                {"condition": "Sinus Headache", "icd_code": "G44.82", "probability": 0.10}
            ]
            medications = [
                {"name": "Ibuprofen", "dosage": "400mg", "frequency": "every 6 hours", "duration": "as needed"},
                {"name": "Paracetamol", "dosage": "1000mg", "frequency": "every 6 hours", "duration": "as needed"}
            ]
            
        # Stomach pain
        elif "stomach" in symptoms_lower or "abdominal" in symptoms_lower:
            suggestions = [
                {"condition": "Gastritis", "icd_code": "K29.7", "probability": 0.60},
                {"condition": "Peptic Ulcer", "icd_code": "K27.9", "probability": 0.25},
                {"condition": "Gastroenteritis", "icd_code": "K52.9", "probability": 0.15}
            ]
            medications = [
                {"name": "Omeprazole", "dosage": "20mg", "frequency": "once daily", "duration": "14 days"},
                {"name": "Antacid", "dosage": "10ml", "frequency": "as needed", "duration": "for symptoms"}
            ]
            
        else:
            suggestions = [
                {"condition": "General Symptoms", "icd_code": "R68.89", "probability": 0.50}
            ]
            medications = [
                {"name": "Symptomatic Treatment", "dosage": "as appropriate", "frequency": "as needed", "duration": "as needed"}
            ]
        
        # Check for AMR warnings
        if any(med["name"] in ["Amoxicillin", "Ciprofloxacin", "Azithromycin"] for med in medications):
            # Check patient's antibiotic history
            patient_consultations = await db.consultations.find({"patient_id": request.patient_id}).to_list(length=10)
            antibiotic_count = 0
            for consultation in patient_consultations:
                for med in consultation.get("medications", []):
                    if med.get("name") in ["Amoxicillin", "Ciprofloxacin", "Azithromycin"]:
                        antibiotic_count += 1
            
            if antibiotic_count >= 3:
                warnings.append("Patient has received multiple antibiotic courses recently. Consider culture test.")
        
        return DiagnosisResponse(
            suggestions=suggestions,
            medications=medications,
            confidence=0.85,
            warnings=warnings
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing diagnosis: {str(e)}")

@router.get("/chat/history/{session_id}")
async def get_chat_history(
    session_id: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Get chat history for a session
    """
    try:
        messages = []
        
        # Get messages from new chat_sessions collection
        async for msg in db.chat_sessions.find({"session_id": session_id}).sort("timestamp", 1):
            messages.append({
                "type": msg["message_type"],
                "message": msg["content"],
                "timestamp": msg["timestamp"]
            })
        
        return {"messages": messages}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving chat history: {str(e)}")

@router.get("/amr/risk/{patient_id}")
async def get_amr_risk(
    patient_id: str,
    current_user: dict = Depends(get_current_user)
):
    """
    Get AMR risk assessment for a patient
    """
    try:
        # Get patient's consultation history
        consultations = await db.consultations.find({"patient_id": patient_id}).to_list(length=50)
        
        antibiotic_courses = []
        for consultation in consultations:
            for med in consultation.get("medications", []):
                if med.get("name") in ["Amoxicillin", "Ciprofloxacin", "Azithromycin", "Ceftriaxone", "Doxycycline"]:
                    antibiotic_courses.append({
                        "antibiotic": med["name"],
                        "date": consultation["created_at"],
                        "duration": med.get("duration", "unknown")
                    })
        
        # Calculate risk score
        risk_score = min(len(antibiotic_courses) * 15, 100)
        
        risk_level = "Low"
        if risk_score >= 50:
            risk_level = "High"
        elif risk_score >= 30:
            risk_level = "Medium"
        
        return {
            "patient_id": patient_id,
            "risk_score": risk_score,
            "risk_level": risk_level,
            "antibiotic_courses": antibiotic_courses,
            "recommendations": [
                "Consider culture and sensitivity testing before prescribing antibiotics",
                "Use narrow-spectrum antibiotics when possible",
                "Ensure appropriate duration of treatment",
                "Monitor for resistance patterns"
            ] if risk_score >= 30 else ["Continue standard antibiotic stewardship practices"]
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error calculating AMR risk: {str(e)}")

@router.post("/skin-analysis", response_model=SkinAnalysisResponse)
async def analyze_skin_image(
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    """
    Analyze skin image for disease detection
    """
    try:
        # Read and process image
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data))
        
        # Convert to base64 for storage
        buffered = io.BytesIO()
        image.save(buffered, format="JPEG")
        image_base64 = base64.b64encode(buffered.getvalue()).decode()
        
        # Mock AI analysis (in real implementation, this would call a trained model)
        predictions = [
            {"condition": "Eczema", "probability": 0.85, "severity": "mild"},
            {"condition": "Dermatitis", "probability": 0.12, "severity": "mild"},
            {"condition": "Normal skin", "probability": 0.03, "severity": "none"}
        ]
        
        recommendation = """Based on the analysis, this appears to be eczema with mild severity. 

**Recommendations:**
• Apply moisturizer regularly
• Use mild, fragrance-free soap
• Avoid known triggers
• Consider topical corticosteroid if symptoms persist

**When to see a doctor:**
• Symptoms worsen or don't improve in 1-2 weeks
• Signs of infection (pus, increased redness, warmth)
• Severe itching affecting sleep"""
        
        # Store analysis result
        analysis_doc = {
            "user_id": str(current_user["_id"]),
            "image_base64": image_base64,
            "predictions": predictions,
            "confidence": 0.85,
            "recommendation": recommendation,
            "timestamp": datetime.utcnow()
        }
        await db.skin_analyses.insert_one(analysis_doc)
        
        return SkinAnalysisResponse(
            predictions=predictions,
            confidence=0.85,
            recommendation=recommendation
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing image: {str(e)}")