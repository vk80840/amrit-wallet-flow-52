
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoadingScreen from '@/components/LoadingScreen';
import AuthPage from '@/components/auth/AuthPage';
import UserDashboard from '@/components/user/UserDashboard';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAdmin } = useAuth();

  // Simulate loading screen
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-pattern bg-repeat" />
      </div>
      
      {!user ? (
        <AuthPage />
      ) : isAdmin ? (
        <AdminDashboard />
      ) : (
        <UserDashboard />
      )}
    </div>
  );
};

export default Index;
