import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import Header from './components/Header';
import Navigation from './components/Navigation';
import PatientPortal from './pages/PatientPortal';
import DoctorDashboard from './pages/DoctorDashboard';
import AdminPanel from './pages/AdminPanel';
import Footer from './components/Footer';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

function AppContent() {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Login Route */}
          <Route path="/login" element={<Login />} />
          
          {/* All Protected Routes with Full Layout */}
          <Route 
            path="/patient-portal" 
            element={
              <ProtectedRoute allowedRoles={['patient']}>
                <>
                  <Header />
                  <Navigation />
                  <main className="flex-1">
                    <PatientPortal />
                  </main>
                  <Footer />
                </>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/doctor-dashboard" 
            element={
              <ProtectedRoute allowedRoles={['doctor']}>
                <>
                  <Header />
                  <Navigation />
                  <main className="flex-1">
                    <DoctorDashboard />
                  </main>
                  <Footer />
                </>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin-panel" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <>
                  <Header />
                  <Navigation />
                  <main className="flex-1">
                    <AdminPanel />
                  </main>
                  <Footer />
                </>
              </ProtectedRoute>
            } 
          />
          
          {/* Root Route - Authentication Required */}
          <Route 
            path="/" 
            element={
              !isAuthenticated ? (
                <Login />
              ) : (
                // Redirect authenticated users to their dashboard
                user?.role === 'patient' ? <Navigate to="/patient-portal" replace /> :
                user?.role === 'doctor' ? <Navigate to="/doctor-dashboard" replace /> :
                user?.role === 'admin' ? <Navigate to="/admin-panel" replace /> :
                <Navigate to="/login" replace />
              )
            } 
          />
          
          {/* Catch all - redirect to root */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </AppProvider>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;