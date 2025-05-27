
import { Menu, Bell, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface AdminHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const AdminHeader = ({ sidebarOpen, setSidebarOpen }: AdminHeaderProps) => {
  const { user } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-lg border-b border-white/20 shadow-sm z-40">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="hidden lg:block">
            <h1 className="text-xl font-bold text-gray-800">AlkalineAmrit Admin</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.charAt(0)}
            </div>
            <span className="hidden sm:block text-sm font-medium text-gray-700">{user?.name}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
