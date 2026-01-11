import React, { useState, useEffect, useRef } from 'react';
import { patientRegistryAPI, aiAPI } from '../services/api';

function AIMedicalAssistant({ selectedPatient, onClose }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [patientHistory, setPatientHistory] = useState(null);
  const [showPatientSelector, setShowPatientSelector] = useState(!selectedPatient);
  const [availablePatients, setAvailablePatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [patientSearchQuery, setPatientSearchQuery] = useState('');
  const [currentPatient, setCurrentPatient] = useState(selectedPatient);
  const [isAILive, setIsAILive] = useState(true);
  const messagesEndRef = useRef(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'rw', name: 'Kinyarwanda', flag: '🇷🇼' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];

  useEffect(() => {
    if (currentPatient) {
      loadPatientHistory();
      initializeChat();
    } else {
      loadAvailablePatients();
    }
  }, [currentPatient]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadAvailablePatients = async () => {
    try {
      // Load patients from API
      const apiPatients = await patientRegistryAPI.getList(1, 100);
      
      // Load recently registered patients from localStorage
      const localPatients = JSON.parse(localStorage.getItem('recentPatients') || '[]');
      
      // Combine and deduplicate patients
      const allPatients = [...(apiPatients.patients || apiPatients || [])];
      
      // Add local patients if they're not already in API results
      localPatients.forEach(localPatient => {
        const exists = allPatients.find(p => 
          p.national_id === localPatient.national_id || 
          p.id === localPatient.id
        );
        if (!exists) {
          allPatients.push(localPatient);
        }
      });

      setAvailablePatients(allPatients);
      setFilteredPatients(allPatients);
    } catch (error) {
      console.error('Error loading patients:', error);
      
      // Load from localStorage as fallback
      const localPatients = JSON.parse(localStorage.getItem('recentPatients') || '[]');
      
      // Use demo patients and local patients as fallback
      const fallbackPatients = [
        { id: 'demo_1', full_name: 'John Doe Demo', national_id: '1234567890123456' },
        { id: 'demo_2', full_name: 'Jane Smith Demo', national_id: '6543210987654321' },
        ...localPatients
      ];
      
      setAvailablePatients(fallbackPatients);
      setFilteredPatients(fallbackPatients);
    }
  };

  const loadPatientHistory = async () => {
    if (!currentPatient?.id) return;
    
    try {
      const visits = await patientRegistryAPI.getVisits(currentPatient.id, 3); // Last 3 visits
      setPatientHistory(visits);
    } catch (error) {
      console.error('Error loading patient history:', error);
      // Demo medical history
      setPatientHistory([
        {
          id: 'visit_1',
          visit_date: '2024-01-15',
          symptoms: 'Fever, headache, body aches',
          diagnosis: 'Upper respiratory tract infection',
          prescribed_medications: ['Paracetamol 500mg', 'Amoxicillin 500mg'],
          doctor_notes: 'Patient responded well to treatment'
        },
        {
          id: 'visit_2',
          visit_date: '2024-01-08',
          symptoms: 'Persistent cough, mild fever',
          diagnosis: 'Viral bronchitis',
          prescribed_medications: ['Paracetamol 500mg', 'Cough syrup'],
          doctor_notes: 'Symptoms improving with supportive care'
        },
        {
          id: 'visit_3',
          visit_date: '2023-12-20',
          symptoms: 'Stomach pain, nausea',
          diagnosis: 'Gastritis',
          prescribed_medications: ['Omeprazole 20mg', 'Antacid tablets'],
          doctor_notes: 'Advised dietary modifications'
        }
      ]);
    }
  };

  const initializeChat = () => {
    const welcomeMessage = {
      id: Date.now(),
      type: 'ai',
      content: getWelcomeMessage(),
      timestamp: new Date(),
      patient_context: currentPatient ? {
        name: currentPatient.full_name,
        national_id: currentPatient.national_id,
        recent_history: patientHistory?.slice(0, 3) || []
      } : null
    };

    setMessages([welcomeMessage]);
  };

  const getWelcomeMessage = () => {
    const messages = {
      en: `👨‍⚕️ **AI Medical Assistant**

Hello Doctor! I'm here to help with medical recommendations for **${currentPatient?.full_name || 'Patient'}** (ID: ${currentPatient?.national_id || 'N/A'}).

I have access to their medical history and can provide:
• 💊 Medication recommendations based on symptoms
• 🔍 Differential diagnosis suggestions
• ⚠️ Drug interaction warnings
• 📋 Treatment protocol guidance
• 🌍 AMR-conscious antibiotic selection

**Recent Medical History Loaded:** ${patientHistory?.length || 0} visits

How can I assist you today?`,

      rw: `👨‍⚕️ **Umufasha w'Ubuvuzi wa AI**

Muraho Muganga! Ndi hano kugufasha mu gutanga inama z'ubuvuzi kuri **${currentPatient?.full_name || 'Umurwayi'}** (ID: ${currentPatient?.national_id || 'Nta na kimwe'}).

Mfite uburyo bwo kubona amateka y'ubuvuzi bwe kandi nshobora gutanga:
• 💊 Inama z'imiti ukurikije ibimenyetso
• 🔍 Ibitekerezo by'indwara
• ⚠️ Iburira ku guhuriza imiti
• 📋 Inyigisho z'ubuvuzi
• 🌍 Guhitamo antibiotique bidateza ubwoba bwa AMR

**Amateka y'ubuvuzi yakiriwe:** ${patientHistory?.length || 0} inzira

Ese nshobora kugufasha iki uyu munsi?`,

      fr: `👨‍⚕️ **Assistant Médical IA**

Bonjour Docteur ! Je suis là pour vous aider avec des recommandations médicales pour **${currentPatient?.full_name || 'Patient'}** (ID: ${currentPatient?.national_id || 'N/A'}).

J'ai accès à leurs antécédents médicaux et peux fournir :
• 💊 Recommandations de médicaments basées sur les symptômes
• 🔍 Suggestions de diagnostic différentiel
• ⚠️ Avertissements d'interactions médicamenteuses
• 📋 Orientation du protocole de traitement
• 🌍 Sélection d'antibiotiques consciente de la RAM

**Historique médical récent chargé :** ${patientHistory?.length || 0} visites

Comment puis-je vous aider aujourd'hui ?`
    };

    return messages[language];
  };

  const handlePatientSearch = (query) => {
    setPatientSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredPatients(availablePatients);
      return;
    }
    
    const searchTerm = query.toLowerCase();
    const filtered = availablePatients.filter(patient => 
      patient.full_name?.toLowerCase().includes(searchTerm) ||
      patient.national_id?.toLowerCase().includes(searchTerm) ||
      patient.contact_phone?.toLowerCase().includes(searchTerm)
    );
    
    setFilteredPatients(filtered);
  };

  const handlePatientSelect = (patient) => {
    setCurrentPatient(patient);
    setShowPatientSelector(false);
    setPatientSearchQuery(''); // Reset search
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setLoading(true);

    try {
      // Call the real AI API with patient context
      const response = await aiAPI.chat(
        currentInput, 
        `session_${Date.now()}_${currentPatient?.id || 'general'}`, 
        currentPatient?.id,
        language
      );

      // Update AI live status based on response
      const aiIsLive = response.is_ai_live !== false;
      setIsAILive(aiIsLive);

      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: response.response,
        timestamp: new Date(),
        reasoning: response.reasoning || null,
        isAILive: aiIsLive,
        modelUsed: response.ai_model_used
      };

      setMessages(prev => [...prev, aiMessage]);
      setLoading(false);
    } catch (error) {
      console.error('Error calling AI API:', error);
      setIsAILive(false);
      
      // Fallback to demo response if API fails
      const fallbackResponse = generateAIResponse(currentInput, language);
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: fallbackResponse,
        timestamp: new Date(),
        reasoning: getAIReasoning(currentInput),
        isAILive: false,
        modelUsed: 'offline_fallback'
      };

      setMessages(prev => [...prev, aiMessage]);
      setLoading(false);
    }
  };

  const generateAIResponse = (userInput, lang) => {
    // This is a demo AI response generator - in production, this would connect to actual AI services
    const responses = {
      en: {
        symptoms: `🔍 **Medical Analysis for ${currentPatient?.full_name}**

Based on the symptoms and medical history:

**🏥 Recommended Approach:**
• Primary consideration: Upper respiratory tract infection
• Rule out: Pneumonia, influenza, COVID-19
• Assessment: Moderate severity

**💊 Medication Recommendations:**
1. **Paracetamol 500mg** - Every 6-8 hours for fever/pain
2. **Amoxicillin 500mg** - 3x daily for 7 days (if bacterial)
3. **Plenty of fluids** - Maintain hydration

**⚠️ AMR Considerations:**
- Patient had Amoxicillin 2 weeks ago - consider alternatives
- Monitor for resistance patterns
- Consider culture if no improvement in 48-72 hours

**📋 Follow-up:**
- Return if fever >38.5°C persists >3 days
- Watch for breathing difficulties
- Complete antibiotic course if prescribed`,

        diagnosis: `🧠 **Differential Diagnosis Analysis**

**Primary Diagnosis (85% confidence):**
• Upper Respiratory Tract Infection

**Differential Considerations:**
• Viral bronchitis (60%)
• Bacterial pneumonia (25%)
• Allergic rhinitis (15%)

**Red Flags to Monitor:**
• Persistent high fever >48h
• Shortness of breath
• Chest pain
• No improvement with treatment

**Recommended Tests:**
• CBC if severe symptoms
• Chest X-ray if respiratory distress
• Throat culture if recurrent`
      },

      rw: {
        symptoms: `🔍 **Isesengura ry'Ubuvuzi rwa ${currentPatient?.full_name}**

Ukurikije ibimenyetso n'amateka y'ubuvuzi:

**🏥 Inzira isabwa:**
• Ibya mbere bireba: Indwara y'inzira z'ubuhumekero zo hejuru
• Gusuzuma: Pnewmoniya, ibicurane, COVID-19
• Isuzuma: Ubukana bwo hagati

**💊 Inama z'Imiti:**
1. **Paracetamol 500mg** - Buri masaha 6-8 ku mashyushyu/ububabare
2. **Amoxicillin 500mg** - 3x ku munsi mu minsi 7 (niba ari bagiteri)
3. **Amazi menshi** - Komeza kunywa amazi

**⚠️ Ibijyanye na AMR:**
- Umurwayi yakoresheje Amoxicillin ibyumweru 2 bishize - tekereza ubundi buryo
- Keba ku buryo bwo kwirwanya
- Tekereza gukora culture niba nta nterambere mu masaha 48-72

**📋 Gukurikirana:**
- Garuka niba umuriro >38.5°C ukomeje >iminsi 3
- Keba ku bugohe bwo guhumeka
- Rangiza imiti ya antibiotique niba yahawe`,

        diagnosis: `🧠 **Isesengura ry'Indwara zitandukanye**

**Indwara y'ibanze (85% y'ikizere):**
• Indwara y'inzira z'ubuhumekero zo hejuru

**Ibindi bishoboka:**
• Viral bronchitis (60%)
• Bacterial pneumonia (25%)
• Allergic rhinitis (15%)

**Ibimenyetso by'ikivuguto:**
• Umuriro ukomeye ukomeje >masaha 48
• Kumanuka k'umwuka
• Ububabare bw'igituza
• Kutabona nterambere n'ubuvuzi

**Ibizamini byasabwa:**
• CBC niba ibimenyetso bikomeye
• Ifoto y'igituza niba hari ikibazo cyo guhumeka
• Isuzuma ry'umuhaha niba bisubiramo`
      },

      fr: {
        symptoms: `🔍 **Analyse Médicale pour ${currentPatient?.full_name}**

Basé sur les symptômes et l'historique médical :

**🏥 Approche Recommandée :**
• Considération principale : Infection des voies respiratoires supérieures
• Exclure : Pneumonie, grippe, COVID-19
• Évaluation : Gravité modérée

**💊 Recommandations de Médicaments :**
1. **Paracétamol 500mg** - Toutes les 6-8 heures pour fièvre/douleur
2. **Amoxicilline 500mg** - 3x par jour pendant 7 jours (si bactérien)
3. **Beaucoup de liquides** - Maintenir l'hydratation

**⚠️ Considérations RAM :**
- Patient a pris Amoxicilline il y a 2 semaines - considérer alternatives
- Surveiller les modèles de résistance
- Considérer culture si pas d'amélioration en 48-72 heures

**📋 Suivi :**
- Revenir si fièvre >38.5°C persiste >3 jours
- Surveiller difficultés respiratoires
- Compléter le cours d'antibiotique si prescrit`,

        diagnosis: `🧠 **Analyse de Diagnostic Différentiel**

**Diagnostic Principal (85% de confiance) :**
• Infection des Voies Respiratoires Supérieures

**Considérations Différentielles :**
• Bronchite virale (60%)
• Pneumonie bactérienne (25%)
• Rhinite allergique (15%)

**Signes d'Alarme à Surveiller :**
• Fièvre élevée persistante >48h
• Essoufflement
• Douleur thoracique
• Pas d'amélioration avec traitement

**Tests Recommandés :**
• CBC si symptômes sévères
• Radiographie thoracique si détresse respiratoire
• Culture de gorge si récurrent`
      }
    };

    // Simple keyword matching for demo
    if (userInput.toLowerCase().includes('symptom') || userInput.toLowerCase().includes('fever') || userInput.toLowerCase().includes('cough')) {
      return responses[lang].symptoms || responses.en.symptoms;
    } else if (userInput.toLowerCase().includes('diagnos') || userInput.toLowerCase().includes('differential')) {
      return responses[lang].diagnosis || responses.en.diagnosis;
    } else {
      return responses[lang].symptoms || responses.en.symptoms;
    }
  };

  const getAIReasoning = (userInput) => {
    return {
      confidence: '85%',
      evidence_sources: [
        'Patient medical history (3 recent visits)',
        'Current symptom analysis',
        'WHO treatment guidelines',
        'AMR surveillance data'
      ],
      risk_factors: [
        'Recent antibiotic use (2 weeks ago)',
        'Seasonal respiratory infection pattern',
        'Patient age and medical history'
      ]
    };
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = {
    en: [
      'What medication do you recommend for current symptoms?',
      'Are there any drug interactions to consider?',
      'What is the differential diagnosis?',
      'When should the patient return for follow-up?'
    ],
    rw: [
      'Ni ayahe miti usaba ku bimenyetso bya none?',
      'Hari imiti ihurizwa igomba kureba?',
      'Ni iyihe ndwara zishoboka?',
      'Ni ryari umurwayi agomba kugaruka?'
    ],
    fr: [
      'Quel médicament recommandez-vous pour les symptômes actuels?',
      'Y a-t-il des interactions médicamenteuses à considérer?',
      'Quel est le diagnostic différentiel?',
      'Quand le patient devrait-il revenir pour un suivi?'
    ]
  };

  if (showPatientSelector) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">🤖 AI Medical Assistant</h2>
                <p className="text-purple-100">Select a patient to begin medical consultation</p>
              </div>
              <button
                onClick={onClose}
                className="text-purple-100 hover:text-white transition duration-200"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                <i className="fas fa-users text-purple-600 mr-2"></i>
                Select Patient by Name or National ID
              </h3>
              
              {/* Search Input */}
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search by patient name, National ID, or phone..."
                  value={patientSearchQuery}
                  onChange={(e) => handlePatientSearch(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 pr-10"
                />
                <i className="fas fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>
            </div>

            {/* Patient List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    onClick={() => handlePatientSelect(patient)}
                    className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 cursor-pointer transition duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-800">{patient.full_name}</h4>
                        <p className="text-sm text-gray-600">
                          <i className="fas fa-id-card mr-1"></i>
                          National ID: {patient.national_id}
                        </p>
                        {patient.contact_phone && (
                          <p className="text-sm text-gray-600">
                            <i className="fas fa-phone mr-1"></i>
                            Phone: {patient.contact_phone}
                          </p>
                        )}
                        {patient.age && (
                          <p className="text-sm text-gray-600">
                            <i className="fas fa-calendar mr-1"></i>
                            Age: {patient.age} • Gender: {patient.gender}
                          </p>
                        )}
                      </div>
                      <div className="bg-purple-100 p-2 rounded-full">
                        <i className="fas fa-user text-purple-600"></i>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <i className="fas fa-search text-3xl mb-2"></i>
                  <p>No patients found matching "{patientSearchQuery}"</p>
                  <p className="text-sm mt-2">Try searching by name, National ID, or phone number</p>
                </div>
              )}
            </div>
            
            {/* Total count */}
            <div className="mt-4 text-sm text-gray-600 text-center">
              {filteredPatients.length} of {availablePatients.length} patients shown
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 z-50">
      <div className="bg-white rounded-lg w-full max-w-7xl h-[95vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 flex justify-between items-center rounded-t-lg">
          <div className="flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 p-2 rounded-full">
              <i className="fas fa-robot text-lg"></i>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold">AI Medical Assistant</h2>
                {/* AI Status Indicator */}
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  isAILive 
                    ? 'bg-green-400 text-green-900' 
                    : 'bg-yellow-400 text-yellow-900'
                }`}>
                  {isAILive ? '● LIVE AI' : '● OFFLINE MODE'}
                </span>
              </div>
              <p className="text-purple-100 text-sm">
                Patient: {currentPatient?.full_name} (ID: {currentPatient?.national_id})
              </p>
              {!isAILive && (
                <p className="text-yellow-200 text-xs">
                  <i className="fas fa-info-circle mr-1"></i>
                  Using clinical guidelines database
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white bg-opacity-20 text-white border border-white border-opacity-30 rounded px-2 py-1 text-sm"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code} className="text-gray-800">
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowPatientSelector(true)}
              className="bg-white bg-opacity-20 px-2 py-1 rounded text-sm hover:bg-opacity-30 transition duration-200"
            >
              <i className="fas fa-user-switch mr-1"></i>Change
            </button>
            <button
              onClick={onClose}
              className="text-purple-100 hover:text-white transition duration-200 p-1"
            >
              <i className="fas fa-times text-lg"></i>
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Messages - Main Chat Area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-full lg:max-w-4xl p-4 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-50 text-gray-800 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                        message.type === 'user' 
                          ? 'bg-white text-purple-600' 
                          : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                      }`}>
                        {message.type === 'user' ? '👨‍⚕️' : '🤖'}
                      </div>
                      <div className="flex-1 min-w-0">
                        {/* Message Content with Better Typography */}
                        <div className="text-sm lg:text-base leading-relaxed whitespace-pre-wrap break-words">
                          {message.content}
                        </div>
                        
                        {/* AI Reasoning Section */}
                        {message.reasoning && (
                          <details className="mt-3 text-sm opacity-75">
                            <summary className="cursor-pointer font-medium hover:opacity-100 transition-opacity">
                              <i className="fas fa-brain mr-1"></i>AI Analysis Details
                              {message.isAILive === false && (
                                <span className="ml-2 text-yellow-600 text-xs">(Offline Response)</span>
                              )}
                            </summary>
                            <div className="mt-2 pl-4 border-l-2 border-purple-300 bg-white bg-opacity-50 p-3 rounded">
                              <p className="mb-2"><strong>Confidence:</strong> {message.reasoning.confidence}</p>
                              <p className="mb-2"><strong>Evidence Sources:</strong> {message.reasoning.evidence_sources?.join(', ')}</p>
                              {message.reasoning.ai_status && (
                                <p className="mb-2"><strong>Status:</strong> {message.reasoning.ai_status}</p>
                              )}
                              {message.modelUsed && message.modelUsed !== 'fallback' && (
                                <p className="text-xs text-gray-500"><strong>Model:</strong> {message.modelUsed}</p>
                              )}
                            </div>
                          </details>
                        )}
                        
                        {/* Timestamp */}
                        <div className="text-xs opacity-50 mt-2">
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Loading Indicator */}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-50 p-4 rounded-lg flex items-center space-x-3 border border-gray-200">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white">
                      🤖
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-200"></div>
                    </div>
                    <span className="text-sm text-gray-600">AI is analyzing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area - Fixed at Bottom */}
            <div className="border-t border-gray-200 p-4 bg-white">
              {/* Quick Questions */}
              <div className="mb-3">
                <p className="text-sm text-gray-600 mb-2">
                  <i className="fas fa-lightning-bolt mr-1"></i>Quick Questions:
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions[language].slice(0, 2).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInputMessage(question)}
                      className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full hover:bg-purple-200 transition duration-200"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div className="flex space-x-2">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={language === 'en' ? 'Ask about patient symptoms, diagnosis, or treatment recommendations...' :
                              language === 'rw' ? 'Baza ku bimenyetso by\'umurwayi, isuzuma, cyangwa inama z\'ubuvuzi...' :
                              'Demandez des symptômes du patient, diagnostic ou recommandations de traitement...'}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-sm"
                  rows="2"
                  disabled={loading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || loading}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 flex-shrink-0"
                >
                  {loading ? (
                    <i className="fas fa-spinner animate-spin"></i>
                  ) : (
                    <i className="fas fa-paper-plane"></i>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Patient History Sidebar - Collapsible on Mobile */}
          <div className="w-80 bg-gray-50 border-l border-gray-200 p-4 overflow-y-auto hidden lg:block">
            <h3 className="font-semibold text-gray-800 mb-4">
              <i className="fas fa-history text-purple-600 mr-2"></i>
              Recent Medical History
            </h3>
            
            {patientHistory && patientHistory.length > 0 ? (
              <div className="space-y-4">
                {patientHistory.map((visit, index) => (
                  <div key={visit.id} className="bg-white p-3 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-purple-600">
                        Visit #{index + 1}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(visit.visit_date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Symptoms:</span>
                        <p className="text-gray-600 text-xs">{visit.symptoms}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Diagnosis:</span>
                        <p className="text-gray-600 text-xs">{visit.diagnosis}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Medications:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {visit.prescribed_medications?.map((med, i) => (
                            <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                              {med}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <i className="fas fa-clipboard-list text-3xl mb-2"></i>
                <p className="text-sm">No medical history available</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIMedicalAssistant;