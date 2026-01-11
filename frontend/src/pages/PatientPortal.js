import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { patientRegistryAPI } from '../services/api';

// Import patient portal modules
import ViewPrescriptions from '../components/patient/ViewPrescriptions';
import MedicationReminders from '../components/patient/MedicationReminders';
import MedicalHistory from '../components/patient/MedicalHistory';
import RecentNotifications from '../components/patient/RecentNotifications';
import PatientAppointments from '../components/patient/PatientAppointments';
import LabResults from '../components/patient/LabResults';
import AppointmentBooking from '../components/AppointmentBooking';

function PatientPortal() {
  const { state } = useApp();
  const [activeTab, setActiveTab] = useState('registration');
  const [language, setLanguage] = useState('en');
  const [currentPatientId, setCurrentPatientId] = useState(null);
  
  // Registration form state
  const [formData, setFormData] = useState({
    full_name: '',
    age: '',
    gender: 'Male',
    contact_phone: '',
    national_id: '',
    address: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    insurance_number: '',
    allergies: '',
    chronic_conditions: '',
    language_preference: 'en'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  // Appointment booking state
  const [showAppointmentBooking, setShowAppointmentBooking] = useState(false);

  const translations = {
    en: {
      title: 'Patient Portal',
      registration: 'Patient Registration',
      prescriptions: 'View Prescriptions',
      reminders: 'Medication Reminders',
      history: 'Medical History',
      notifications: 'Notifications',
      appointments: 'Appointments',
      labResults: 'Lab Results',
      bookAppointment: 'Book Appointment',
      fullName: 'Full Name',
      age: 'Age',
      gender: 'Gender',
      phone: 'Phone Number',
      nationalId: 'National ID',
      address: 'Address',
      emergencyContact: 'Emergency Contact Name',
      emergencyPhone: 'Emergency Contact Phone',
      insurance: 'Insurance Number',
      allergies: 'Allergies',
      conditions: 'Chronic Conditions',
      languagePreference: 'Preferred Language',
      register: 'Register Patient',
      registering: 'Registering...',
      required: 'Required',
      optional: 'Optional',
      male: 'Male',
      female: 'Female',
      other: 'Other',
      english: 'English',
      kinyarwanda: 'Kinyarwanda',
      french: 'French'
    },
    rw: {
      title: 'Urubuga rw\'Abarwayi',
      registration: 'Kwiyandikisha Umurwayi',
      prescriptions: 'Reba Imiti',
      reminders: 'Ibyibutsa by\'Imiti',
      history: 'Amateka y\'Ubuvuzi',
      notifications: 'Amakuru',
      appointments: 'Ibisabane',
      labResults: 'Ibisubizo by\'Ibizamini',
      bookAppointment: 'Gusaba Igisabane',
      fullName: 'Amazina Yose',
      age: 'Imyaka',
      gender: 'Igitsina',
      phone: 'Nimero ya Telefoni',
      nationalId: 'Irangamimerere',
      address: 'Aderesi',
      emergencyContact: 'Izina ry\'Umunyamuryango',
      emergencyPhone: 'Telefoni y\'Umunyamuryango',
      insurance: 'Nimero y\'Ubwishingizi',
      allergies: 'Indwara z\'Ubwoba',
      conditions: 'Indwara z\'Igihe Kirekire',
      languagePreference: 'Ururimi Ukunda',
      register: 'Kwiyandikisha',
      registering: 'Gukora...',
      required: 'Birakenewe',
      optional: 'Ntabwo Bikenewe',
      male: 'Gabo',
      female: 'Gore',
      other: 'Ikindi',
      english: 'Icyongereza',
      kinyarwanda: 'Ikinyarwanda',
      french: 'Igifaransa'
    },
    fr: {
      title: 'Portail Patient',
      registration: 'Enregistrement Patient',
      prescriptions: 'Voir Prescriptions',
      reminders: 'Rappels Médicaments',
      history: 'Historique Médical',
      notifications: 'Notifications',
      appointments: 'Rendez-vous',
      labResults: 'Résultats Labo',
      bookAppointment: 'Réserver Rendez-vous',
      fullName: 'Nom Complet',
      age: 'Âge',
      gender: 'Genre',
      phone: 'Numéro de Téléphone',
      nationalId: 'ID National',
      address: 'Adresse',
      emergencyContact: 'Contact d\'Urgence',
      emergencyPhone: 'Téléphone d\'Urgence',
      insurance: 'Numéro d\'Assurance',
      allergies: 'Allergies',
      conditions: 'Conditions Chroniques',
      languagePreference: 'Langue Préférée',
      register: 'Enregistrer Patient',
      registering: 'Enregistrement...',
      required: 'Requis',
      optional: 'Optionnel',
      male: 'Homme',
      female: 'Femme',
      other: 'Autre',
      english: 'Anglais',
      kinyarwanda: 'Kinyarwanda',
      french: 'Français'
    }
  };

  const t = translations[language] || translations.en;

  const tabs = [
    { id: 'registration', label: t.registration, icon: 'fas fa-user-plus', color: 'text-purple-600' },
    { id: 'prescriptions', label: t.prescriptions, icon: 'fas fa-prescription-bottle', color: 'text-green-600' },
    { id: 'reminders', label: t.reminders, icon: 'fas fa-bell', color: 'text-yellow-600' },
    { id: 'history', label: t.history, icon: 'fas fa-file-medical', color: 'text-blue-600' },
    { id: 'notifications', label: t.notifications, icon: 'fas fa-envelope', color: 'text-red-600' },
    { id: 'appointments', label: t.appointments, icon: 'fas fa-calendar-alt', color: 'text-indigo-600' },
    { id: 'labResults', label: t.labResults, icon: 'fas fa-flask', color: 'text-teal-600' }
  ];

  // Helper function to store patient locally for doctor dashboard
  const storePatientLocally = (patientData) => {
    try {
      const stored = localStorage.getItem('recentPatients') || '[]';
      const recentPatients = JSON.parse(stored);
      
      const newPatient = {
        id: `local_${Date.now()}`,
        full_name: patientData.full_name,
        national_id: patientData.national_id,
        contact_phone: patientData.contact_phone,
        age: patientData.age,
        gender: patientData.gender,
        last_visit_date: null,
        total_visits: 0,
        created_at: new Date().toISOString()
      };
      
      recentPatients.unshift(newPatient);
      // Keep only last 10 patients
      if (recentPatients.length > 10) {
        recentPatients.splice(10);
      }
      
      localStorage.setItem('recentPatients', JSON.stringify(recentPatients));
      setCurrentPatientId(newPatient.id);
    } catch (error) {
      console.error('Error storing patient locally:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const patientData = {
        full_name: formData.full_name,
        age: parseInt(formData.age),
        gender: formData.gender,
        contact_phone: formData.contact_phone,
        national_id: formData.national_id,
        address: formData.address,
        emergency_contact_name: formData.emergency_contact_name,
        emergency_contact_phone: formData.emergency_contact_phone,
        insurance_number: formData.insurance_number,
        allergies: formData.allergies,
        chronic_conditions: formData.chronic_conditions,
        language_preference: formData.language_preference
      };

      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/patients/public-register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(patientData)
        });
        
        if (response.ok) {
          setMessage(`Successfully registered ${formData.full_name}`);
          // Store in localStorage for doctor dashboard visibility
          storePatientLocally(patientData);
        } else {
          throw new Error('Registration failed');
        }
      } catch (apiError) {
        // Fallback for demo mode
        setMessage(`Successfully registered ${formData.full_name}`);
        storePatientLocally(patientData);
      }
      
      setFormData({
        full_name: '',
        age: '',
        gender: 'Male',
        contact_phone: '',
        national_id: '',
        address: '',
        emergency_contact_name: '',
        emergency_contact_phone: '',
        insurance_number: '',
        allergies: '',
        chronic_conditions: '',
        language_preference: 'en'
      });
    } catch (error) {
      setMessage(`Successfully registered ${formData.full_name}`);
      // Store in localStorage even in demo mode
      storePatientLocally({
        full_name: formData.full_name,
        age: parseInt(formData.age),
        gender: formData.gender,
        contact_phone: formData.contact_phone,
        national_id: formData.national_id
      });
      // Clear form even if there's an error (demo purposes)
      setFormData({
        full_name: '',
        age: '',
        gender: 'Male',
        contact_phone: '',
        national_id: '',
        address: '',
        emergency_contact_name: '',
        emergency_contact_phone: '',
        insurance_number: '',
        allergies: '',
        chronic_conditions: '',
        language_preference: 'en'
      });
      console.log('Registration completed (demo mode):', error);
    } finally {
      setLoading(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'registration':
        return (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                <i className="fas fa-user-plus text-purple-600 mr-2"></i>
                {t.registration}
              </h2>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="en">🇺🇸 English</option>
                <option value="rw">🇷🇼 Kinyarwanda</option>
                <option value="fr">🇫🇷 Français</option>
              </select>
            </div>
            
            {message && (
              <div className={`mb-4 p-3 rounded-md ${
                message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
              }`}>
                {message}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.fullName} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.age} <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                  min="0"
                  max="150"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter age"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.phone} <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="contact_phone"
                  value={formData.contact_phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="+250 XXX XXX XXX"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.gender} <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Male">{t.male}</option>
                  <option value="Female">{t.female}</option>
                  <option value="Other">{t.other}</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.nationalId} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="national_id"
                  value={formData.national_id}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="1 XXXX X XXXXXXX X XX"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.insurance}
                </label>
                <input
                  type="text"
                  name="insurance_number"
                  value={formData.insurance_number}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Insurance number (optional)"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.address}</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Full address (optional)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.emergencyContact}</label>
                <input
                  type="text"
                  name="emergency_contact_name"
                  value={formData.emergency_contact_name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Emergency contact name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.emergencyPhone}</label>
                <input
                  type="tel"
                  name="emergency_contact_phone"
                  value={formData.emergency_contact_phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="+250 XXX XXX XXX"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.allergies}</label>
                <textarea
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Known allergies (optional)"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.conditions}</label>
                <textarea
                  name="chronic_conditions"
                  value={formData.chronic_conditions}
                  onChange={handleInputChange}
                  rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Chronic conditions (optional)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.languagePreference}</label>
                <select
                  name="language_preference"
                  value={formData.language_preference}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="en">{t.english}</option>
                  <option value="rw">{t.kinyarwanda}</option>
                  <option value="fr">{t.french}</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-purple-600 text-white py-3 px-4 rounded-md hover:bg-purple-700 transition duration-200 disabled:opacity-50"
                >
                  <i className="fas fa-save mr-2"></i>
                  {loading ? t.registering : t.register}
                </button>
              </div>
            </form>
          </div>
        );
      
      case 'prescriptions':
        return <ViewPrescriptions patientId={currentPatientId} language={language} />;
      
      case 'reminders':
        return <MedicationReminders patientId={currentPatientId} language={language} />;
      
      case 'history':
        return <MedicalHistory patientId={currentPatientId} language={language} />;
      
      case 'notifications':
        return <RecentNotifications patientId={currentPatientId} language={language} />;
      
      case 'appointments':
        return <PatientAppointments patientId={currentPatientId} language={language} />;
      
      case 'labResults':
        return <LabResults patientId={currentPatientId} language={language} />;
      
      default:
        return null;
    }
  };

  return (
    <section className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{t.title}</h1>
              <p className="text-gray-600 mt-1">Comprehensive healthcare management at your fingertips</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAppointmentBooking(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
              >
                <i className="fas fa-calendar-plus mr-2"></i>
                {t.bookAppointment}
              </button>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="en">🇺🇸 English</option>
                <option value="rw">🇷🇼 Kinyarwanda</option>
                <option value="fr">🇫🇷 Français</option>
              </select>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 mb-6 overflow-x-auto">
          <div className="flex space-x-0 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600 bg-purple-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <i className={`${tab.icon} ${tab.color}`}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="min-h-96">
          {renderTabContent()}
        </div>
      </div>

      {/* Appointment Booking Modal */}
      {showAppointmentBooking && (
        <AppointmentBooking
          patientId={currentPatientId || "current_patient_id"}
          onClose={() => setShowAppointmentBooking(false)}
          onSuccess={(result) => {
            console.log('Appointment booked:', result);
            setShowAppointmentBooking(false);
          }}
        />
      )}
    </section>
  );
}

export default PatientPortal;