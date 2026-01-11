import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { aiAPI } from '../services/api';
import PatientList from '../components/PatientList';
import PatientDetails from '../components/PatientDetails';
import AIMedicalAssistant from '../components/AIMedicalAssistant';

function DoctorDashboard() {
  const { state } = useApp();
  const { todayQueue, currentPatient } = state;
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPatientDetails, setShowPatientDetails] = useState(false);
  const [activeTab, setActiveTab] = useState('registry');
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [icdCode, setIcdCode] = useState('');
  const [medications, setMedications] = useState([
    { name: 'Amoxicillin 500mg', dosage: '3 times daily', duration: '7 days' }
  ]);
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    duration: ''
  });
  
  // Skin analysis state
  const [skinImage, setSkinImage] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisMessage, setAnalysisMessage] = useState('');
  
  // AI Medical Assistant state
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [selectedPatientForAI, setSelectedPatientForAI] = useState(null);

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    setShowPatientDetails(true);
  };

  const handleClosePatientDetails = () => {
    setShowPatientDetails(false);
    setSelectedPatient(null);
  };

  const handleOpenAIAssistant = (patient = null) => {
    setSelectedPatientForAI(patient);
    setShowAIAssistant(true);
  };

  const handleCloseAIAssistant = () => {
    setShowAIAssistant(false);
    setSelectedPatientForAI(null);
  };

  const handleAddMedication = () => {
    if (newMedication.name && newMedication.dosage && newMedication.duration) {
      setMedications([...medications, newMedication]);
      setNewMedication({ name: '', dosage: '', duration: '' });
    }
  };

  const handleRemoveMedication = (index) => {
    setMedications(medications.filter((_, i) => i !== index));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSkinImage(file);
      setAnalysisLoading(true);
      setAnalysisMessage('');
      try {
        const result = await aiAPI.analyzeSkinImage(file);
        setAnalysisResults(result.predictions);
        setAnalysisMessage('Image analyzed successfully!');
      } catch (error) {
        setAnalysisMessage('Error analyzing image. Please try again.');
        console.error('Error analyzing image:', error);
      } finally {
        setAnalysisLoading(false);
      }
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'current':
        return 'bg-green-100 text-green-800';
      case 'next':
        return 'bg-yellow-100 text-yellow-800';
      case 'waiting':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'current':
        return 'Current';
      case 'next':
        return 'Next';
      case 'waiting':
        return 'Waiting';
      default:
        return 'Waiting';
    }
  };

  return (
    <section className="container mx-auto px-4 py-6 md:py-8">
      {/* Tab Navigation */}
      <div className="bg-white rounded-lg card-shadow mb-6">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('registry')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'registry'
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <i className="fas fa-users mr-2"></i>Patient Registry
          </button>
          <button
            onClick={() => setActiveTab('queue')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'queue'
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <i className="fas fa-clock mr-2"></i>Today's Queue ({todayQueue.length})
          </button>
          <button
            onClick={() => setActiveTab('consultation')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'consultation'
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <i className="fas fa-user-md mr-2"></i>Consultation
          </button>
          <button
            onClick={() => setActiveTab('diagnostics')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'diagnostics'
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <i className="fas fa-microscope mr-2"></i>Diagnostic Tools
          </button>
          <button
            onClick={() => setActiveTab('ai-assistant')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'ai-assistant'
                ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <i className="fas fa-robot mr-2"></i>AI Medical Assistant
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'registry' && (
        <PatientList 
          onPatientSelect={handlePatientSelect}
          onAIConsultation={handleOpenAIAssistant}
        />
      )}

      {activeTab === 'queue' && (
        <div className="bg-white rounded-lg card-shadow p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
            <i className="fas fa-clock text-purple-600 mr-2"></i>Today's Queue
          </h2>
          
          {/* Today's Queue */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-4">Scheduled Patients ({todayQueue.length})</h3>
            <div className="space-y-3">
              {todayQueue.map((patient) => (
                <div
                  key={patient.id}
                  className={`flex items-center justify-between bg-white p-3 rounded border-l-4 ${patient.borderColor}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${patient.bgColor} rounded-full flex items-center justify-center text-white font-bold`}>
                      {patient.initials}
                    </div>
                    <div>
                      <p className="font-medium text-sm md:text-base">{patient.name}</p>
                      <p className="text-xs md:text-sm text-gray-600">ID: {patient.nationalId}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs md:text-sm text-gray-600">{patient.time}</p>
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(patient.status)}`}>
                      {getStatusText(patient.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'consultation' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Patient Consultation */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg card-shadow p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
                <i className="fas fa-user-circle text-purple-600 mr-2"></i>Patient Consultation
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Patient Information</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {currentPatient.name}</p>
                    <p><span className="font-medium">Age:</span> {currentPatient.age} years</p>
                    <p><span className="font-medium">Gender:</span> {currentPatient.gender}</p>
                    <p><span className="font-medium">Phone:</span> {currentPatient.phone}</p>
                    <p><span className="font-medium">ID:</span> {currentPatient.id}</p>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Medical History</h4>
                    <div className="space-y-1 text-sm">
                      {currentPatient.medicalHistory.map((visit, index) => (
                        <button
                          key={index}
                          className="text-blue-600 hover:underline flex items-center w-full text-left"
                        >
                          <i className="fas fa-file-pdf mr-2"></i>
                          {visit.visit} - {visit.date}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Current Symptoms</h3>
                  <textarea
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 h-20 md:h-24"
                    placeholder="Enter patient symptoms and complaints..."
                  />
                  
                  <h3 className="font-semibold text-gray-800 mt-4 mb-3">Diagnosis</h3>
                  <input
                    type="text"
                    placeholder="ICD-10 Code"
                    value={icdCode}
                    onChange={(e) => setIcdCode(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2"
                  />
                  <textarea
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 h-16 md:h-20"
                    placeholder="Diagnosis details..."
                  />
                </div>
              </div>

              {/* Prescription */}
              <div className="mt-6 border-t pt-6">
                <h3 className="font-semibold text-gray-800 mb-3">Prescription</h3>
                <div className="space-y-3">
                  <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                    <input
                      type="text"
                      placeholder="Medication name"
                      value={newMedication.name}
                      onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="text"
                      placeholder="Dosage"
                      value={newMedication.dosage}
                      onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
                      className="w-full md:w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="text"
                      placeholder="Duration"
                      value={newMedication.duration}
                      onChange={(e) => setNewMedication({...newMedication, duration: e.target.value})}
                      className="w-full md:w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      onClick={handleAddMedication}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-200"
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                  <div className="space-y-2">
                    {medications.map((medication, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm md:text-base">
                            {medication.name} - {medication.dosage} - {medication.duration}
                          </span>
                          <button
                            onClick={() => handleRemoveMedication(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                <button className="bg-purple-600 text-white px-6 py-3 md:py-2 rounded-md hover:bg-purple-700 transition duration-200">
                  <i className="fas fa-save mr-2"></i>Save Consultation
                </button>
                <button className="bg-blue-600 text-white px-6 py-3 md:py-2 rounded-md hover:bg-blue-700 transition duration-200">
                  <i className="fas fa-print mr-2"></i>Print Prescription
                </button>
              </div>
            </div>
          </div>

          {/* AI Assistant Sidebar */}
          <div className="space-y-4 md:space-y-6">
            <div className="bg-white rounded-lg card-shadow p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
                <i className="fas fa-robot text-purple-600 mr-2"></i>AI Assistant
              </h3>
              <div className="space-y-4">
                <div className="bg-purple-50 rounded-lg p-3">
                  <h4 className="font-semibold text-purple-800 mb-2">Diagnostic Suggestions</h4>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center">
                      <i className="fas fa-check text-green-600 mr-2"></i>
                      Upper respiratory infection (85%)
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check text-yellow-600 mr-2"></i>
                      Allergic rhinitis (15%)
                    </li>
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-lg p-3">
                  <h4 className="font-semibold text-blue-800 mb-2">Medication Recommendations</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Amoxicillin 500mg TID x 7 days</li>
                    <li>• Paracetamol 500mg PRN for fever</li>
                    <li>• Plenty of fluids and rest</li>
                  </ul>
                </div>
                <div className="bg-red-50 rounded-lg p-3">
                  <h4 className="font-semibold text-red-800 mb-2">AMR Alert</h4>
                  <p className="text-sm text-red-700">
                    Patient has received 3 antibiotic courses in the past 3 months. Consider culture test.
                  </p>
                </div>
              </div>
            </div>

            {/* Voice Recording */}
            <div className="bg-white rounded-lg card-shadow p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
                <i className="fas fa-microphone text-purple-600 mr-2"></i>Voice Notes
              </h3>
              <div className="text-center">
                <button className="bg-red-500 text-white rounded-full p-3 hover:bg-red-600 transition duration-200 mb-3">
                  <i className="fas fa-microphone"></i>
                </button>
                <p className="text-sm text-gray-600">Record consultation notes</p>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                  <span className="text-sm">Recording 1 (2:34)</span>
                  <button className="text-blue-600 hover:text-blue-800">
                    <i className="fas fa-play"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'diagnostics' && (
        <div className="bg-white rounded-lg card-shadow p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
            <i className="fas fa-microscope text-purple-600 mr-2"></i>Diagnostic Tools
          </h2>

          {/* Skin Disease Analysis */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              <i className="fas fa-camera text-purple-600 mr-2"></i>Skin Disease Analysis
            </h3>
            
            {analysisMessage && (
              <div className={`mb-4 p-3 rounded-md ${
                analysisMessage.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
              }`}>
                {analysisMessage}
              </div>
            )}

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 md:p-8 text-center bg-white">
              <i className="fas fa-cloud-upload-alt text-3xl md:text-4xl text-gray-400 mb-4"></i>
              <p className="text-gray-600 mb-4 text-sm md:text-base">Upload image of skin condition for AI analysis</p>
              <input
                type="file"
                id="skinImage"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                onClick={() => document.getElementById('skinImage').click()}
                disabled={analysisLoading}
                className="bg-purple-600 text-white px-6 py-3 md:py-2 rounded-md hover:bg-purple-700 transition duration-200 disabled:opacity-50"
              >
                <i className="fas fa-image mr-2"></i>
                {analysisLoading ? 'Analyzing...' : 'Select Image'}
              </button>
            </div>

            {analysisResults && (
              <div className="mt-6 bg-white rounded-lg p-4 border">
                <h4 className="font-semibold text-gray-800 mb-3">AI Analysis Results:</h4>
                <div className="space-y-3">
                  {analysisResults.map((result, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium text-gray-800">{result.condition}</span>
                        <p className="text-sm text-gray-600">Confidence Level</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-lg font-bold ${
                          result.probability >= 0.7 ? 'text-green-600' : 
                          result.probability >= 0.3 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {Math.round(result.probability * 100)}%
                        </span>
                        <div className={`w-16 h-2 rounded-full mt-1 ${
                          result.probability >= 0.7 ? 'bg-green-200' : 
                          result.probability >= 0.3 ? 'bg-yellow-200' : 'bg-red-200'
                        }`}>
                          <div className={`h-full rounded-full ${
                            result.probability >= 0.7 ? 'bg-green-600' : 
                            result.probability >= 0.3 ? 'bg-yellow-600' : 'bg-red-600'
                          }`} style={{width: `${result.probability * 100}%`}}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <p className="text-sm text-blue-800">
                    <i className="fas fa-info-circle mr-2"></i>
                    <strong>Note:</strong> AI analysis is for diagnostic assistance only. Always combine with clinical examination and professional medical judgment.
                  </p>
                </div>
              </div>
            )}

            {/* Additional Diagnostic Tools Placeholder */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-200">
                <i className="fas fa-stethoscope text-2xl text-gray-400 mb-2"></i>
                <h4 className="font-medium text-gray-700 mb-1">Symptom Checker</h4>
                <p className="text-sm text-gray-500">AI-powered symptom analysis (Coming Soon)</p>
              </div>
              <div className="bg-white p-4 rounded-lg border-2 border-dashed border-gray-200">
                <i className="fas fa-dna text-2xl text-gray-400 mb-2"></i>
                <h4 className="font-medium text-gray-700 mb-1">Lab Results Analysis</h4>
                <p className="text-sm text-gray-500">Automated lab result interpretation (Coming Soon)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'ai-assistant' && (
        <div className="bg-white rounded-lg card-shadow p-4 md:p-6">
          <div className="text-center py-12">
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-robot text-4xl text-purple-600"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🤖 AI Medical Assistant
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Get intelligent medical recommendations based on patient history, current symptoms, 
              and AMR guidelines. Available in English, Kinyarwanda, and French.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
              <div className="bg-purple-50 p-6 rounded-lg">
                <i className="fas fa-brain text-2xl text-purple-600 mb-4"></i>
                <h3 className="font-semibold text-gray-800 mb-2">Smart Analysis</h3>
                <p className="text-sm text-gray-600">
                  AI analyzes patient's 3 most recent medical visits plus current symptoms
                  to provide personalized treatment recommendations.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <i className="fas fa-globe text-2xl text-blue-600 mb-4"></i>
                <h3 className="font-semibold text-gray-800 mb-2">Multilingual Support</h3>
                <p className="text-sm text-gray-600">
                  Communicate in English, Kinyarwanda, or French. 
                  Perfect for Rwanda's multilingual healthcare environment.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <i className="fas fa-shield-virus text-2xl text-green-600 mb-4"></i>
                <h3 className="font-semibold text-gray-800 mb-2">AMR Awareness</h3>
                <p className="text-sm text-gray-600">
                  Built-in antimicrobial resistance monitoring with WHO AWaRe 
                  classification for responsible antibiotic prescribing.
                </p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-lg">
                <i className="fas fa-comments text-2xl text-yellow-600 mb-4"></i>
                <h3 className="font-semibold text-gray-800 mb-2">Interactive Chat</h3>
                <p className="text-sm text-gray-600">
                  Ask follow-up questions, get differential diagnosis suggestions,
                  and receive evidence-based treatment protocols.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => handleOpenAIAssistant()}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg hover:from-purple-700 hover:to-blue-700 transition duration-200 text-lg font-medium"
              >
                <i className="fas fa-robot mr-3"></i>
                Start AI Medical Consultation
              </button>
              <p className="text-sm text-gray-500">
                You can also start AI consultation directly from any patient in the Patient Registry
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Patient Details Modal */}
      {showPatientDetails && selectedPatient && (
        <PatientDetails
          patient={selectedPatient}
          onClose={handleClosePatientDetails}
          onEdit={() => {
            // TODO: Implement patient edit functionality
            console.log('Edit patient:', selectedPatient);
          }}
        />
      )}

      {/* AI Medical Assistant Modal */}
      {showAIAssistant && (
        <AIMedicalAssistant
          selectedPatient={selectedPatientForAI}
          onClose={handleCloseAIAssistant}
        />
      )}
    </section>
  );
}

export default DoctorDashboard;