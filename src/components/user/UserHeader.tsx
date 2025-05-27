
import { Menu, Bell, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect, useRef } from 'react';

interface UserHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const UserHeader = ({ sidebarOpen, setSidebarOpen }: UserHeaderProps) => {
  const { user } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (showPopup) {
      // Auto close after 5 seconds
      timeoutRef.current = setTimeout(() => {
        setShowPopup(false);
      }, 5000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [showPopup]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowPopup(false);
      }
    };

    if (showPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopup]);

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
          <div className="relative" ref={popupRef}>
            <button 
              onClick={() => setShowPopup(!showPopup)}
              className="p-2 rounded-lg hover:bg-gray-100 relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
            </button>
            
            {/* Auto-closing popup menu */}
            {showPopup && (
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
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {user?.name?.charAt(0)}
            </div>
            <span className="hidden sm:block text-sm font-medium text-gray-700">{user?.name}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
