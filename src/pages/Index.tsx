import { useAuth } from '@/hooks/useAuth';
import AuthPage from '@/components/auth/AuthPage';
import UserDashboard from '@/components/user/UserDashboard';

const Index = () => {
  const { user } = useAuth();

  if (user) {
    return <UserDashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <AuthPage />
    </div>
  );
};

export default Index;