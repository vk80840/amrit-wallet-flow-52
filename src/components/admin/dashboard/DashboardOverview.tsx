
import { useState } from 'react';
import { Users, DollarSign, FileText, Download, UserCheck, UserPlus, ShoppingCart, Coins, Bell, TrendingUp, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DashboardOverview = () => {
  const [dateRange, setDateRange] = useState('today');

  // Mock data - will be from database
  const stats = {
    totalUsers: 15847,
    totalEarnings: 2847650,
    pendingKYC: 23,
    pendingWithdrawals: 7,
    activeUsersToday: 1247,
    newSignupsToday: 45,
    totalOrders: 3892,
    totalSTKBalance: 875000,
    adminSTKBalance: 125000
  };

  const recentActivity = [
    { id: 1, action: 'User Login', user: 'John Doe (GB00015)', time: '2 minutes ago', severity: 'low' },
    { id: 2, action: 'KYC Submitted', user: 'Jane Smith (GB00016)', time: '5 minutes ago', severity: 'medium' },
    { id: 3, action: 'Withdrawal Request', user: 'Bob Wilson (GB00017)', time: '8 minutes ago', severity: 'high' },
    { id: 4, action: 'Order Placed', user: 'Alice Brown (GB00018)', time: '12 minutes ago', severity: 'low' },
    { id: 5, action: 'STK Purchase', user: 'Charlie Davis (GB00019)', time: '15 minutes ago', severity: 'medium' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <div className="flex space-x-2">
          {['today', 'week', 'month'].map((range) => (
            <Button
              key={range}
              variant={dateRange === range ? 'default' : 'outline'}
              size="sm"
              onClick={() => setDateRange(range)}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Users</p>
              <p className="text-3xl font-bold">{stats.totalUsers.toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Total Earnings</p>
              <p className="text-3xl font-bold">₹{stats.totalEarnings.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100">Pending KYC</p>
              <p className="text-3xl font-bold">{stats.pendingKYC}</p>
            </div>
            <FileText className="w-8 h-8 text-yellow-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100">Pending Withdrawals</p>
              <p className="text-3xl font-bold">{stats.pendingWithdrawals}</p>
            </div>
            <Download className="w-8 h-8 text-red-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Active Users Today</p>
              <p className="text-3xl font-bold">{stats.activeUsersToday.toLocaleString()}</p>
            </div>
            <UserCheck className="w-8 h-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100">New Signups Today</p>
              <p className="text-3xl font-bold">{stats.newSignupsToday}</p>
            </div>
            <UserPlus className="w-8 h-8 text-indigo-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-100">Total Orders</p>
              <p className="text-3xl font-bold">{stats.totalOrders.toLocaleString()}</p>
            </div>
            <ShoppingCart className="w-8 h-8 text-pink-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Total STK Distributed</p>
              <p className="text-3xl font-bold">{stats.totalSTKBalance.toLocaleString()}</p>
            </div>
            <Coins className="w-8 h-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button className="p-4 h-auto flex-col space-y-2">
            <Users className="w-6 h-6" />
            <span>Add User</span>
          </Button>
          <Button className="p-4 h-auto flex-col space-y-2" variant="outline">
            <FileText className="w-6 h-6" />
            <span>Review KYC</span>
          </Button>
          <Button className="p-4 h-auto flex-col space-y-2" variant="outline">
            <Download className="w-6 h-6" />
            <span>Process Withdrawals</span>
          </Button>
          <Button className="p-4 h-auto flex-col space-y-2" variant="outline">
            <Bell className="w-6 h-6" />
            <span>Send Announcement</span>
          </Button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Activity className={`w-5 h-5 ${
                  activity.severity === 'high' ? 'text-red-500' :
                  activity.severity === 'medium' ? 'text-yellow-500' : 'text-green-500'
                }`} />
                <div>
                  <p className="font-medium text-gray-800">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.user}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activity.severity === 'high' ? 'bg-red-100 text-red-600' :
                  activity.severity === 'medium' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
                }`}>
                  {activity.severity}
                </span>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
