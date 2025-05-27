
import { X, Home, Download, Upload, Wallet, User, Users, TreePine, ShoppingBag, Coins, TrendingUp, HelpCircle, Bell, DollarSign } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface UserSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const UserSidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }: UserSidebarProps) => {
  const { user, logout } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'withdraw', label: 'Withdraw', icon: Download },
    { id: 'deposit', label: 'Deposit', icon: Upload },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'tree', label: 'Tree View', icon: TreePine },
    { id: 'shop', label: 'Shop', icon: ShoppingBag },
    { id: 'stk-wallet', label: 'STK Wallet', icon: Coins },
    { id: 'business-volume', label: 'Business Volume', icon: TrendingUp },
    { id: 'support', label: 'Support', icon: HelpCircle },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'salary', label: 'Salary', icon: DollarSign },
  ];

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-white/90 backdrop-blur-lg border-r border-white/20 shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                AA
              </div>
              <div>
                <h2 className="font-bold text-gray-800">AlkalineAmrit</h2>
                <p className="text-xs text-gray-600">Welcome, {user?.name}</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Wallet Balance */}
        <div className="p-4 border-b border-gray-200">
          <div className="bg-gradient-to-br from-blue-50 to-green-50 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Wallet Balance</p>
            <p className="text-xl font-bold text-gray-800">₹12,345</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default UserSidebar;
