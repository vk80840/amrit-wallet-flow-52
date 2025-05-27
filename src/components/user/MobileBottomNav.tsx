
import { Home, Users, User, Wallet } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MobileBottomNav = ({ activeTab, setActiveTab }: MobileBottomNavProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-white/20 shadow-xl lg:hidden z-30">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center space-y-1 transition-colors ${
                activeTab === item.id
                  ? 'text-blue-600'
                  : 'text-gray-600'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
              {activeTab === item.id && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-blue-600 rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
