import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

const AppContent: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/login" 
            element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} 
          />
          <Route 
            path="/signup" 
            element={user ? <Navigate to="/dashboard" replace /> : <SignupPage />} 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                {user?.isAdmin ? <AdminDashboard /> : <UserDashboard />}
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

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