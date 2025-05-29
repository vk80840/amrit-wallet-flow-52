import { useAuth } from '@/hooks/useAuth';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { Navigate } from 'react-router-dom';

const AdminPanel = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <AdminDashboard />;
};

export default AdminPanel;