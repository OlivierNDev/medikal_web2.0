import React, { useState, useEffect } from 'react';

function RecentNotifications({ patientId, language = 'en' }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, unread, read

  const translations = {
    en: {
      title: 'Recent Notifications',
      markAsRead: 'Mark as Read',
      markAllRead: 'Mark All as Read',
      delete: 'Delete',
      clearAll: 'Clear All',
      filterAll: 'All',
      filterUnread: 'Unread',
      filterRead: 'Read',
      appointmentReminder: 'Appointment Reminder',
      missedMedication: 'Missed Medication',
      labResultReady: 'Lab Result Available',
      aiInsight: 'AI Assistant Insight',
      systemUpdate: 'System Update',
      noNotifications: 'No notifications found',
      newNotification: 'New',
      timeAgo: {
        now: 'Just now',
        minute: '1 minute ago',
        minutes: 'minutes ago',
        hour: '1 hour ago',
        hours: 'hours ago',
        day: '1 day ago',
        days: 'days ago'
      }
    },
    rw: {
      title: 'Amakuru Agezweho',
      markAsRead: 'Shyira Nk\'Uwasomye',
      markAllRead: 'Shyira Byose Nk\'Uwasomye',
      delete: 'Gusiba',
      clearAll: 'Siba Byose',
      filterAll: 'Byose',
      filterUnread: 'Bitarasomwa',
      filterRead: 'Byasomwe',
      appointmentReminder: 'Kwibutsa Abandi',
      missedMedication: 'Umuti Wabuze',
      labResultReady: 'Ibizamini Biratangiye',
      aiInsight: 'Ubwenge bwa AI',
      systemUpdate: 'Amakuru ya Sisitemu',
      noNotifications: 'Nta makuru abonetse',
      newNotification: 'Gishya',
      timeAgo: {
        now: 'Ubu gusa',
        minute: 'Umunota 1 ushize',
        minutes: 'iminota ishize',
        hour: 'Isaha 1 ishize',
        hours: 'amasaha ashize',
        day: 'Umunsi 1 ushize',
        days: 'iminsi ishize'
      }
    },
    fr: {
      title: 'Notifications Récentes',
      markAsRead: 'Marquer comme Lu',
      markAllRead: 'Tout Marquer comme Lu',
      delete: 'Supprimer',
      clearAll: 'Tout Effacer',
      filterAll: 'Tout',
      filterUnread: 'Non Lu',
      filterRead: 'Lu',
      appointmentReminder: 'Rappel de Rendez-vous',
      missedMedication: 'Médicament Manqué',
      labResultReady: 'Résultats de Labo Disponibles',
      aiInsight: 'Insight Assistant IA',
      systemUpdate: 'Mise à Jour Système',
      noNotifications: 'Aucune notification trouvée',
      newNotification: 'Nouveau',
      timeAgo: {
        now: 'À l\'instant',
        minute: 'Il y a 1 minute',
        minutes: 'minutes',
        hour: 'Il y a 1 heure',
        hours: 'heures',
        day: 'Il y a 1 jour',
        days: 'jours'
      }
    }
  };

  const t = translations[language] || translations.en;

  useEffect(() => {
    const loadNotifications = async () => {
      setLoading(true);
      try {
        // Mock notifications data
        const now = new Date();
        const mockNotifications = [
          {
            id: 1,
            type: 'appointment',
            title: 'Appointment Tomorrow',
            message: 'Follow-up visit with Dr. Sarah Johnson tomorrow at 10:00 AM',
            timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
            read: false,
            priority: 'high',
            actionUrl: '/appointments'
          },
          {
            id: 2,
            type: 'medication',
            title: 'Missed Medication',
            message: 'You missed your 2:00 PM dose of Amoxicillin 500mg',
            timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000), // 4 hours ago
            read: false,
            priority: 'high',
            actionUrl: '/reminders'
          },
          {
            id: 3,
            type: 'lab_result',
            title: 'Lab Results Ready',
            message: 'Your blood test results from January 15th are now available',
            timestamp: new Date(now.getTime() - 6 * 60 * 60 * 1000), // 6 hours ago
            read: true,
            priority: 'medium',
            actionUrl: '/lab-results'
          },
          {
            id: 4,
            type: 'ai_insight',
            title: 'AI Health Insight',
            message: 'Based on your medication history, consider discussing antibiotic stewardship with your doctor',
            timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
            read: false,
            priority: 'medium',
            actionUrl: '/ai-assistant'
          },
          {
            id: 5,
            type: 'appointment',
            title: 'Appointment Confirmed',
            message: 'Your appointment with Dr. Michael Brown on January 20th has been confirmed',
            timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
            read: true,
            priority: 'low',
            actionUrl: '/appointments'
          },
          {
            id: 6,
            type: 'system',
            title: 'System Update',
            message: 'New features have been added to your patient portal. Explore medication reminders and AI insights!',
            timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
            read: true,
            priority: 'low',
            actionUrl: null
          }
        ];
        
        setNotifications(mockNotifications);
      } catch (error) {
        console.error('Error loading notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, [patientId]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'appointment': return 'fas fa-calendar-check text-blue-600';
      case 'medication': return 'fas fa-pills text-red-600';
      case 'lab_result': return 'fas fa-flask text-green-600';
      case 'ai_insight': return 'fas fa-robot text-purple-600';
      case 'system': return 'fas fa-cog text-gray-600';
      default: return 'fas fa-bell text-gray-600';
    }
  };

  const getNotificationColor = (type, priority, read) => {
    if (read) {
      return 'bg-gray-50 border-gray-200';
    }
    
    switch (priority) {
      case 'high': return 'bg-red-50 border-red-200';
      case 'medium': return 'bg-yellow-50 border-yellow-200';
      case 'low': return 'bg-blue-50 border-blue-200';
      default: return 'bg-white border-gray-200';
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return t.timeAgo.now;
    if (minutes === 1) return t.timeAgo.minute;
    if (minutes < 60) return `${minutes} ${t.timeAgo.minutes}`;
    if (hours === 1) return t.timeAgo.hour;
    if (hours < 24) return `${hours} ${t.timeAgo.hours}`;
    if (days === 1) return t.timeAgo.day;
    return `${days} ${t.timeAgo.days}`;
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev => prev.map(notification => 
      notification.id === notificationId 
        ? { ...notification, read: true }
        : notification
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
  };

  const handleDelete = (notificationId) => {
    setNotifications(prev => prev.filter(notification => notification.id !== notificationId));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([]);
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread': return !notification.read;
      case 'read': return notification.read;
      default: return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        <span className="ml-2 text-gray-600">Loading notifications...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          <i className="fas fa-bell text-purple-600 mr-2"></i>
          {t.title}
          {unreadCount > 0 && (
            <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </h2>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-full text-sm transition duration-200 ${
                filter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t.filterAll} ({notifications.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1 rounded-full text-sm transition duration-200 ${
                filter === 'unread' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t.filterUnread} ({unreadCount})
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-3 py-1 rounded-full text-sm transition duration-200 ${
                filter === 'read' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t.filterRead} ({notifications.length - unreadCount})
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0}
              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm transition duration-200"
            >
              <i className="fas fa-check-double mr-1"></i>
              {t.markAllRead}
            </button>
            <button
              onClick={handleClearAll}
              disabled={notifications.length === 0}
              className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm transition duration-200"
            >
              <i className="fas fa-trash mr-1"></i>
              {t.clearAll}
            </button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`border rounded-lg p-4 transition duration-200 hover:shadow-md ${getNotificationColor(notification.type, notification.priority, notification.read)}`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <i className={getNotificationIcon(notification.type)}></i>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className={`font-semibold ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                            {t.newNotification}
                          </span>
                        )}
                      </div>
                      <p className={`text-sm ${notification.read ? 'text-gray-500' : 'text-gray-700'} mb-2`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400">
                        <i className="fas fa-clock mr-1"></i>
                        {getTimeAgo(notification.timestamp)}
                      </p>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      {!notification.read && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                          title={t.markAsRead}
                        >
                          <i className="fas fa-check"></i>
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(notification.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                        title={t.delete}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                  
                  {notification.actionUrl && (
                    <div className="mt-3">
                      <button
                        onClick={() => console.log('Navigate to:', notification.actionUrl)}
                        className="text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition duration-200"
                      >
                        View Details
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <i className="fas fa-bell-slash text-3xl mb-2"></i>
            <p>
              {filter === 'all' ? t.noNotifications : 
               filter === 'unread' ? 'No unread notifications' : 
               'No read notifications'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentNotifications;