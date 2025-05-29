
import AuthPage from '@/components/auth/AuthPage';
import UserDashboard from '@/components/user/UserDashboard';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { user, isAdmin } = useAuth();

  // If user is admin, redirect to admin panel
  if (isAdmin && user) {
    window.location.href = '/adminpanel';
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-pattern bg-repeat" />
      </div>
      
      {!user ? (
        <div className="relative">
          <AuthPage />
          {/* Admin Login Button */}
          <div className="fixed bottom-4 right-4">
            <button
              onClick={() => window.location.href = '/adminpanel'}
              className="text-sm text-gray-500 hover:text-blue-600 underline transition-colors bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm"
            >
              Admin Login
            </button>
          </div>
        </div>
      ) : (
        <UserDashboard />
      )}
    </div>
  );
};

export default Index;
