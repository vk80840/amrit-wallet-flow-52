
import { useState } from 'react';
import { DollarSign, Lock, Unlock, Calendar, TrendingUp, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SalaryTab = () => {
  const [activeView, setActiveView] = useState('overview');

  // Mock salary data
  const salaryData = {
    totalEarned: 8750,
    thisMonth: 625,
    upcomingSalary: 1125,
    eligibleSalary: 875,
    ineligibleSalary: 250,
    referralBalance: 3750,
    status: 'unlocked', // unlocked, locked
    currentBV: 450,
    requiredLeftReferrals: 5,
    requiredRightReferrals: 5,
    currentLeftReferrals: 5,
    currentRightReferrals: 3
  };

  // Mock salary logs
  const salaryLogs = [
    {
      id: 1,
      month: 'January 2024',
      bv: 450,
      percentage: 2.5,
      amount: 1125,
      status: 'Credited',
      date: '2024-01-30'
    },
    {
      id: 2,
      month: 'December 2023',
      bv: 350,
      percentage: 2.5,
      amount: 875,
      status: 'Credited',
      date: '2023-12-30'
    },
    {
      id: 3,
      month: 'November 2023',
      bv: 280,
      percentage: 2.5,
      amount: 700,
      status: 'Credited',
      date: '2023-11-30'
    }
  ];

  const isEligible = salaryData.currentLeftReferrals >= salaryData.requiredLeftReferrals && 
                    salaryData.currentRightReferrals >= salaryData.requiredRightReferrals;

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
            <DollarSign className="w-4 h-4" />
            <span>Overview</span>
          </Button>
          <Button
            onClick={() => setActiveView('eligibility')}
            variant={activeView === 'eligibility' ? 'default' : 'outline'}
            className="flex items-center space-x-2"
          >
            {isEligible ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            <span>Eligibility</span>
          </Button>
          <Button
            onClick={() => setActiveView('logs')}
            variant={activeView === 'logs' ? 'default' : 'outline'}
            className="flex items-center space-x-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Salary Logs</span>
          </Button>
        </div>
      </div>

      {/* Salary Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8" />
            <span className="text-green-100 text-sm">Total</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Total Earned</h3>
          <p className="text-3xl font-bold">₹{salaryData.totalEarned.toLocaleString()}</p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-8 h-8" />
            <span className="text-blue-100 text-sm">Current</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">This Month</h3>
          <p className="text-3xl font-bold">₹{salaryData.thisMonth.toLocaleString()}</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8" />
            <span className="text-purple-100 text-sm">Next</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Upcoming</h3>
          <p className="text-3xl font-bold">₹{salaryData.upcomingSalary.toLocaleString()}</p>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            {isEligible ? <Unlock className="w-8 h-8" /> : <Lock className="w-8 h-8" />}
            <span className="text-orange-100 text-sm">Status</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Salary</h3>
          <p className="text-2xl font-bold">{isEligible ? 'Unlocked' : 'Locked'}</p>
        </div>
      </div>

      {/* Overview Tab */}
      {activeView === 'overview' && (
        <div className="space-y-6">
          {/* Salary Summary */}
          <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Salary Overview</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-4 text-green-600">Current Salary Details</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current BV:</span>
                    <span className="font-semibold">{salaryData.currentBV} BV</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Salary Rate:</span>
                    <span className="font-semibold">2.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Salary:</span>
                    <span className="font-semibold text-green-600">₹{(salaryData.currentBV * 2.5).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Date:</span>
                    <span className="font-semibold">30th of every month</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-blue-600">How Salary Works</h4>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                      <span>2.5% of current active BV is paid monthly</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                      <span>Equal left and right referrals required</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                      <span>Only active (non-expired) BV counts</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                      <span>Paid automatically on 30th day</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Salary Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Salary Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Eligible Salary:</span>
                  <span className="font-semibold text-green-600">₹{salaryData.eligibleSalary}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ineligible Salary:</span>
                  <span className="font-semibold text-red-600">₹{salaryData.ineligibleSalary}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-gray-600">Total This Month:</span>
                  <span className="font-semibold">₹{salaryData.thisMonth}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Referral Balance</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Available Balance:</span>
                  <span className="font-semibold text-blue-600">₹{salaryData.referralBalance}</span>
                </div>
                <p className="text-sm text-gray-600">
                  This is your accumulated referral earnings separate from salary
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Eligibility Tab */}
      {activeView === 'eligibility' && (
        <div className="space-y-6">
          {/* Eligibility Status */}
          <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Salary Eligibility</h3>
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                isEligible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {isEligible ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                <span className="font-semibold">{isEligible ? 'Eligible' : 'Not Eligible'}</span>
              </div>
            </div>

            {!isEligible && (
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800">Salary Locked</h4>
                    <p className="text-sm text-yellow-700">
                      You need equal number of direct referrals on both left and right sides to unlock salary
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-4">Current Status</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Left Side Referrals:</span>
                      <span className="font-semibold">{salaryData.currentLeftReferrals}/{salaryData.requiredLeftReferrals}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${(salaryData.currentLeftReferrals / salaryData.requiredLeftReferrals) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Right Side Referrals:</span>
                      <span className="font-semibold">{salaryData.currentRightReferrals}/{salaryData.requiredRightReferrals}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${(salaryData.currentRightReferrals / salaryData.requiredRightReferrals) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Requirements</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center space-x-2">
                      <span className={`w-3 h-3 rounded-full ${
                        salaryData.currentLeftReferrals >= salaryData.requiredLeftReferrals ? 'bg-green-500' : 'bg-red-500'
                      }`}></span>
                      <span>Minimum {salaryData.requiredLeftReferrals} left side referrals</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className={`w-3 h-3 rounded-full ${
                        salaryData.currentRightReferrals >= salaryData.requiredRightReferrals ? 'bg-green-500' : 'bg-red-500'
                      }`}></span>
                      <span>Minimum {salaryData.requiredRightReferrals} right side referrals</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                      <span>Active BV balance required</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          {!isEligible && (
            <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">How to Unlock Salary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-blue-600">What You Need</h4>
                  <div className="space-y-2">
                    <p className="text-sm">
                      • {salaryData.requiredRightReferrals - salaryData.currentRightReferrals} more right side referrals
                    </p>
                    <p className="text-sm">
                      • Ensure all referrals make qualifying purchases
                    </p>
                    <p className="text-sm">
                      • Maintain active BV balance
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-green-600">Benefits of Unlocking</h4>
                  <div className="space-y-2">
                    <p className="text-sm">
                      • Monthly passive income of 2.5% of BV
                    </p>
                    <p className="text-sm">
                      • Automatic payments on 30th of each month
                    </p>
                    <p className="text-sm">
                      • Compound growth as team expands
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Salary Logs Tab */}
      {activeView === 'logs' && (
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Salary Payment History</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Month</th>
                  <th className="text-left p-2">BV Amount</th>
                  <th className="text-left p-2">Rate</th>
                  <th className="text-left p-2">Salary Amount</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Payment Date</th>
                </tr>
              </thead>
              <tbody>
                {salaryLogs.map((log) => (
                  <tr key={log.id} className="border-b">
                    <td className="p-2 font-medium">{log.month}</td>
                    <td className="p-2">{log.bv} BV</td>
                    <td className="p-2">{log.percentage}%</td>
                    <td className="p-2 font-semibold text-green-600">₹{log.amount}</td>
                    <td className="p-2">
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        {log.status}
                      </span>
                    </td>
                    <td className="p-2">{log.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold mb-2">Total Salary Earned</h4>
            <p className="text-2xl font-bold text-blue-600">₹{salaryData.totalEarned.toLocaleString()}</p>
            <p className="text-sm text-gray-600 mt-1">
              From {salaryLogs.length} monthly payments
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalaryTab;
