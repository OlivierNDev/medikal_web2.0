import React, { useState, useEffect } from 'react';

function LabResults({ patientId, language = 'en' }) {
  const [labResults, setLabResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedResult, setSelectedResult] = useState(null);
  const [filter, setFilter] = useState('all'); // all, pending, completed

  const translations = {
    en: {
      title: 'Lab Results',
      newResults: 'New Results Available',
      allResults: 'All Lab Results',
      pendingResults: 'Pending Results',
      testName: 'Test Name',
      date: 'Date Ordered',
      status: 'Status',
      actions: 'Actions',
      viewResult: 'View Result',
      downloadPDF: 'Download PDF',
      pending: 'Pending',
      completed: 'Completed',
      critical: 'Critical',
      normal: 'Normal',
      abnormal: 'Abnormal',
      noResults: 'No lab results found',
      resultDetails: 'Test Result Details',
      closeDetails: 'Close',
      orderedBy: 'Ordered by',
      resultValue: 'Result',
      referenceRange: 'Reference Range',
      interpretation: 'Interpretation',
      notes: 'Notes',
      amrAlert: 'AMR Alert',
      resistanceDetected: 'Resistance Detected',
      filterAll: 'All',
      filterPending: 'Pending',
      filterCompleted: 'Completed'
    },
    rw: {
      title: 'Ibisubizo by\'Ibizamini',
      newResults: 'Ibisubizo bishya birahari',
      allResults: 'Ibisubizo byose by\'Ibizamini',
      pendingResults: 'Ibisubizo bitegereje',
      testName: 'Izina ry\'Ikizamini',
      date: 'Itariki yasabwe',
      status: 'Imiterere',
      actions: 'Ibikorwa',
      viewResult: 'Reba Igisubizo',
      downloadPDF: 'Kuramo PDF',
      pending: 'Bitegereje',
      completed: 'Byarangiye',
      critical: 'Birimbuzi',
      normal: 'Bisanzuye',
      abnormal: 'Bidacunguye',
      noResults: 'Nta bisubizo by\'ibizamini bibonetse',
      resultDetails: 'Amakuru y\'Igisubizo cy\'Ikizamini',
      closeDetails: 'Funga',
      orderedBy: 'Yatanzwe na',
      resultValue: 'Igisubizo',
      referenceRange: 'Igipimo cyiza',
      interpretation: 'Isobanuro',
      notes: 'Inyandiko',
      amrAlert: 'Iburira bya AMR',
      resistanceDetected: 'Kurwanya Kwabonetse',
      filterAll: 'Byose',
      filterPending: 'Bitegereje',
      filterCompleted: 'Byarangiye'
    },
    fr: {
      title: 'Résultats de Laboratoire',
      newResults: 'Nouveaux Résultats Disponibles',
      allResults: 'Tous les Résultats de Labo',
      pendingResults: 'Résultats en Attente',
      testName: 'Nom du Test',
      date: 'Date Commandée',
      status: 'Statut',
      actions: 'Actions',
      viewResult: 'Voir Résultat',
      downloadPDF: 'Télécharger PDF',
      pending: 'En Attente',
      completed: 'Terminé',
      critical: 'Critique',
      normal: 'Normal',
      abnormal: 'Anormal',
      noResults: 'Aucun résultat de laboratoire trouvé',
      resultDetails: 'Détails du Résultat de Test',
      closeDetails: 'Fermer',
      orderedBy: 'Commandé par',
      resultValue: 'Résultat',
      referenceRange: 'Plage de Référence',
      interpretation: 'Interprétation',
      notes: 'Notes',
      amrAlert: 'Alerte RAM',
      resistanceDetected: 'Résistance Détectée',
      filterAll: 'Tout',
      filterPending: 'En Attente',
      filterCompleted: 'Terminé'
    }
  };

  const t = translations[language] || translations.en;

  useEffect(() => {
    const loadLabResults = async () => {
      setLoading(true);
      try {
        // Mock lab results data
        const mockResults = [
          {
            id: 1,
            testName: 'Complete Blood Count (CBC)',
            orderDate: '2024-01-15',
            completedDate: '2024-01-16',
            status: 'completed',
            priority: 'normal',
            orderedBy: 'Dr. Sarah Johnson',
            results: [
              { parameter: 'White Blood Cells', value: '7.2', unit: '10^3/μL', range: '4.5-11.0', status: 'normal' },
              { parameter: 'Red Blood Cells', value: '4.8', unit: '10^6/μL', range: '4.5-5.5', status: 'normal' },
              { parameter: 'Hemoglobin', value: '14.2', unit: 'g/dL', range: '12.0-15.5', status: 'normal' },
              { parameter: 'Platelets', value: '280', unit: '10^3/μL', range: '150-450', status: 'normal' }
            ],
            interpretation: 'All blood parameters are within normal limits. No signs of infection or anemia.',
            notes: 'Follow-up CBC in 6 months if no symptoms develop.',
            amrRelated: false,
            category: 'Hematology'
          },
          {
            id: 2,
            testName: 'Culture & Sensitivity - Urine',
            orderDate: '2024-01-14',
            completedDate: '2024-01-17',
            status: 'completed',
            priority: 'critical',
            orderedBy: 'Dr. Michael Brown',
            results: [
              { parameter: 'Organism', value: 'E. coli', unit: '', range: 'No growth expected', status: 'abnormal' },
              { parameter: 'Colony Count', value: '>100,000', unit: 'CFU/mL', range: '<10,000', status: 'abnormal' },
              { parameter: 'Ampicillin', value: 'Resistant', unit: '', range: 'Sensitive', status: 'resistant' },
              { parameter: 'Ciprofloxacin', value: 'Sensitive', unit: '', range: 'Sensitive', status: 'sensitive' },
              { parameter: 'Nitrofurantoin', value: 'Sensitive', unit: '', range: 'Sensitive', status: 'sensitive' }
            ],
            interpretation: 'Urinary tract infection with E. coli. Organism shows resistance to Ampicillin but sensitive to Ciprofloxacin and Nitrofurantoin.',
            notes: 'AMR Alert: Ampicillin resistance detected. Consider alternative antibiotics. Patient was treated with Ciprofloxacin successfully.',
            amrRelated: true,
            resistanceDetected: true,
            category: 'Microbiology'
          },
          {
            id: 3,
            testName: 'Liver Function Tests',
            orderDate: '2024-01-10',
            completedDate: '2024-01-11',
            status: 'completed',
            priority: 'normal',
            orderedBy: 'Dr. Sarah Johnson',
            results: [
              { parameter: 'ALT (SGPT)', value: '25', unit: 'U/L', range: '7-45', status: 'normal' },
              { parameter: 'AST (SGOT)', value: '22', unit: 'U/L', range: '8-40', status: 'normal' },
              { parameter: 'Bilirubin Total', value: '0.8', unit: 'mg/dL', range: '0.3-1.2', status: 'normal' },
              { parameter: 'Alkaline Phosphatase', value: '68', unit: 'U/L', range: '44-147', status: 'normal' }
            ],
            interpretation: 'Liver function tests are normal. No evidence of hepatic dysfunction.',
            notes: 'Continue current medications. No liver toxicity observed.',
            amrRelated: false,
            category: 'Chemistry'
          },
          {
            id: 4,
            testName: 'Blood Glucose Test',
            orderDate: '2024-01-20',
            completedDate: null,
            status: 'pending',
            priority: 'normal',
            orderedBy: 'Dr. Sarah Johnson',
            results: [],
            interpretation: 'Test results pending. Please check back in 24-48 hours.',
            notes: 'Fasting blood glucose test ordered to monitor diabetes management.',
            amrRelated: false,
            category: 'Chemistry'
          },
          {
            id: 5,
            testName: 'Chest X-Ray',
            orderDate: '2024-01-18',
            completedDate: null,
            status: 'pending',
            priority: 'normal',
            orderedBy: 'Dr. Michael Brown',
            results: [],
            interpretation: 'Imaging results pending review by radiologist.',
            notes: 'Chest X-ray ordered to rule out pneumonia. Results expected within 24 hours.',
            amrRelated: false,
            category: 'Radiology'
          }
        ];
        
        setLabResults(mockResults);
      } catch (error) {
        console.error('Error loading lab results:', error);
      } finally {
        setLoading(false);
      }
    };

    loadLabResults();
  }, [patientId]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'urgent': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'normal': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getResultStatusColor = (status) => {
    switch (status) {
      case 'normal': return 'text-green-600';
      case 'abnormal': return 'text-red-600';
      case 'critical': return 'text-red-800 font-bold';
      case 'resistant': return 'text-red-600 font-bold';
      case 'sensitive': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return t.completed;
      case 'pending': return t.pending;
      case 'critical': return t.critical;
      default: return status;
    }
  };

  const handleViewResult = (result) => {
    setSelectedResult(result);
  };

  const handleDownloadPDF = (result) => {
    console.log('Downloading lab result PDF for:', result.testName);
    alert(`Downloading ${result.testName} results as PDF`);
  };

  const filteredResults = labResults.filter(result => {
    switch (filter) {
      case 'pending': return result.status === 'pending';
      case 'completed': return result.status === 'completed';
      default: return true;
    }
  });

  const newResults = labResults.filter(r => r.status === 'completed' && 
    new Date(r.completedDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)); // Last 7 days

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        <span className="ml-2 text-gray-600">Loading lab results...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          <i className="fas fa-flask text-purple-600 mr-2"></i>
          {t.title}
        </h2>
      </div>

      {/* New Results Alert */}
      {newResults.length > 0 && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md">
          <div className="flex">
            <i className="fas fa-check-circle text-green-400 mt-1 mr-3"></i>
            <div>
              <h3 className="text-green-800 font-medium">{t.newResults}</h3>
              <p className="text-green-700 text-sm">
                You have {newResults.length} new lab result{newResults.length > 1 ? 's' : ''} from the past week.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-sm transition duration-200 ${
              filter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t.filterAll} ({labResults.length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1 rounded-full text-sm transition duration-200 ${
              filter === 'completed' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t.filterCompleted} ({labResults.filter(r => r.status === 'completed').length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1 rounded-full text-sm transition duration-200 ${
              filter === 'pending' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t.filterPending} ({labResults.filter(r => r.status === 'pending').length})
          </button>
        </div>
      </div>

      {/* Lab Results List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-blue-50 px-6 py-3 border-b border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800">
            <i className="fas fa-list mr-2"></i>
            {t.allResults} ({filteredResults.length})
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredResults.length > 0 ? (
            filteredResults.map((result) => (
              <div key={result.id} className="p-6 hover:bg-gray-50">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-lg font-semibold text-gray-900">
                        {result.testName}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                        {getStatusText(result.status)}
                      </span>
                      {result.priority === 'critical' && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <i className="fas fa-exclamation-triangle mr-1"></i>
                          {t.critical}
                        </span>
                      )}
                      {result.amrRelated && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          <i className="fas fa-shield-virus mr-1"></i>
                          {t.amrAlert}
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <i className="fas fa-calendar mr-1 text-blue-500"></i>
                        <span className="font-medium">{t.date}:</span> {new Date(result.orderDate).toLocaleDateString()}
                      </div>
                      <div>
                        <i className="fas fa-user-md mr-1 text-purple-500"></i>
                        <span className="font-medium">{t.orderedBy}:</span> {result.orderedBy}
                      </div>
                      <div>
                        <i className="fas fa-tag mr-1 text-green-500"></i>
                        <span className="font-medium">Category:</span> {result.category}
                      </div>
                    </div>

                    {result.completedDate && (
                      <div className="text-sm text-gray-600 mb-2">
                        <i className="fas fa-check mr-1 text-green-500"></i>
                        <span className="font-medium">Completed:</span> {new Date(result.completedDate).toLocaleDateString()}
                      </div>
                    )}

                    {result.resistanceDetected && (
                      <div className="bg-red-50 border-l-4 border-red-400 p-3 mb-3">
                        <div className="flex">
                          <i className="fas fa-exclamation-triangle text-red-400 mt-0.5 mr-2"></i>
                          <div>
                            <h5 className="text-red-800 font-medium text-sm">{t.resistanceDetected}</h5>
                            <p className="text-red-700 text-xs">Antibiotic resistance patterns detected in this test.</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <button
                      onClick={() => handleViewResult(result)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 text-sm"
                    >
                      <i className="fas fa-eye mr-1"></i>
                      {t.viewResult}
                    </button>
                    {result.status === 'completed' && (
                      <button
                        onClick={() => handleDownloadPDF(result)}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 text-sm"
                      >
                        <i className="fas fa-download mr-1"></i>
                        {t.downloadPDF}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              <i className="fas fa-flask text-3xl mb-2"></i>
              <p>{t.noResults}</p>
            </div>
          )}
        </div>
      </div>

      {/* Result Details Modal */}
      {selectedResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">{t.resultDetails}</h2>
                  <p className="text-blue-100">{selectedResult.testName}</p>
                </div>
                <button
                  onClick={() => setSelectedResult(null)}
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
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Test Information</h3>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Test Name:</span> {selectedResult.testName}</div>
                      <div><span className="font-medium">Category:</span> {selectedResult.category}</div>
                      <div><span className="font-medium">Order Date:</span> {new Date(selectedResult.orderDate).toLocaleDateString()}</div>
                      {selectedResult.completedDate && (
                        <div><span className="font-medium">Completed Date:</span> {new Date(selectedResult.completedDate).toLocaleDateString()}</div>
                      )}
                      <div><span className="font-medium">{t.orderedBy}:</span> {selectedResult.orderedBy}</div>
                      <div>
                        <span className="font-medium">{t.status}:</span> 
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedResult.status)}`}>
                          {getStatusText(selectedResult.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Results Table */}
                {selectedResult.results && selectedResult.results.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Test Results</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parameter</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.resultValue}</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.referenceRange}</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t.status}</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {selectedResult.results.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.parameter}</td>
                              <td className={`px-4 py-3 text-sm font-medium ${getResultStatusColor(item.status)}`}>
                                {item.value}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">{item.unit}</td>
                              <td className="px-4 py-3 text-sm text-gray-600">{item.range}</td>
                              <td className="px-4 py-3 text-sm">
                                <span className={`font-medium ${getResultStatusColor(item.status)}`}>
                                  {item.status === 'resistant' && <i className="fas fa-exclamation-triangle mr-1"></i>}
                                  {item.status === 'sensitive' && <i className="fas fa-check mr-1"></i>}
                                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Interpretation */}
                {selectedResult.interpretation && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">{t.interpretation}</h3>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800">{selectedResult.interpretation}</p>
                    </div>
                  </div>
                )}

                {/* Notes */}
                {selectedResult.notes && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">{t.notes}</h3>
                    <div className={`p-4 rounded-lg ${selectedResult.amrRelated ? 'bg-orange-50' : 'bg-gray-50'}`}>
                      <p className={selectedResult.amrRelated ? 'text-orange-800' : 'text-gray-700'}>
                        {selectedResult.amrRelated && <i className="fas fa-shield-virus mr-2"></i>}
                        {selectedResult.notes}
                      </p>
                    </div>
                  </div>
                )}

                {/* AMR Alert */}
                {selectedResult.resistanceDetected && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <div className="flex">
                      <i className="fas fa-exclamation-triangle text-red-400 mt-1 mr-3"></i>
                      <div>
                        <h4 className="text-red-800 font-medium">{t.amrAlert}: {t.resistanceDetected}</h4>
                        <p className="text-red-700 text-sm mt-1">
                          This test shows antibiotic resistance patterns. Healthcare providers should consider 
                          alternative treatment options and follow antimicrobial stewardship guidelines.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="mt-6 flex justify-end space-x-3">
                {selectedResult.status === 'completed' && (
                  <button
                    onClick={() => handleDownloadPDF(selectedResult)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
                  >
                    <i className="fas fa-download mr-1"></i>
                    {t.downloadPDF}
                  </button>
                )}
                <button
                  onClick={() => setSelectedResult(null)}
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

export default LabResults;