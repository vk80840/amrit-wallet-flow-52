
import { useState } from 'react';
import { TrendingUp, Clock, Users, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BusinessVolumeTab = () => {
  const [activeView, setActiveView] = useState('overview');

  // Mock BV data
  const bvData = {
    activeBV: 450,
    expiredBV: 120,
    totalBV: 570,
    monthlyBV: 85,
    expiringThisMonth: 25
  };

  // Mock BV breakdown data
  const bvBreakdown = [
    {
      id: 1,
      referralId: 'GB00002',
      referralName: 'John Doe',
      bvEarned: 25,
      purchaseAmount: 5000,
      earnedDate: '2024-01-15',
      expiryDate: '2025-01-15',
      status: 'Active',
      level: 1
    },
    {
      id: 2,
      referralId: 'GB00003',
      referralName: 'Jane Smith',
      bvEarned: 15,
      purchaseAmount: 3000,
      earnedDate: '2024-01-10',
      expiryDate: '2025-01-10',
      status: 'Active',
      level: 2
    },
    {
      id: 3,
      referralId: 'GB00004',
      referralName: 'Mike Johnson',
      bvEarned: 10,
      purchaseAmount: 2000,
      earnedDate: '2023-01-08',
      expiryDate: '2024-01-08',
      status: 'Expired',
      level: 1
    }
  ];

  const getStatusColor = (status: string) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getLevelColor = (level: number) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-yellow-100 text-yellow-800',
      'bg-purple-100 text-purple-800',
      'bg-pink-100 text-pink-800'
    ];
    return colors[Math.min(level - 1, colors.length - 1)];
  };

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <div className="flex space-x-4">
          <Button
            onClick={() => setActiveView('overview')}
            variant={activeView === 'overview' ? 'default' : 'outline'}
            className="flex items-center space-x-2"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Overview</span>
          </Button>
          <Button
            onClick={() => setActiveView('breakdown')}
            variant={activeView === 'breakdown' ? 'default' : 'outline'}
            className="flex items-center space-x-2"
          >
            <Eye className="w-4 h-4" />
            <span>BV Breakdown</span>
          </Button>
          <Button
            onClick={() => setActiveView('expiring')}
            variant={activeView === 'expiring' ? 'default' : 'outline'}
            className="flex items-center space-x-2"
          >
            <Clock className="w-4 h-4" />
            <span>Expiring Soon</span>
          </Button>
        </div>
      </div>

      {/* BV Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8" />
            <span className="text-green-100 text-sm">Current</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Active BV</h3>
          <p className="text-3xl font-bold">{bvData.activeBV}</p>
        </div>
        
        <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8" />
            <span className="text-red-100 text-sm">Past</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Expired BV</h3>
          <p className="text-3xl font-bold">{bvData.expiredBV}</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8" />
            <span className="text-blue-100 text-sm">All Time</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Total BV</h3>
          <p className="text-3xl font-bold">{bvData.totalBV}</p>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8" />
            <span className="text-orange-100 text-sm">This Month</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Monthly BV</h3>
          <p className="text-3xl font-bold">{bvData.monthlyBV}</p>
        </div>
      </div>

      {/* Overview Tab */}
      {activeView === 'overview' && (
        <div className="space-y-6">
          {/* BV Summary */}
          <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Business Volume Summary</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-4 text-green-600">Active BV Details</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Active BV:</span>
                    <span className="font-semibold">{bvData.activeBV} BV</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">This Month:</span>
                    <span className="font-semibold text-green-600">+{bvData.monthlyBV} BV</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expiring This Month:</span>
                    <span className="font-semibold text-orange-600">{bvData.expiringThisMonth} BV</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-blue-600">BV Information</h4>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                      <span>BV is earned when your referrals make purchases</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                      <span>1 BV = ₹5 purchase by team members</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                      <span>BV expires after 12 months</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                      <span>Used for salary calculations</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* BV Chart/Progress */}
          <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">BV Growth Trend</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Monthly Progress</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">January 2024</span>
                      <span className="text-sm font-medium">85 BV</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">December 2023</span>
                      <span className="text-sm font-medium">65 BV</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">November 2023</span>
                      <span className="text-sm font-medium">45 BV</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Level-wise BV Distribution</h4>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div key={level} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-sm">Level {level}</span>
                      <span className="text-sm font-medium">{Math.max(0, 100 - level * 15)} BV</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BV Breakdown Tab */}
      {activeView === 'breakdown' && (
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">BV Breakdown</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Referral</th>
                  <th className="text-left p-2">BV Earned</th>
                  <th className="text-left p-2">Purchase Amount</th>
                  <th className="text-left p-2">Level</th>
                  <th className="text-left p-2">Earned Date</th>
                  <th className="text-left p-2">Expiry Date</th>
                  <th className="text-left p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {bvBreakdown.map((bv) => (
                  <tr key={bv.id} className="border-b">
                    <td className="p-2">
                      <div>
                        <p className="font-medium">{bv.referralName}</p>
                        <p className="text-xs text-gray-500">{bv.referralId}</p>
                      </div>
                    </td>
                    <td className="p-2 font-semibold text-blue-600">{bv.bvEarned} BV</td>
                    <td className="p-2">₹{bv.purchaseAmount.toLocaleString()}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${getLevelColor(bv.level)}`}>
                        Level {bv.level}
                      </span>
                    </td>
                    <td className="p-2">{bv.earnedDate}</td>
                    <td className="p-2">{bv.expiryDate}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(bv.status)}`}>
                        {bv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Expiring Soon Tab */}
      {activeView === 'expiring' && (
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">BV Expiring Soon</h3>
          
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
            <div className="flex items-start space-x-2">
              <Clock className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-800">Expiring This Month</h4>
                <p className="text-sm text-yellow-700">
                  {bvData.expiringThisMonth} BV worth will expire in the next 30 days
                </p>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">BV Amount</th>
                  <th className="text-left p-2">From Referral</th>
                  <th className="text-left p-2">Earned Date</th>
                  <th className="text-left p-2">Expiry Date</th>
                  <th className="text-left p-2">Days Left</th>
                </tr>
              </thead>
              <tbody>
                {bvBreakdown
                  .filter(bv => bv.status === 'Active')
                  .map((bv) => {
                    const daysLeft = Math.floor((new Date(bv.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                    return (
                      <tr key={bv.id} className="border-b">
                        <td className="p-2 font-semibold text-blue-600">{bv.bvEarned} BV</td>
                        <td className="p-2">
                          <div>
                            <p className="font-medium">{bv.referralName}</p>
                            <p className="text-xs text-gray-500">{bv.referralId}</p>
                          </div>
                        </td>
                        <td className="p-2">{bv.earnedDate}</td>
                        <td className="p-2">{bv.expiryDate}</td>
                        <td className="p-2">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            daysLeft < 30 ? 'bg-red-100 text-red-800' : 
                            daysLeft < 90 ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-green-100 text-green-800'
                          }`}>
                            {daysLeft} days
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessVolumeTab;
