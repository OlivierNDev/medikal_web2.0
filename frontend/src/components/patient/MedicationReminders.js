import React, { useState, useEffect } from 'react';

function MedicationReminders({ patientId, language = 'en' }) {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [whatsappEnabled, setWhatsappEnabled] = useState(false);

  const translations = {
    en: {
      title: 'Medication Reminders',
      todayReminders: 'Today\'s Reminders',
      upcomingReminders: 'Upcoming Reminders',
      reminderSettings: 'Reminder Settings',
      enableSMS: 'Enable SMS Reminders',
      enableWhatsApp: 'Enable WhatsApp Reminders',
      markTaken: 'Mark as Taken',
      snooze: 'Snooze 15min',
      taken: 'Taken',
      pending: 'Pending',
      missed: 'Missed',
      noReminders: 'No reminders for today',
      timeTo: 'Time to take',
      dosage: 'Dosage',
      nextDose: 'Next dose',
      allCaught: 'All caught up! No pending reminders.'
    },
    rw: {
      title: 'Ibyibutsa by\'Imiti',
      todayReminders: 'Ibyibutsa bya None',
      upcomingReminders: 'Ibyibutsa Bizaza',
      reminderSettings: 'Igenamiterere ry\'Ibyibutsa',
      enableSMS: 'Emera Ibyibutsa bya SMS',
      enableWhatsApp: 'Emera Ibyibutsa bya WhatsApp',
      markTaken: 'Shyira Nk\'Uwafashe',
      snooze: 'Tegereza 15min',
      taken: 'Byafashwe',
      pending: 'Bitegereje',
      missed: 'Byabuze',
      noReminders: 'Nta byibutsa bya none',
      timeTo: 'Igihe cyo gufata',
      dosage: 'Igipimo',
      nextDose: 'Ikindi gipimo',
      allCaught: 'Byose birakomeye! Nta byibutsa bitegereje.'
    },
    fr: {
      title: 'Rappels de Médicaments',
      todayReminders: 'Rappels d\'Aujourd\'hui',
      upcomingReminders: 'Rappels à Venir',
      reminderSettings: 'Paramètres de Rappel',
      enableSMS: 'Activer les Rappels SMS',
      enableWhatsApp: 'Activer les Rappels WhatsApp',
      markTaken: 'Marquer comme Pris',
      snooze: 'Reporter 15min',
      taken: 'Pris',
      pending: 'En Attente',
      missed: 'Manqué',
      noReminders: 'Aucun rappel pour aujourd\'hui',
      timeTo: 'Il est temps de prendre',
      dosage: 'Dosage',
      nextDose: 'Prochaine dose',
      allCaught: 'Tout est à jour! Aucun rappel en attente.'
    }
  };

  const t = translations[language] || translations.en;

  useEffect(() => {
    const loadReminders = async () => {
      setLoading(true);
      try {
        // Mock today's reminders
        const now = new Date();
        const today = now.toDateString();
        
        const mockReminders = [
          {
            id: 1,
            medicationName: 'Amoxicillin',
            dosage: '500mg',
            scheduledTime: '08:00',
            scheduledDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 0),
            status: 'taken',
            instructions: 'Take with food'
          },
          {
            id: 2,
            medicationName: 'Amoxicillin',
            dosage: '500mg',
            scheduledTime: '14:00',
            scheduledDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 0),
            status: 'pending',
            instructions: 'Take with food'
          },
          {
            id: 3,
            medicationName: 'Amoxicillin',
            dosage: '500mg',
            scheduledTime: '20:00',
            scheduledDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 0),
            status: 'pending',
            instructions: 'Take with food'
          },
          {
            id: 4,
            medicationName: 'Paracetamol',
            dosage: '500mg',
            scheduledTime: '12:00',
            scheduledDateTime: new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0),
            status: 'missed',
            instructions: 'For pain relief as needed'
          }
        ];
        
        setReminders(mockReminders);
      } catch (error) {
        console.error('Error loading reminders:', error);
      } finally {
        setLoading(false);
      }
    };

    loadReminders();
  }, [patientId]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'taken': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'missed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'taken': return 'fas fa-check-circle text-green-600';
      case 'pending': return 'fas fa-clock text-yellow-600';
      case 'missed': return 'fas fa-exclamation-triangle text-red-600';
      default: return 'fas fa-question-circle text-gray-600';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'taken': return t.taken;
      case 'pending': return t.pending;
      case 'missed': return t.missed;
      default: return status;
    }
  };

  const handleMarkTaken = (reminderId) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === reminderId 
        ? { ...reminder, status: 'taken' }
        : reminder
    ));
  };

  const handleSnooze = (reminderId) => {
    // Simulate snoozing for 15 minutes
    console.log('Snoozing reminder for 15 minutes:', reminderId);
    alert('Reminder snoozed for 15 minutes');
  };

  const isReminderDue = (scheduledDateTime) => {
    const now = new Date();
    return scheduledDateTime <= now;
  };

  const todayReminders = reminders.filter(r => {
    const today = new Date().toDateString();
    return r.scheduledDateTime.toDateString() === today;
  });

  const pendingReminders = todayReminders.filter(r => r.status === 'pending');
  const upcomingReminders = pendingReminders.filter(r => !isReminderDue(r.scheduledDateTime));

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        <span className="ml-2 text-gray-600">Loading reminders...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          <i className="fas fa-bell text-purple-600 mr-2"></i>
          {t.title}
        </h2>
      </div>

      {/* Today's Reminders */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-blue-50 px-6 py-3 border-b border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800">
            <i className="fas fa-calendar-day mr-2"></i>
            {t.todayReminders} ({todayReminders.length})
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200">
          {todayReminders.length > 0 ? (
            todayReminders.map((reminder) => (
              <div key={reminder.id} className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      <i className={getStatusIcon(reminder.status)}></i>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {reminder.medicationName}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(reminder.status)}`}>
                          {getStatusText(reminder.status)}
                        </span>
                      </div>
                      
                      <div className="space-y-1 text-sm text-gray-600">
                        <div>
                          <i className="fas fa-pills mr-2 text-purple-500"></i>
                          <span className="font-medium">{t.dosage}:</span> {reminder.dosage}
                        </div>
                        <div>
                          <i className="fas fa-clock mr-2 text-blue-500"></i>
                          <span className="font-medium">Time:</span> {reminder.scheduledTime}
                          {isReminderDue(reminder.scheduledDateTime) && reminder.status === 'pending' && (
                            <span className="ml-2 text-red-600 font-medium animate-pulse">
                              (Due now!)
                            </span>
                          )}
                        </div>
                        {reminder.instructions && (
                          <div>
                            <i className="fas fa-info-circle mr-2 text-green-500"></i>
                            {reminder.instructions}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {reminder.status === 'pending' && (
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <button
                        onClick={() => handleMarkTaken(reminder.id)}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 text-sm"
                      >
                        <i className="fas fa-check mr-1"></i>
                        {t.markTaken}
                      </button>
                      <button
                        onClick={() => handleSnooze(reminder.id)}
                        className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-200 text-sm"
                      >
                        <i className="fas fa-clock mr-1"></i>
                        {t.snooze}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              <i className="fas fa-calendar-check text-3xl mb-2"></i>
              <p>{t.allCaught}</p>
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Reminders */}
      {upcomingReminders.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              <i className="fas fa-clock mr-2"></i>
              {t.upcomingReminders} ({upcomingReminders.length})
            </h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {upcomingReminders.map((reminder) => (
              <div key={`upcoming-${reminder.id}`} className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <i className="fas fa-clock text-gray-400"></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-gray-900">{reminder.medicationName}</span>
                        <span className="text-gray-600 ml-2">({reminder.dosage})</span>
                      </div>
                      <span className="text-sm text-gray-500">{reminder.scheduledTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reminder Settings */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="bg-purple-50 px-6 py-3 border-b border-purple-200">
          <h3 className="text-lg font-semibold text-purple-800">
            <i className="fas fa-cog mr-2"></i>
            {t.reminderSettings}
          </h3>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <i className="fas fa-sms text-green-600"></i>
              <span className="text-gray-700">{t.enableSMS}</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                checked={smsEnabled}
                onChange={(e) => setSmsEnabled(e.target.checked)}
              />
              <div className={`w-11 h-6 rounded-full transition-colors ${smsEnabled ? 'bg-green-600' : 'bg-gray-200'}`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${smsEnabled ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`}></div>
              </div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <i className="fab fa-whatsapp text-green-600"></i>
              <span className="text-gray-700">{t.enableWhatsApp}</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                checked={whatsappEnabled}
                onChange={(e) => setWhatsappEnabled(e.target.checked)}
              />
              <div className={`w-11 h-6 rounded-full transition-colors ${whatsappEnabled ? 'bg-green-600' : 'bg-gray-200'}`}>
                <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${whatsappEnabled ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`}></div>
              </div>
            </label>
          </div>
          
          {(smsEnabled || whatsappEnabled) && (
            <div className="mt-4 p-3 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-800">
                <i className="fas fa-info-circle mr-1"></i>
                Notification settings will be saved and applied to future reminders.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MedicationReminders;