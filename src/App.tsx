import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { RegisterPage } from './pages/RegisterPage';
import { AdminPanel } from './pages/AdminPanel';
import { QuizApp } from './pages/QuizApp';

const ProtectedRoute: React.FC<{
  children: React.ReactNode;
  requiredRole?: 'admin' | 'student';
}> = ({ children, requiredRole }) => {
  const { user, token, checkAuth, loading } = useAuthStore();

  useEffect(() => {
    if (token && !user) {
      checkAuth().catch(() => {});
    }
  }, [token, user, checkAuth]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-100 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz/*"
          element={
            <ProtectedRoute requiredRole="student">
              <QuizApp />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/quiz" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;