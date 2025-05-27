
import { Users, DollarSign, FileCheck, Download, UserCheck, UserPlus, ShoppingCart, Coins } from 'lucide-react';

const DashboardOverview = () => {
  // Mock data - will be from database
  const stats = {
    totalUsers: 1234,
    totalEarnings: 567890,
    pendingKYC: 23,
    pendingWithdrawals: 12,
    activeUsersToday: 156,
    newSignupsToday: 8,
    totalOrders: 456,
    totalSTKBalance: 850000 // 850K out of 1M total supply
  };

  const recentActivities = [
    { id: 1, user: 'John Doe', action: 'KYC Submitted', time: '2 mins ago', type: 'kyc' },
    { id: 2, user: 'Jane Smith', action: 'Withdrawal Request', time: '5 mins ago', type: 'withdrawal' },
    { id: 3, user: 'Bob Wilson', action: 'New Registration', time: '10 mins ago', type: 'registration' },
    { id: 4, user: 'Alice Brown', action: 'Product Purchase', time: '15 mins ago', type: 'purchase' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="text-sm text-gray-600">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold">Total Users</h3>
              <p className="text-3xl font-bold">{stats.totalUsers.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
          <div className="flex items-center space-x-3">
            <DollarSign className="w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold">Total Earnings</h3>
              <p className="text-3xl font-bold">₹{stats.totalEarnings.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
          <div className="flex items-center space-x-3">
            <FileCheck className="w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold">Pending KYC</h3>
              <p className="text-3xl font-bold">{stats.pendingKYC}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
          <div className="flex items-center space-x-3">
            <Download className="w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold">Pending Withdrawals</h3>
              <p className="text-3xl font-bold">{stats.pendingWithdrawals}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-teal-500 to-teal-600 text-white p-6 rounded-xl">
          <div className="flex items-center space-x-3">
            <UserCheck className="w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold">Active Users Today</h3>
              <p className="text-3xl font-bold">{stats.activeUsersToday}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-6 rounded-xl">
          <div className="flex items-center space-x-3">
            <UserPlus className="w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold">New Signups Today</h3>
              <p className="text-3xl font-bold">{stats.newSignupsToday}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white p-6 rounded-xl">
          <div className="flex items-center space-x-3">
            <ShoppingCart className="w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold">Total Orders</h3>
              <p className="text-3xl font-bold">{stats.totalOrders}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-xl">
          <div className="flex items-center space-x-3">
            <Coins className="w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold">Total STK Balance</h3>
              <p className="text-2xl font-bold">{stats.totalSTKBalance.toLocaleString()}</p>
              <p className="text-sm text-yellow-100">Distributed: {((1000000 - stats.totalSTKBalance) / 1000000 * 100).toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activities</h2>
        
        <div className="space-y-3">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  activity.type === 'kyc' ? 'bg-orange-500' :
                  activity.type === 'withdrawal' ? 'bg-red-500' :
                  activity.type === 'registration' ? 'bg-green-500' :
                  'bg-blue-500'
                }`}></div>
                <div>
                  <p className="font-medium text-gray-800">{activity.user}</p>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-blue-600">Manage Users</p>
          </button>
          
          <button className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
            <FileCheck className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-orange-600">Review KYC</p>
          </button>
          
          <button className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <Download className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-green-600">Process Withdrawals</p>
          </button>
          
          <button className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <Bell className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-purple-600">Send Announcement</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
