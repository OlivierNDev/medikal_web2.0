import React, { useState, useEffect } from 'react';

function ViewPrescriptions({ patientId, language = 'en' }) {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const translations = {
    en: {
      title: 'My Prescriptions',
      current: 'Current Medications',
      past: 'Past Medications',
      drugName: 'Drug Name',
      dosage: 'Dosage',
      frequency: 'Frequency',
      prescribed: 'Prescribed',
      doctor: 'Doctor',
      status: 'Status',
      actions: 'Actions',
      downloadPDF: 'Download PDF',
      reorder: 'Reorder',
      active: 'Active',
      expired: 'Expired',
      completed: 'Completed',
      noMedications: 'No medications found',
      instructions: 'Instructions'
    },
    rw: {
      title: 'Imiti Yanjye',
      current: 'Imiti Igikora',
      past: 'Imiti Yarahise',
      drugName: 'Izina ry\'Umuti',
      dosage: 'Igipimo',
      frequency: 'Inshuro',
      prescribed: 'Yatanzwe',
      doctor: 'Muganga',
      status: 'Imiterere',
      actions: 'Ibikorwa',
      downloadPDF: 'Kuramo PDF',
      reorder: 'Kongera Gusaba',
      active: 'Ukiri Ukora',
      expired: 'Wangiritse',
      completed: 'Warangiye',
      noMedications: 'Nta miti wabonetse',
      instructions: 'Amategeko'
    },
    fr: {
      title: 'Mes Prescriptions',
      current: 'Médicaments Actuels',
      past: 'Médicaments Antérieurs',
      drugName: 'Nom du Médicament',
      dosage: 'Dosage',
      frequency: 'Fréquence',
      prescribed: 'Prescrit',
      doctor: 'Médecin',
      status: 'Statut',
      actions: 'Actions',
      downloadPDF: 'Télécharger PDF',
      reorder: 'Renouveler',
      active: 'Actif',
      expired: 'Expiré',
      completed: 'Terminé',
      noMedications: 'Aucun médicament trouvé',
      instructions: 'Instructions'
    }
  };

  const t = translations[language] || translations.en;

  // Mock data - replace with API call
  useEffect(() => {
    const loadPrescriptions = async () => {
      setLoading(true);
      try {
        // Simulate API call
        const mockPrescriptions = [
          {
            id: 1,
            drugName: 'Amoxicillin',
            dosage: '500mg',
            frequency: '3 times a day',
            prescribedDate: '2024-01-15',
            doctorName: 'Dr. Sarah Johnson',
            status: 'active',
            instructions: 'Take with food. Complete full course.',
            endDate: '2024-01-22',
            remainingDays: 2
          },
          {
            id: 2,
            drugName: 'Paracetamol',
            dosage: '500mg',
            frequency: 'As needed (max 4 times daily)',
            prescribedDate: '2024-01-15',
            doctorName: 'Dr. Sarah Johnson',
            status: 'active',
            instructions: 'For fever and pain relief. Do not exceed maximum daily dose.',
            endDate: null,
            remainingDays: null
          },
          {
            id: 3,
            drugName: 'Omeprazole',
            dosage: '20mg',
            frequency: 'Once daily',
            prescribedDate: '2024-01-05',
            doctorName: 'Dr. Michael Brown',
            status: 'completed',
            instructions: 'Take before breakfast. 14-day course.',
            endDate: '2024-01-19',
            remainingDays: 0
          },
          {
            id: 4,
            drugName: 'Lisinopril',
            dosage: '10mg',
            frequency: 'Once daily',
            prescribedDate: '2023-12-20',
            doctorName: 'Dr. Sarah Johnson',
            status: 'expired',
            instructions: 'For blood pressure control. Take at same time daily.',
            endDate: '2024-01-20',
            remainingDays: 0
          }
        ];
        
        setPrescriptions(mockPrescriptions);
      } catch (error) {
        console.error('Error loading prescriptions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPrescriptions();
  }, [patientId]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return t.active;
      case 'expired': return t.expired;
      case 'completed': return t.completed;
      default: return status;
    }
  };

  const handleDownloadPDF = (prescription) => {
    // Simulate PDF download
    console.log('Downloading prescription PDF for:', prescription.drugName);
    alert(`Downloading prescription for ${prescription.drugName}`);
  };

  const handleReorder = (prescription) => {
    // Simulate reorder request
    console.log('Reordering medication:', prescription.drugName);
    alert(`Reorder request submitted for ${prescription.drugName}`);
  };

  const activePrescriptions = prescriptions.filter(p => p.status === 'active');
  const pastPrescriptions = prescriptions.filter(p => p.status !== 'active');

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        <span className="ml-2 text-gray-600">Loading prescriptions...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          <i className="fas fa-prescription-bottle text-purple-600 mr-2"></i>
          {t.title}
        </h2>
      </div>

      {/* Current Medications */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-green-50 px-6 py-3 border-b border-green-200">
          <h3 className="text-lg font-semibold text-green-800">
            <i className="fas fa-pills mr-2"></i>
            {t.current} ({activePrescriptions.length})
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {activePrescriptions.length > 0 ? (
            activePrescriptions.map((prescription) => (
              <div key={prescription.id} className="p-6 hover:bg-gray-50">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {prescription.drugName}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(prescription.status)}`}>
                        {getStatusText(prescription.status)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">{t.dosage}:</span> {prescription.dosage}
                      </div>
                      <div>
                        <span className="font-medium">{t.frequency}:</span> {prescription.frequency}
                      </div>
                      <div>
                        <span className="font-medium">{t.prescribed}:</span> {new Date(prescription.prescribedDate).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">{t.doctor}:</span> {prescription.doctorName}
                      </div>
                    </div>
                    
                    {prescription.instructions && (
                      <div className="mt-2 p-3 bg-blue-50 rounded-md">
                        <p className="text-sm text-blue-800">
                          <i className="fas fa-info-circle mr-1"></i>
                          <strong>{t.instructions}:</strong> {prescription.instructions}
                        </p>
                      </div>
                    )}
                    
                    {prescription.remainingDays && (
                      <div className="mt-2">
                        <span className="text-sm text-orange-600 font-medium">
                          <i className="fas fa-clock mr-1"></i>
                          {prescription.remainingDays} days remaining
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <button
                      onClick={() => handleDownloadPDF(prescription)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 text-sm"
                    >
                      <i className="fas fa-download mr-1"></i>
                      {t.downloadPDF}
                    </button>
                    <button
                      onClick={() => handleReorder(prescription)}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 text-sm"
                    >
                      <i className="fas fa-redo mr-1"></i>
                      {t.reorder}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              <i className="fas fa-pills text-3xl mb-2"></i>
              <p>No active medications</p>
            </div>
          )}
        </div>
      </div>

      {/* Past Medications */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            <i className="fas fa-history mr-2"></i>
            {t.past} ({pastPrescriptions.length})
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {pastPrescriptions.length > 0 ? (
            pastPrescriptions.map((prescription) => (
              <div key={prescription.id} className="p-6 hover:bg-gray-50">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {prescription.drugName}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(prescription.status)}`}>
                        {getStatusText(prescription.status)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">{t.dosage}:</span> {prescription.dosage}
                      </div>
                      <div>
                        <span className="font-medium">{t.frequency}:</span> {prescription.frequency}
                      </div>
                      <div>
                        <span className="font-medium">{t.prescribed}:</span> {new Date(prescription.prescribedDate).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">{t.doctor}:</span> {prescription.doctorName}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDownloadPDF(prescription)}
                      className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-200 text-sm"
                    >
                      <i className="fas fa-download mr-1"></i>
                      {t.downloadPDF}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              <i className="fas fa-history text-3xl mb-2"></i>
              <p>No past medications</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewPrescriptions;