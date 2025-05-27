
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import UserHeader from './UserHeader';
import UserSidebar from './UserSidebar';
import MobileBottomNav from './MobileBottomNav';
import DashboardContent from './dashboard/DashboardContent';
import WithdrawTab from './withdraw/WithdrawTab';
import DepositTab from './deposit/DepositTab';
import WalletTab from './wallet/WalletTab';
import ProfileTab from './profile/ProfileTab';
import TeamTab from './team/TeamTab';
import TreeViewTab from './tree/TreeViewTab';
import ShopTab from './shop/ShopTab';
import STKWalletTab from './stk/STKWalletTab';
import BusinessVolumeTab from './bv/BusinessVolumeTab';
import SupportTab from './support/SupportTab';
import AnnouncementsTab from './announcements/AnnouncementsTab';
import SalaryTab from './salary/SalaryTab';

const UserDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />;
      case 'withdraw':
        return <WithdrawTab />;
      case 'deposit':
        return <DepositTab />;
      case 'wallet':
        return <WalletTab onNavigateToTab={setActiveTab} />;
      case 'profile':
        return <ProfileTab />;
      case 'team':
        return <TeamTab />;
      case 'tree':
        return <TreeViewTab />;
      case 'shop':
        return <ShopTab />;
      case 'stk-wallet':
        return <STKWalletTab />;
      case 'business-volume':
        return <BusinessVolumeTab />;
      case 'support':
        return <SupportTab />;
      case 'announcements':
        return <AnnouncementsTab />;
      case 'salary':
        return <SalaryTab />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <UserHeader 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />
      
      <div className="flex">
        <UserSidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        
        <main className="flex-1 lg:ml-64 pt-16 pb-20 lg:pb-4 px-4">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
      
      <MobileBottomNav 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default UserDashboard;
