
import { useState } from 'react';
import { Users, Eye, TrendingUp, Lock, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TeamTab = () => {
  const [activeView, setActiveView] = useState('overview');

  // Mock team data
  const teamStats = {
    totalTeam: 156,
    leftTeam: 78,
    rightTeam: 78,
    directReferrals: 24,
    growlineReferrals: 132,
    totalEarnings: 15750,
    activeMembers: 142,
    inactiveMembers: 14
  };

  const levels = [
    { level: 1, percentage: 15, unlocked: true, directRequired: 0, earned: 2250, bv: 150 },
    { level: 2, percentage: 5, unlocked: true, directRequired: 2, earned: 750, bv: 150 },
    { level: 3, percentage: 4, unlocked: true, directRequired: 3, earned: 600, bv: 150 },
    { level: 4, percentage: 3, unlocked: false, directRequired: 4, earned: 0, bv: 0 },
    { level: 5, percentage: 2, unlocked: false, directRequired: 5, earned: 0, bv: 0 },
    { level: 6, percentage: 1, unlocked: false, directRequired: 6, earned: 0, bv: 0 },
    { level: 7, percentage: 1, unlocked: false, directRequired: 7, earned: 0, bv: 0 },
    { level: 8, percentage: 1, unlocked: false, directRequired: 8, earned: 0, bv: 0 },
    { level: 9, percentage: 1, unlocked: false, directRequired: 9, earned: 0, bv: 0 },
    { level: 10, percentage: 2, unlocked: false, directRequired: 10, earned: 0, bv: 0 },
  ];

  const directReferrals = [
    { id: 'GB00002', name: 'John Doe', joinDate: '2024-01-15', purchased: true, amount: 5000 },
    { id: 'GB00003', name: 'Jane Smith', joinDate: '2024-01-10', purchased: true, amount: 3000 },
    { id: 'GB00004', name: 'Mike Johnson', joinDate: '2024-01-08', purchased: false, amount: 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            onClick={() => setActiveView('overview')}
            variant={activeView === 'overview' ? 'default' : 'outline'}
            className="h-auto p-4 flex flex-col space-y-2"
          >
            <Users className="w-6 h-6" />
            <span className="text-sm">Overview</span>
          </Button>
          <Button
            onClick={() => setActiveView('levels')}
            variant={activeView === 'levels' ? 'default' : 'outline'}
            className="h-auto p-4 flex flex-col space-y-2"
          >
            <TrendingUp className="w-6 h-6" />
            <span className="text-sm">Levels</span>
          </Button>
          <Button
            onClick={() => setActiveView('direct')}
            variant={activeView === 'direct' ? 'default' : 'outline'}
            className="h-auto p-4 flex flex-col space-y-2"
          >
            <Eye className="w-6 h-6" />
            <span className="text-sm">Direct Team</span>
          </Button>
          <Button
            onClick={() => setActiveView('growline')}
            variant={activeView === 'growline' ? 'default' : 'outline'}
            className="h-auto p-4 flex flex-col space-y-2"
          >
            <Users className="w-6 h-6" />
            <span className="text-sm">Growline</span>
          </Button>
        </div>
      </div>

      {/* Overview */}
      {activeView === 'overview' && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
              <h4 className="font-medium text-sm opacity-90">Total Team</h4>
              <p className="text-2xl font-bold mt-1">{teamStats.totalTeam}</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
              <h4 className="font-medium text-sm opacity-90">Left Team</h4>
              <p className="text-2xl font-bold mt-1">{teamStats.leftTeam}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
              <h4 className="font-medium text-sm opacity-90">Right Team</h4>
              <p className="text-2xl font-bold mt-1">{teamStats.rightTeam}</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
              <h4 className="font-medium text-sm opacity-90">Direct Referrals</h4>
              <p className="text-2xl font-bold mt-1">{teamStats.directReferrals}</p>
            </div>
          </div>

          {/* Earnings and Activity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Team Earnings</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Earned:</span>
                  <span className="font-semibold">₹{teamStats.totalEarnings.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">This Month:</span>
                  <span className="font-semibold text-green-600">₹2,450</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Month:</span>
                  <span className="font-semibold">₹1,980</span>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Team Activity</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Members:</span>
                  <span className="font-semibold text-green-600">{teamStats.activeMembers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Inactive Members:</span>
                  <span className="font-semibold text-red-600">{teamStats.inactiveMembers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Growth Rate:</span>
                  <span className="font-semibold text-blue-600">+12.5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Levels View */}
      {activeView === 'levels' && (
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Level-wise Earnings</h3>
          
          <div className="space-y-4">
            {levels.map((level) => (
              <div key={level.level} className={`p-4 rounded-lg border-2 ${
                level.unlocked ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      level.unlocked ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                    }`}>
                      {level.unlocked ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="font-semibold">Level {level.level}</h4>
                      <p className="text-sm text-gray-600">
                        {level.percentage}% commission • {level.directRequired} direct referrals required
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Earned</p>
                        <p className="font-semibold">₹{level.earned.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">BV</p>
                        <p className="font-semibold">{level.bv}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {!level.unlocked && (
                  <div className="mt-3 p-3 bg-yellow-50 rounded border border-yellow-200">
                    <p className="text-sm text-yellow-800">
                      Need {level.directRequired - teamStats.directReferrals} more direct referrals with purchases to unlock
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Direct Team View */}
      {activeView === 'direct' && (
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Direct Referrals</h3>
            <Button>
              <Eye className="w-4 h-4 mr-2" />
              View All Details
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">User ID</th>
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Join Date</th>
                  <th className="text-left p-2">Purchase Status</th>
                  <th className="text-left p-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {directReferrals.map((referral) => (
                  <tr key={referral.id} className="border-b">
                    <td className="p-2 font-mono">{referral.id}</td>
                    <td className="p-2">{referral.name}</td>
                    <td className="p-2">{referral.joinDate}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        referral.purchased ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {referral.purchased ? 'Purchased' : 'Not Purchased'}
                      </span>
                    </td>
                    <td className="p-2">₹{referral.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Growline Team View */}
      {activeView === 'growline' && (
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Growline Team</h3>
            <Button>
              <Eye className="w-4 h-4 mr-2" />
              View Detailed Tree
            </Button>
          </div>
          
          <div className="text-center py-12">
            <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">Growline team details will be displayed here</p>
            <p className="text-sm text-gray-500">Total Growline Members: {teamStats.growlineReferrals}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamTab;
