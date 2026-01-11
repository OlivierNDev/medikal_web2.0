import React, { useState, useEffect } from 'react';

function PatientAppointments({ patientId, language = 'en' }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showReschedule, setShowReschedule] = useState(false);

  const translations = {
    en: {
      title: 'My Appointments',
      upcoming: 'Upcoming Appointments',
      past: 'Past Appointments',
      bookNew: 'Book New Appointment',
      appointmentDetails: 'Appointment Details',
      type: 'Type',
      date: 'Date',
      time: 'Time',
      location: 'Location',
      doctor: 'Doctor',
      status: 'Status',
      reschedule: 'Reschedule',
      cancel: 'Cancel',
      viewDetails: 'View Details',
      closeDetails: 'Close',
      confirmed: 'Confirmed',
      pending: 'Pending',
      cancelled: 'Cancelled',
      completed: 'Completed',
      followUp: 'Follow-up',
      newVisit: 'New Visit',
      consultation: 'Consultation',
      checkUp: 'Check-up',
      noUpcoming: 'No upcoming appointments',
      noPast: 'No past appointments',
      instructions: 'Instructions',
      preparation: 'Preparation Required'
    },
    rw: {
      title: 'Ibisabane Byanjye',
      upcoming: 'Ibisabane Bizaza',
      past: 'Ibisabane Byashize',
      bookNew: 'Gusaba Ikindi Gisabane',
      appointmentDetails: 'Amakuru y\'Igisabane',
      type: 'Ubwoko',
      date: 'Itariki',
      time: 'Igihe',
      location: 'Aho',
      doctor: 'Muganga',
      status: 'Imiterere',
      reschedule: 'Guhindura Igihe',
      cancel: 'Guhagarika',
      viewDetails: 'Reba Amakuru',
      closeDetails: 'Funga',
      confirmed: 'Byemejwe',
      pending: 'Bitegereje',
      cancelled: 'Byahagaritswe',
      completed: 'Byarangiye',
      followUp: 'Gukurikirana',
      newVisit: 'Ubusuzume Bushya',
      consultation: 'Ubusuzume',
      checkUp: 'Gusuzuma',
      noUpcoming: 'Nta bisabane bizaza',
      noPast: 'Nta bisabane byashize',
      instructions: 'Amategeko',
      preparation: 'Gwitegura Birakenewe'
    },
    fr: {
      title: 'Mes Rendez-vous',
      upcoming: 'Rendez-vous à Venir',
      past: 'Rendez-vous Passés',
      bookNew: 'Prendre Nouveau Rendez-vous',
      appointmentDetails: 'Détails du Rendez-vous',
      type: 'Type',
      date: 'Date',
      time: 'Heure',
      location: 'Lieu',
      doctor: 'Médecin',
      status: 'Statut',
      reschedule: 'Reporter',
      cancel: 'Annuler',
      viewDetails: 'Voir Détails',
      closeDetails: 'Fermer',
      confirmed: 'Confirmé',
      pending: 'En Attente',
      cancelled: 'Annulé',
      completed: 'Terminé',
      followUp: 'Suivi',
      newVisit: 'Nouvelle Visite',
      consultation: 'Consultation',
      checkUp: 'Contrôle',
      noUpcoming: 'Aucun rendez-vous à venir',
      noPast: 'Aucun rendez-vous passé',
      instructions: 'Instructions',
      preparation: 'Préparation Requise'
    }
  };

  const t = translations[language] || translations.en;

  useEffect(() => {
    const loadAppointments = async () => {
      setLoading(true);
      try {
        // Mock appointments data
        const now = new Date();
        const mockAppointments = [
          {
            id: 1,
            type: 'follow-up',
            title: 'Follow-up Visit',
            date: new Date(now.getTime() + 24 * 60 * 60 * 1000), // Tomorrow
            location: 'Kigali Hospital - Room 205',
            doctor: 'Dr. Sarah Johnson',
            status: 'confirmed',
            instructions: 'Please bring your previous medical reports and current medications list.',
            preparation: 'Fasting not required. Take your regular medications.',
            duration: '30 minutes',
            reminder: true,
            notes: 'Follow-up for respiratory infection treatment'
          },
          {
            id: 2,
            type: 'consultation',
            title: 'General Consultation',
            date: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000), // Next week
            location: 'Kigali Hospital - Room 101',
            doctor: 'Dr. Michael Brown',
            status: 'pending',
            instructions: 'Please arrive 15 minutes early for registration.',
            preparation: 'No special preparation required.',
            duration: '45 minutes',
            reminder: true,
            notes: 'Routine health check-up'
          },
          {
            id: 3,
            type: 'check-up',
            title: 'Hypertension Check-up',
            date: new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000), // 2 weeks
            location: 'Kigali Hospital - Room 301',
            doctor: 'Dr. Sarah Johnson',
            status: 'confirmed',
            instructions: 'Monitor blood pressure at home and bring the log.',
            preparation: 'Take medications as usual. Avoid caffeine 2 hours before appointment.',
            duration: '20 minutes',
            reminder: true,
            notes: 'Regular monitoring for hypertension management'
          },
          {
            id: 4,
            type: 'follow-up',
            title: 'Treatment Follow-up',
            date: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), // Last week
            location: 'Kigali Hospital - Room 205',
            doctor: 'Dr. Sarah Johnson',
            status: 'completed',
            instructions: 'Discussed treatment progress and medication adjustments.',
            preparation: 'Completed',
            duration: '25 minutes',
            reminder: false,
            notes: 'Antibiotic treatment completed successfully'
          },
          {
            id: 5,
            type: 'consultation',
            title: 'Gastritis Consultation',
            date: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000), // Last month
            location: 'Kigali Hospital - Room 102',
            doctor: 'Dr. Michael Brown',
            status: 'completed',
            instructions: 'Prescribed medication and dietary recommendations provided.',
            preparation: 'Completed',
            duration: '40 minutes',
            reminder: false,
            notes: 'Stress-related gastritis treatment initiated'
          }
        ];
        
        setAppointments(mockAppointments);
      } catch (error) {
        console.error('Error loading appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAppointments();
  }, [patientId]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return t.confirmed;
      case 'pending': return t.pending;
      case 'cancelled': return t.cancelled;
      case 'completed': return t.completed;
      default: return status;
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case 'follow-up': return t.followUp;
      case 'new-visit': return t.newVisit;
      case 'consultation': return t.consultation;
      case 'check-up': return t.checkUp;
      default: return type;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'follow-up': return 'fas fa-redo text-blue-600';
      case 'new-visit': return 'fas fa-plus text-green-600';
      case 'consultation': return 'fas fa-stethoscope text-purple-600';
      case 'check-up': return 'fas fa-heart text-red-600';
      default: return 'fas fa-calendar text-gray-600';
    }
  };

  const isUpcoming = (date) => {
    return date > new Date();
  };

  const handleReschedule = (appointment) => {
    console.log('Reschedule appointment:', appointment.id);
    alert(`Reschedule request for ${appointment.title} has been submitted.`);
  };

  const handleCancel = (appointment) => {
    if (window.confirm(`Are you sure you want to cancel ${appointment.title}?`)) {
      setAppointments(prev => prev.map(app => 
        app.id === appointment.id 
          ? { ...app, status: 'cancelled' }
          : app
      ));
      alert(`${appointment.title} has been cancelled.`);
    }
  };

  const handleBookNew = () => {
    console.log('Open appointment booking modal');
    alert('Opening appointment booking form...');
  };

  const upcomingAppointments = appointments.filter(app => isUpcoming(app.date) && app.status !== 'cancelled');
  const pastAppointments = appointments.filter(app => !isUpcoming(app.date) || app.status === 'cancelled');

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        <span className="ml-2 text-gray-600">Loading appointments...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          <i className="fas fa-calendar-alt text-purple-600 mr-2"></i>
          {t.title}
        </h2>
        <button
          onClick={handleBookNew}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition duration-200"
        >
          <i className="fas fa-plus mr-1"></i>
          {t.bookNew}
        </button>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-blue-50 px-6 py-3 border-b border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800">
            <i className="fas fa-calendar-day mr-2"></i>
            {t.upcoming} ({upcomingAppointments.length})
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="p-6 hover:bg-gray-50">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      <i className={getTypeIcon(appointment.type)}></i>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {appointment.title}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {getStatusText(appointment.status)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
                        <div>
                          <i className="fas fa-calendar mr-1 text-blue-500"></i>
                          <span className="font-medium">{t.date}:</span> {appointment.date.toLocaleDateString()}
                        </div>
                        <div>
                          <i className="fas fa-clock mr-1 text-green-500"></i>
                          <span className="font-medium">{t.time}:</span> {appointment.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                        <div>
                          <i className="fas fa-user-md mr-1 text-purple-500"></i>
                          <span className="font-medium">{t.doctor}:</span> {appointment.doctor}
                        </div>
                      </div>

                      <div className="text-sm text-gray-600">
                        <div className="mb-1">
                          <i className="fas fa-map-marker-alt mr-1 text-red-500"></i>
                          <span className="font-medium">{t.location}:</span> {appointment.location}
                        </div>
                        <div>
                          <i className="fas fa-hourglass-half mr-1 text-orange-500"></i>
                          <span className="font-medium">Duration:</span> {appointment.duration}
                        </div>
                      </div>

                      {appointment.instructions && (
                        <div className="mt-3 p-3 bg-yellow-50 rounded-md">
                          <p className="text-sm text-yellow-800">
                            <i className="fas fa-info-circle mr-1"></i>
                            <strong>{t.instructions}:</strong> {appointment.instructions}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <button
                      onClick={() => setSelectedAppointment(appointment)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 text-sm"
                    >
                      <i className="fas fa-eye mr-1"></i>
                      {t.viewDetails}
                    </button>
                    <button
                      onClick={() => handleReschedule(appointment)}
                      className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-200 text-sm"
                    >
                      <i className="fas fa-calendar-times mr-1"></i>
                      {t.reschedule}
                    </button>
                    <button
                      onClick={() => handleCancel(appointment)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 text-sm"
                    >
                      <i className="fas fa-times mr-1"></i>
                      {t.cancel}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              <i className="fas fa-calendar-times text-3xl mb-2"></i>
              <p>{t.noUpcoming}</p>
            </div>
          )}
        </div>
      </div>

      {/* Past Appointments */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            <i className="fas fa-history mr-2"></i>
            {t.past} ({pastAppointments.length})
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {pastAppointments.length > 0 ? (
            pastAppointments.slice(0, 5).map((appointment) => (
              <div key={appointment.id} className="p-6 hover:bg-gray-50">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      <i className={getTypeIcon(appointment.type)}></i>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {appointment.title}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {getStatusText(appointment.status)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div>
                          <i className="fas fa-calendar mr-1 text-blue-500"></i>
                          <span className="font-medium">{t.date}:</span> {appointment.date.toLocaleDateString()}
                        </div>
                        <div>
                          <i className="fas fa-user-md mr-1 text-purple-500"></i>
                          <span className="font-medium">{t.doctor}:</span> {appointment.doctor}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedAppointment(appointment)}
                      className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition duration-200 text-sm"
                    >
                      <i className="fas fa-eye mr-1"></i>
                      {t.viewDetails}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              <i className="fas fa-calendar-check text-3xl mb-2"></i>
              <p>{t.noPast}</p>
            </div>
          )}
        </div>
      </div>

      {/* Appointment Details Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">{t.appointmentDetails}</h2>
                  <p className="text-blue-100">{selectedAppointment.title}</p>
                </div>
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="text-blue-100 hover:text-white transition duration-200"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800">{t.type}</h4>
                      <p className="text-gray-600">{getTypeText(selectedAppointment.type)}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{t.date}</h4>
                      <p className="text-gray-600">{selectedAppointment.date.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{t.time}</h4>
                      <p className="text-gray-600">{selectedAppointment.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{t.status}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedAppointment.status)}`}>
                        {getStatusText(selectedAppointment.status)}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800">{t.doctor}</h4>
                      <p className="text-gray-600">{selectedAppointment.doctor}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{t.location}</h4>
                      <p className="text-gray-600">{selectedAppointment.location}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Duration</h4>
                      <p className="text-gray-600">{selectedAppointment.duration}</p>
                    </div>
                  </div>
                </div>
                
                {selectedAppointment.instructions && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">{t.instructions}</h4>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800">{selectedAppointment.instructions}</p>
                    </div>
                  </div>
                )}
                
                {selectedAppointment.preparation && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">{t.preparation}</h4>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-green-800">{selectedAppointment.preparation}</p>
                    </div>
                  </div>
                )}
                
                {selectedAppointment.notes && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Notes</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">{selectedAppointment.notes}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                {isUpcoming(selectedAppointment.date) && selectedAppointment.status !== 'cancelled' && (
                  <>
                    <button
                      onClick={() => {
                        handleReschedule(selectedAppointment);
                        setSelectedAppointment(null);
                      }}
                      className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-200"
                    >
                      <i className="fas fa-calendar-times mr-1"></i>
                      {t.reschedule}
                    </button>
                    <button
                      onClick={() => {
                        handleCancel(selectedAppointment);
                        setSelectedAppointment(null);
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
                    >
                      <i className="fas fa-times mr-1"></i>
                      {t.cancel}
                    </button>
                  </>
                )}
                <button
                  onClick={() => setSelectedAppointment(null)}
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

export default PatientAppointments;