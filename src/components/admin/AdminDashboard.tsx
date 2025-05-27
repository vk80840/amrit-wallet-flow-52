
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import DashboardOverview from './dashboard/DashboardOverview';
import UserManagement from './users/UserManagement';
import KYCManagement from './kyc/KYCManagement';
import WithdrawalManagement from './withdrawals/WithdrawalManagement';
import DepositManagement from './deposits/DepositManagement';
import ProductManagement from './products/ProductManagement';
import OrderManagement from './orders/OrderManagement';
import TeamTreeViewer from './team/TeamTreeViewer';
import AnnouncementManagement from './announcements/AnnouncementManagement';
import WalletAdjustment from './wallet/WalletAdjustment';
import ActivityLogs from './logs/ActivityLogs';
import SystemSettings from './settings/SystemSettings';
import STKManagement from './stk/STKManagement';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'users':
        return <UserManagement />;
      case 'kyc':
        return <KYCManagement />;
      case 'withdrawals':
        return <WithdrawalManagement />;
      case 'deposits':
        return <DepositManagement />;
      case 'products':
        return <ProductManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'team-tree':
        return <TeamTreeViewer />;
      case 'announcements':
        return <AnnouncementManagement />;
      case 'wallet-adjustment':
        return <WalletAdjustment />;
      case 'logs':
        return <ActivityLogs />;
      case 'stk':
        return <STKManagement />;
      case 'settings':
        return <SystemSettings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <AdminHeader 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />
      
      <div className="flex">
        <AdminSidebar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        
        <main className="flex-1 lg:ml-64 pt-16 p-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
