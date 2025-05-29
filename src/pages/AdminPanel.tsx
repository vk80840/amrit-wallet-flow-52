
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import AuthPage from '@/components/auth/AuthPage';
import AdminDashboard from '@/components/admin/AdminDashboard';

const AdminPanel = () => {
  const { user, isAdmin } = useAuth();

  // If user is logged in but not admin, redirect to main app
  if (user && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      
      {!isAdmin ? (
        <div className="relative z-10">
          <AuthPage />
        </div>
      ) : (
        <AdminDashboard />
      )}
    </div>
  );
};

export default AdminPanel;
