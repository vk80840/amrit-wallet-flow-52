
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Bell, Menu, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface UserHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const UserHeader = ({ sidebarOpen, setSidebarOpen }: UserHeaderProps) => {
  const { user, logout } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-white/20 shadow-sm">
      <div className="flex items-center justify-between px-4 h-16">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
              AA
            </div>
            <span className="text-xl font-bold text-gray-800 hidden sm:block">
              AlkalineAmrit
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Button>
            
            {notificationOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white/90 backdrop-blur-lg rounded-lg shadow-lg border border-white/20 z-50">
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Notifications</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-700">Welcome to AlkalineAmrit!</p>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-700">KYC verification pending</p>
                      <span className="text-xs text-gray-500">1 day ago</span>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-gray-700">New product available in shop</p>
                      <span className="text-xs text-gray-500">2 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="relative"
            >
              {user?.profilePicture ? (
                <img 
                  src={user.profilePicture} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <User className="h-5 w-5" />
              )}
            </Button>
            
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-lg rounded-lg shadow-lg border border-white/20 z-50">
                <div className="p-2">
                  <button 
                    className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    Profile
                  </button>
                  <button 
                    className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors"
                    onClick={() => setNotificationOpen(true)}
                  >
                    Notifications
                  </button>
                  <button 
                    className="w-full text-left px-3 py-2 rounded hover:bg-gray-100 transition-colors text-red-600"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
