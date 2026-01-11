import React, { useState, useEffect } from 'react';

function MedicalHistory({ patientId, language = 'en' }) {
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVisit, setSelectedVisit] = useState(null);

  const translations = {
    en: {
      title: 'Medical History',
      recentVisits: 'Recent Visits',
      visitDetails: 'Visit Details',
      date: 'Date',
      condition: 'Condition Diagnosed',
      prescriptions: 'Prescriptions Issued',
      treatment: 'Treatment Summary',
      doctor: 'Doctor',
      symptoms: 'Symptoms',
      diagnosis: 'Diagnosis',
      medications: 'Medications',
      notes: 'Doctor Notes',
      downloadPDF: 'Download Report',
      viewDetails: 'View Details',
      closeDetails: 'Close',
      amrAlert: 'AMR Related',
      noHistory: 'No medical history available',
      followUp: 'Follow-up Required',
      completed: 'Treatment Completed'
    },
    rw: {
      title: 'Amateka y\'Ubuvuzi',
      recentVisits: 'Ubusuzume bwa Vuba',
      visitDetails: 'Amakuru y\'Ubusuzume',
      date: 'Itariki',
      condition: 'Indwara Yabonetse',
      prescriptions: 'Imiti Yatanzwe',
      treatment: 'Incamake y\'Ubuvuzi', 
      doctor: 'Muganga',
      symptoms: 'Ibimenyetso',
      diagnosis: 'Isuzuma',
      medications: 'Imiti',
      notes: 'Inyandiko za Muganga',
      downloadPDF: 'Kuramo Raporo',
      viewDetails: 'Reba Amakuru',
      closeDetails: 'Funga',
      amrAlert: 'Bijyanye na AMR',
      noHistory: 'Nta mateka y\'ubuvuzi ahari',
      followUp: 'Gukurikirana Birakenewe',
      completed: 'Ubuvuzi Bwarangiye'
    },
    fr: {
      title: 'Historique Médical',
      recentVisits: 'Visites Récentes',
      visitDetails: 'Détails de la Visite',
      date: 'Date',
      condition: 'Condition Diagnostiquée',
      prescriptions: 'Prescriptions Émises',
      treatment: 'Résumé du Traitement',
      doctor: 'Médecin',
      symptoms: 'Symptômes',
      diagnosis: 'Diagnostic',
      medications: 'Médicaments',
      notes: 'Notes du Médecin',
      downloadPDF: 'Télécharger Rapport',
      viewDetails: 'Voir Détails',
      closeDetails: 'Fermer',
      amrAlert: 'Lié à RAM',
      noHistory: 'Aucun historique médical disponible',
      followUp: 'Suivi Requis',
      completed: 'Traitement Terminé'
    }
  };

  const t = translations[language] || translations.en;

  useEffect(() => {
    const loadMedicalHistory = async () => {
      setLoading(true);
      try {
        // Mock medical history data
        const mockHistory = [
          {
            id: 1,
            date: '2024-01-15',
            condition: 'Upper Respiratory Tract Infection',
            symptoms: 'Fever, headache, body aches, runny nose',
            diagnosis: 'Viral upper respiratory tract infection with secondary bacterial component',
            prescriptions: [
              { name: 'Amoxicillin', dosage: '500mg', frequency: '3 times daily', duration: '7 days' },
              { name: 'Paracetamol', dosage: '500mg', frequency: 'as needed', duration: 'for fever' }
            ],
            treatment: 'Symptomatic treatment with antibiotics for secondary bacterial infection. Patient advised rest and hydration.',
            doctor: 'Dr. Sarah Johnson',
            doctorNotes: 'Patient responded well to treatment. Completed antibiotic course. No complications observed.',
            status: 'completed',
            amrRelated: true,
            followUpRequired: false
          },
          {
            id: 2,
            date: '2024-01-08',
            condition: 'Viral Bronchitis',
            symptoms: 'Persistent cough, mild fever, fatigue',
            diagnosis: 'Acute viral bronchitis',
            prescriptions: [
              { name: 'Paracetamol', dosage: '500mg', frequency: 'every 6 hours', duration: 'as needed' },
              { name: 'Cough syrup', dosage: '10ml', frequency: '3 times daily', duration: '5 days' }
            ],
            treatment: 'Supportive care with symptomatic relief. No antibiotics required.',
            doctor: 'Dr. Sarah Johnson',
            doctorNotes: 'Symptoms improving with supportive care. Patient educated on viral vs bacterial infections.',
            status: 'completed',
            amrRelated: false,
            followUpRequired: false
          },
          {
            id: 3,
            date: '2023-12-20',
            condition: 'Gastritis',
            symptoms: 'Stomach pain, nausea, heartburn',
            diagnosis: 'Acute gastritis, likely stress-related',
            prescriptions: [
              { name: 'Omeprazole', dosage: '20mg', frequency: 'once daily', duration: '14 days' },
              { name: 'Antacid tablets', dosage: '2 tablets', frequency: 'as needed', duration: 'for symptoms' }
            ],
            treatment: 'Proton pump inhibitor therapy with dietary modifications. Patient counseled on lifestyle changes.',
            doctor: 'Dr. Michael Brown',
            doctorNotes: 'Advised dietary modifications including avoiding spicy foods, caffeine, and alcohol. Follow-up in 2 weeks if symptoms persist.',
            status: 'completed',
            amrRelated: false,
            followUpRequired: false
          },
          {
            id: 4,
            date: '2023-12-01',
            condition: 'Hypertension Follow-up',
            symptoms: 'No specific symptoms, routine check-up',
            diagnosis: 'Essential hypertension, well controlled',
            prescriptions: [
              { name: 'Lisinopril', dosage: '10mg', frequency: 'once daily', duration: 'ongoing' }
            ],
            treatment: 'Continuation of ACE inhibitor therapy. Blood pressure well controlled.',
            doctor: 'Dr. Sarah Johnson',
            doctorNotes: 'BP: 125/80 mmHg. Good control on current medication. Continue current therapy. Next follow-up in 3 months.',
            status: 'ongoing',
            amrRelated: false,
            followUpRequired: true
          },
          {
            id: 5,
            date: '2023-11-15',
            condition: 'Urinary Tract Infection',
            symptoms: 'Burning sensation during urination, frequent urination, lower abdominal pain',
            diagnosis: 'Uncomplicated urinary tract infection',
            prescriptions: [
              { name: 'Ciprofloxacin', dosage: '500mg', frequency: 'twice daily', duration: '7 days' }
            ],
            treatment: 'Antibiotic therapy for UTI. Patient advised increased fluid intake.',
            doctor: 'Dr. Michael Brown',
            doctorNotes: 'Culture and sensitivity performed. Organism sensitive to ciprofloxacin. Complete course advised.',
            status: 'completed',
            amrRelated: true,
            followUpRequired: false
          }
        ];
        
        setMedicalHistory(mockHistory);
      } catch (error) {
        console.error('Error loading medical history:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMedicalHistory();
  }, [patientId]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'follow-up': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return t.completed;
      case 'ongoing': return 'Ongoing';
      case 'follow-up': return t.followUp;
      default: return status;
    }
  };

  const handleDownloadPDF = (visit) => {
    console.log('Downloading visit report for:', visit.date);
    alert(`Downloading medical report for visit on ${new Date(visit.date).toLocaleDateString()}`);
  };

  const handleViewDetails = (visit) => {
    setSelectedVisit(visit);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        <span className="ml-2 text-gray-600">Loading medical history...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          <i className="fas fa-file-medical text-purple-600 mr-2"></i>
          {t.title}
        </h2>
      </div>

      {/* Recent Visits */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-blue-50 px-6 py-3 border-b border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800">
            <i className="fas fa-history mr-2"></i>
            {t.recentVisits} ({medicalHistory.length})
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {medicalHistory.length > 0 ? (
            medicalHistory.map((visit) => (
              <div key={visit.id} className="p-6 hover:bg-gray-50">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {visit.condition}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(visit.status)}`}>
                        {getStatusText(visit.status)}
                      </span>
                      {visit.amrRelated && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          <i className="fas fa-exclamation-triangle mr-1"></i>
                          {t.amrAlert}
                        </span>
                      )}
                      {visit.followUpRequired && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          <i className="fas fa-calendar-check mr-1"></i>
                          {t.followUp}
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <span className="font-medium">{t.date}:</span> {new Date(visit.date).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">{t.doctor}:</span> {visit.doctor}
                      </div>
                      <div>
                        <span className="font-medium">{t.prescriptions}:</span> {visit.prescriptions.length} medications
                      </div>
                    </div>

                    <div className="text-sm text-gray-700">
                      <p><span className="font-medium">{t.symptoms}:</span> {visit.symptoms}</p>
                    </div>

                    <div className="mt-2">
                      <div className="flex flex-wrap gap-2">
                        {visit.prescriptions.slice(0, 3).map((medication, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {medication.name} {medication.dosage}
                          </span>
                        ))}
                        {visit.prescriptions.length > 3 && (
                          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                            +{visit.prescriptions.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <button
                      onClick={() => handleViewDetails(visit)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 text-sm"
                    >
                      <i className="fas fa-eye mr-1"></i>
                      {t.viewDetails}
                    </button>
                    <button
                      onClick={() => handleDownloadPDF(visit)}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 text-sm"
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
              <i className="fas fa-file-medical text-3xl mb-2"></i>
              <p>{t.noHistory}</p>
            </div>
          )}
        </div>
      </div>

      {/* Visit Details Modal */}
      {selectedVisit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">{t.visitDetails}</h2>
                  <p className="text-blue-100">{new Date(selectedVisit.date).toLocaleDateString()}</p>
                </div>
                <button
                  onClick={() => setSelectedVisit(null)}
                  className="text-blue-100 hover:text-white transition duration-200"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">{t.condition}</h3>
                    <p className="text-gray-600">{selectedVisit.condition}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">{t.doctor}</h3>
                    <p className="text-gray-600">{selectedVisit.doctor}</p>
                  </div>
                </div>

                {/* Symptoms */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{t.symptoms}</h3>
                  <p className="text-gray-600">{selectedVisit.symptoms}</p>
                </div>

                {/* Diagnosis */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{t.diagnosis}</h3>
                  <p className="text-gray-600">{selectedVisit.diagnosis}</p>
                </div>

                {/* Medications */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{t.medications}</h3>
                  <div className="space-y-3">
                    {selectedVisit.prescriptions.map((medication, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-900">{medication.name}</h4>
                            <p className="text-sm text-gray-600">
                              {medication.dosage} - {medication.frequency}
                            </p>
                          </div>
                          <span className="text-sm text-gray-500">{medication.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Treatment Summary */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{t.treatment}</h3>
                  <p className="text-gray-600">{selectedVisit.treatment}</p>
                </div>

                {/* Doctor Notes */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{t.notes}</h3>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-blue-800">{selectedVisit.doctorNotes}</p>
                  </div>
                </div>

                {/* Alerts */}
                {(selectedVisit.amrRelated || selectedVisit.followUpRequired) && (
                  <div className="space-y-3">
                    {selectedVisit.amrRelated && (
                      <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
                        <div className="flex">
                          <i className="fas fa-exclamation-triangle text-orange-400 mt-1 mr-3"></i>
                          <div>
                            <h4 className="text-orange-800 font-medium">AMR-Related Treatment</h4>
                            <p className="text-orange-700 text-sm">This visit involved antibiotic prescription. Monitor for resistance patterns.</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {selectedVisit.followUpRequired && (
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                        <div className="flex">
                          <i className="fas fa-calendar-check text-yellow-400 mt-1 mr-3"></i>
                          <div>
                            <h4 className="text-yellow-800 font-medium">Follow-up Required</h4>
                            <p className="text-yellow-700 text-sm">This condition requires ongoing monitoring or follow-up appointments.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => handleDownloadPDF(selectedVisit)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
                >
                  <i className="fas fa-download mr-1"></i>
                  {t.downloadPDF}
                </button>
                <button
                  onClick={() => setSelectedVisit(null)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-200"
                >
                  {t.closeDetails}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MedicalHistory;