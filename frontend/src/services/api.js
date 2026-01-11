import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || '/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (username, password) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    
    const response = await api.post('/api/auth/login', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  },

  patientRegister: async (patientData) => {
    const response = await api.post('/api/auth/patient/register', patientData);
    return response.data;
  },

  adminCreateUser: async (userData) => {
    const response = await api.post('/api/auth/admin/create-user', userData);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/api/auth/me');
    return response.data;
  },

  changePassword: async (passwordData) => {
    const response = await api.post('/api/auth/change-password', passwordData);
    return response.data;
  },

  logout: async () => {
    const response = await api.post('/api/auth/logout');
    return response.data;
  },

  // Admin endpoints
  getAllUsers: async () => {
    const response = await api.get('/api/auth/admin/users');
    return response.data;
  },

  resetPassword: async (userId) => {
    const response = await api.post(`/api/auth/admin/reset-password/${userId}`);
    return response.data;
  },
};

// Patient Registry API
export const patientRegistryAPI = {
  // Register new patient (authenticated)
  register: async (patientData) => {
    const response = await api.post('/api/patients/register', patientData);
    return response.data;
  },

  // Public patient registration (no authentication required)
  publicRegister: async (patientData) => {
    const response = await api.post('/api/patients/public-register', patientData);
    return response.data;
  },

  // Get paginated patient list
  getList: async (page = 1, limit = 20) => {
    const response = await api.get(`/api/patients/list?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Search patients
  search: async (query, searchBy = 'name', limit = 20) => {
    const response = await api.get(`/api/patients/search?query=${query}&search_by=${searchBy}&limit=${limit}`);
    return response.data;
  },

  // Get patient details
  getById: async (id) => {
    const response = await api.get(`/api/patients/${id}`);
    return response.data;
  },

  // Update patient
  update: async (id, patientData) => {
    const response = await api.put(`/api/patients/${id}`, patientData);
    return response.data;
  },

  // Delete patient (admin only)
  delete: async (id) => {
    const response = await api.delete(`/api/patients/${id}`);
    return response.data;
  },

  // Visit management
  createVisit: async (patientId, visitData) => {
    const response = await api.post(`/api/patients/${patientId}/visits`, visitData);
    return response.data;
  },

  // Get patient visits
  getVisits: async (patientId, limit = 10) => {
    const response = await api.get(`/api/patients/${patientId}/visits?limit=${limit}`);
    return response.data;
  },

  // Export patient PDF
  exportPDF: async (patientId, includeVisits = true, includeLabResults = true) => {
    const response = await api.get(`/api/patients/${patientId}/export-pdf?include_visits=${includeVisits}&include_lab_results=${includeLabResults}`);
    return response.data;
  },
};

// Keep backward compatibility
export const patientAPI = patientRegistryAPI;

// Appointment Management API
export const appointmentAPI = {
  // Hospital management
  getHospitals: async (page = 1, limit = 20) => {
    const response = await api.get(`/api/appointments/hospitals?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Doctor management
  getDoctors: async (hospitalId = null, specialization = null, page = 1, limit = 20) => {
    let url = `/api/appointments/doctors?page=${page}&limit=${limit}`;
    if (hospitalId) url += `&hospital_id=${hospitalId}`;
    if (specialization) url += `&specialization=${specialization}`;
    const response = await api.get(url);
    return response.data;
  },

  // Appointment management
  createAppointment: async (appointmentData) => {
    const response = await api.post('/api/appointments/appointments', appointmentData);
    return response.data;
  },

  getAppointments: async (patientId = null, doctorId = null, status = null, page = 1, limit = 20) => {
    let url = `/api/appointments/appointments?page=${page}&limit=${limit}`;
    if (patientId) url += `&patient_id=${patientId}`;
    if (doctorId) url += `&doctor_id=${doctorId}`;
    if (status) url += `&status=${status}`;
    const response = await api.get(url);
    return response.data;
  },

  getUpcomingAppointments: async (daysAhead = 7) => {
    const response = await api.get(`/api/appointments/appointments/upcoming?days_ahead=${daysAhead}`);
    return response.data;
  },

  updateAppointment: async (appointmentId, updateData) => {
    const response = await api.put(`/api/appointments/appointments/${appointmentId}`, updateData);
    return response.data;
  },

  // Reminder management
  createReminder: async (reminderData) => {
    const response = await api.post('/api/appointments/reminders', reminderData);
    return response.data;
  },

  getPendingReminders: async () => {
    const response = await api.get('/api/appointments/reminders/pending');
    return response.data;
  },

  markReminderSent: async (reminderId) => {
    const response = await api.put(`/api/appointments/reminders/${reminderId}/mark-sent`);
    return response.data;
  }
};

// Consultation API
export const consultationAPI = {
  create: async (consultationData) => {
    const response = await api.post('/api/consultations', consultationData);
    return response.data;
  },

  getPatientConsultations: async (patientId) => {
    const response = await api.get(`/api/consultations/patient/${patientId}`);
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/api/consultations/${id}`);
    return response.data;
  },

  update: async (id, consultationData) => {
    const response = await api.put(`/api/consultations/${id}`, consultationData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/api/consultations/${id}`);
    return response.data;
  },
};

// AI API
export const aiAPI = {
  getDiagnosis: async (diagnosisData) => {
    const response = await api.post('/api/ai/diagnosis', diagnosisData);
    return response.data;
  },

  chat: async (message, sessionId, patientId = null, language = 'en') => {
    const response = await api.post('/api/ai/chat', {
      message,
      session_id: sessionId,
      patient_id: patientId,
      language,
    });
    return response.data;
  },

  analyzeSkinImage: async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    
    const response = await api.post('/api/ai/skin-analysis', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getChatHistory: async (sessionId) => {
    const response = await api.get(`/api/ai/chat/history/${sessionId}`);
    return response.data;
  },

  getAMRRisk: async (patientId) => {
    const response = await api.get(`/api/ai/amr/risk/${patientId}`);
    return response.data;
  },
};

// Labs API (NEW)
export const labsAPI = {
  getAST: async (patientId) => {
    const response = await api.get(`/api/labs/ast${patientId ? `?patient_id=${patientId}` : ''}`);
    return response.data;
  },

  getPatientResults: async (patientId, status = null, testType = null) => {
    let url = `/api/labs/results/${patientId}`;
    const params = [];
    if (status) params.push(`status=${status}`);
    if (testType) params.push(`test_type=${testType}`);
    if (params.length) url += `?${params.join('&')}`;
    const response = await api.get(url);
    return response.data;
  },

  getResistancePatterns: async () => {
    const response = await api.get('/api/labs/resistance-patterns');
    return response.data;
  },

  createLabResult: async (labData) => {
    const response = await api.post('/api/labs/results', labData);
    return response.data;
  },
};

// Dashboard API (NEW)
export const dashboardAPI = {
  getMetrics: async (period = '30d') => {
    const response = await api.get(`/api/dashboard/metrics?period=${period}`);
    return response.data;
  },

  getTrends: async (metricType = 'all', period = '30d') => {
    const response = await api.get(`/api/dashboard/trends?metric_type=${metricType}&period=${period}`);
    return response.data;
  },

  getAMRAlerts: async (severity = null) => {
    const response = await api.get(`/api/dashboard/amr-alerts${severity ? `?severity=${severity}` : ''}`);
    return response.data;
  },

  getWHOAwareStats: async (period = '30d') => {
    const response = await api.get(`/api/dashboard/who-aware-stats?period=${period}`);
    return response.data;
  },

  getRegionalPatterns: async () => {
    const response = await api.get('/api/dashboard/regional-patterns');
    return response.data;
  },
};

// Notifications API (NEW)
export const notificationsAPI = {
  getAll: async (patientId = null, status = null, type = null, limit = 20) => {
    let url = `/api/notifications?limit=${limit}`;
    if (patientId) url += `&patient_id=${patientId}`;
    if (status) url += `&status=${status}`;
    if (type) url += `&type=${type}`;
    const response = await api.get(url);
    return response.data;
  },

  create: async (notificationData) => {
    const response = await api.post('/api/notifications', notificationData);
    return response.data;
  },

  markAsRead: async (notificationId) => {
    const response = await api.put(`/api/notifications/${notificationId}/read`);
    return response.data;
  },

  markAllAsRead: async (patientId = null) => {
    const response = await api.put(`/api/notifications/mark-all-read${patientId ? `?patient_id=${patientId}` : ''}`);
    return response.data;
  },

  delete: async (notificationId) => {
    const response = await api.delete(`/api/notifications/${notificationId}`);
    return response.data;
  },

  getMedicationReminders: async (patientId) => {
    const response = await api.get(`/api/notifications/medication-reminders/${patientId}`);
    return response.data;
  },
};

// Health check
export const healthCheck = async () => {
  const response = await api.get('/api/health');
  return response.data;
};

export default api;