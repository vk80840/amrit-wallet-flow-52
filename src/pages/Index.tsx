
import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import AuthPage from '@/components/auth/AuthPage';
import UserDashboard from '@/components/user/UserDashboard';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const { user, isAdmin, loading } = useAuth();

  useEffect(() => {
    // Show loading screen for 1 second
    const timer = setTimeout(() => {
      setShowLoadingScreen(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Show loading screen during initial load or auth loading
  if (showLoadingScreen || loading) {
    return <LoadingScreen />;
  }

  // If user is admin, redirect to admin panel
  if (isAdmin && user) {
    window.location.href = '/adminpanel';
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
      ) : (
        <UserDashboard />
      )}
    </div>
  );
};

export default Index;
