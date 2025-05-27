
import { useState } from 'react';
import { TrendingUp, Users, Calendar, Target } from 'lucide-react';

const BusinessVolumeTab = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - will be from database
  const bvData = {
    totalBV: 450,
    activeBV: 420,
    expiredBV: 30,
    leftTeamBV: 220,
    rightTeamBV: 200,
    monthlyTarget: 500,
    expiryDate: '2024-02-28'
  };

  const bvHistory = [
    { id: 1, date: '2024-01-25', source: 'John Doe Purchase', amount: 20, type: 'Credit', level: 'Level 1' },
    { id: 2, date: '2024-01-20', source: 'Jane Smith Purchase', amount: 15, type: 'Credit', level: 'Level 2' },
    { id: 3, date: '2024-01-18', source: 'BV Expiry', amount: -10, type: 'Debit', level: 'System' },
    { id: 4, date: '2024-01-15', source: 'Alice Brown Purchase', amount: 25, type: 'Credit', level: 'Level 3' },
  ];

  return (
    <div className="max-w-full overflow-hidden">
      <div className="space-y-6">
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Business Volume (BV)</h2>
          
          {/* BV Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-xl">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <div>
                  <p className="text-sm text-blue-100">Total BV</p>
                  <p className="text-2xl font-bold">{bvData.totalBV}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-xl">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <div>
                  <p className="text-sm text-green-100">Active BV</p>
                  <p className="text-2xl font-bold">{bvData.activeBV}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-xl">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <div>
                  <p className="text-sm text-purple-100">Left Team BV</p>
                  <p className="text-2xl font-bold">{bvData.leftTeamBV}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4 rounded-xl">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <div>
                  <p className="text-sm text-orange-100">Right Team BV</p>
                  <p className="text-2xl font-bold">{bvData.rightTeamBV}</p>
                </div>
              </div>
            </div>
          </div>

          {/* BV Progress */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h4 className="font-semibold mb-2">Monthly Progress</h4>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(bvData.activeBV / bvData.monthlyTarget) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>{bvData.activeBV} BV</span>
              <span>{bvData.monthlyTarget} BV Target</span>
            </div>
          </div>

          {/* BV Information */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">BV System Information</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 1 BV = ₹5 product purchase by your referrals</li>
              <li>• BV is credited up to 10 levels in your upline</li>
              <li>• BV expires after 6 months if not renewed</li>
              <li>• Monthly salary: 2.5% of active BV</li>
              <li>• Next expiry: {bvData.expiryDate}</li>
            </ul>
          </div>
        </div>

        {/* BV History */}
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">BV History</h3>
          
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left p-3">Date</th>
                    <th className="text-left p-3">Source</th>
                    <th className="text-left p-3">Level</th>
                    <th className="text-left p-3">Type</th>
                    <th className="text-left p-3">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {bvHistory.map((entry) => (
                    <tr key={entry.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{entry.date}</td>
                      <td className="p-3">{entry.source}</td>
                      <td className="p-3">{entry.level}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          entry.type === 'Credit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {entry.type}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={entry.type === 'Credit' ? 'text-green-600' : 'text-red-600'}>
                          {entry.type === 'Credit' ? '+' : ''}{entry.amount} BV
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessVolumeTab;
