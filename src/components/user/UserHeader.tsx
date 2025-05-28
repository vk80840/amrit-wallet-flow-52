
import { Menu, Bell, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect, useRef } from 'react';

interface UserHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const UserHeader = ({ sidebarOpen, setSidebarOpen }: UserHeaderProps) => {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationTimeoutRef = useRef<NodeJS.Timeout>();
  const profileTimeoutRef = useRef<NodeJS.Timeout>();

  // Auto-close functionality for notifications
  useEffect(() => {
    if (showNotifications) {
      // Clear existing timeout
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
      // Set new timeout
      notificationTimeoutRef.current = setTimeout(() => {
        setShowNotifications(false);
      }, 5000);
    }
    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, [showNotifications]);

  // Auto-close functionality for profile menu
  useEffect(() => {
    if (showProfileMenu) {
      // Clear existing timeout
      if (profileTimeoutRef.current) {
        clearTimeout(profileTimeoutRef.current);
      }
      // Set new timeout
      profileTimeoutRef.current = setTimeout(() => {
        setShowProfileMenu(false);
      }, 5000);
    }
    return () => {
      if (profileTimeoutRef.current) {
        clearTimeout(profileTimeoutRef.current);
      }
    };
  }, [showProfileMenu]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    if (showNotifications || showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications, showProfileMenu]);

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
            <h1 className="text-xl font-bold text-gray-800">AlkalineAmrit</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false); // Close profile menu when opening notifications
              }}
              className="p-2 rounded-lg hover:bg-gray-100 relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-xl border z-50 max-h-96 overflow-y-auto">
                <div className="p-4 border-b">
                  <h3 className="font-semibold text-gray-800">Notifications</h3>
                </div>
                <div className="p-2">
                  <div className="p-3 hover:bg-gray-50 rounded cursor-pointer">
                    <p className="text-sm font-medium">Welcome to AlkalineAmrit!</p>
                    <p className="text-xs text-gray-600 mt-1">Your account has been created successfully.</p>
                    <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                  </div>
                  <div className="p-3 hover:bg-gray-50 rounded cursor-pointer">
                    <p className="text-sm font-medium">KYC Verification Required</p>
                    <p className="text-xs text-gray-600 mt-1">Please complete your KYC verification to unlock all features.</p>
                    <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                  </div>
                  <div className="p-3 hover:bg-gray-50 rounded cursor-pointer">
                    <p className="text-sm font-medium">New Product Available</p>
                    <p className="text-xs text-gray-600 mt-1">Check out our latest alkaline water products in the shop.</p>
                    <p className="text-xs text-gray-400 mt-1">3 days ago</p>
                  </div>
                </div>
                <div className="p-3 border-t text-center">
                  <button className="text-sm text-blue-600 hover:text-blue-800">View All Notifications</button>
                </div>
              </div>
            )}
          </div>
          
          {/* Profile Menu */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false); // Close notifications when opening profile menu
              }}
              className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {user?.name?.charAt(0)}
              </div>
              <span className="hidden sm:block text-sm font-medium text-gray-700">{user?.name}</span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-xl border z-50">
                <div className="p-2">
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 rounded-lg">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Profile</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-gray-50 rounded-lg">
                    <Settings className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Settings</span>
                  </button>
                  <hr className="my-1" />
                  <button 
                    onClick={logout}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-left hover:bg-red-50 rounded-lg text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Logout</span>
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
