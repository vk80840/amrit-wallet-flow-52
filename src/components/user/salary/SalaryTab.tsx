
import { useState } from 'react';
import { DollarSign, Calendar, TrendingUp, Lock, CheckCircle } from 'lucide-react';

const SalaryTab = () => {
  // Mock data - will be from database
  const salaryData = {
    activeBV: 450,
    monthlySalary: 11.25, // 2.5% of 450 BV = 11.25
    leftReferrals: 8,
    rightReferrals: 8,
    isEligible: true, // Both sides have equal referrals
    nextPaymentDate: '2024-01-30',
    totalEarned: 135.75
  };

  const salaryHistory = [
    { id: 1, month: 'December 2023', bv: 420, amount: 10.50, status: 'Paid', date: '2023-12-30' },
    { id: 2, month: 'November 2023', bv: 380, amount: 9.50, status: 'Paid', date: '2023-11-30' },
    { id: 3, month: 'October 2023', bv: 0, amount: 0, status: 'Locked', date: '2023-10-30' },
    { id: 4, month: 'September 2023', bv: 340, amount: 8.50, status: 'Paid', date: '2023-09-30' },
  ];

  const eligibilityCheck = () => {
    if (salaryData.leftReferrals !== salaryData.rightReferrals) {
      return {
        eligible: false,
        message: `Need equal referrals on both sides. Current: Left ${salaryData.leftReferrals}, Right ${salaryData.rightReferrals}`
      };
    }
    if (salaryData.activeBV === 0) {
      return {
        eligible: false,
        message: 'No active BV available for salary calculation'
      };
    }
    return {
      eligible: true,
      message: 'All eligibility criteria met!'
    };
  };

  const eligibility = eligibilityCheck();

  return (
    <div className="max-w-full overflow-hidden">
      <div className="space-y-6">
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Monthly Salary</h2>
          
          {/* Salary Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-xl">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5" />
                <div>
                  <p className="text-sm text-green-100">Monthly Salary</p>
                  <p className="text-2xl font-bold">₹{salaryData.monthlySalary}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-xl">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <div>
                  <p className="text-sm text-blue-100">Active BV</p>
                  <p className="text-2xl font-bold">{salaryData.activeBV}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-xl">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <div>
                  <p className="text-sm text-purple-100">Next Payment</p>
                  <p className="text-sm font-bold">{salaryData.nextPaymentDate}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4 rounded-xl">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5" />
                <div>
                  <p className="text-sm text-orange-100">Total Earned</p>
                  <p className="text-2xl font-bold">₹{salaryData.totalEarned}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Eligibility Status */}
          <div className={`p-4 rounded-lg mb-6 ${
            eligibility.eligible 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center space-x-2">
              {eligibility.eligible ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <Lock className="w-5 h-5 text-red-600" />
              )}
              <div>
                <h4 className={`font-semibold ${
                  eligibility.eligible ? 'text-green-800' : 'text-red-800'
                }`}>
                  Salary {eligibility.eligible ? 'Eligible' : 'Locked'}
                </h4>
                <p className={`text-sm ${
                  eligibility.eligible ? 'text-green-700' : 'text-red-700'
                }`}>
                  {eligibility.message}
                </p>
              </div>
            </div>
          </div>

          {/* Referral Balance */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h4 className="font-semibold mb-3">Referral Balance</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-lg">
                <p className="text-sm text-gray-600">Left Side Referrals</p>
                <p className="text-2xl font-bold text-purple-600">{salaryData.leftReferrals}</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-sm text-gray-600">Right Side Referrals</p>
                <p className="text-2xl font-bold text-orange-600">{salaryData.rightReferrals}</p>
              </div>
            </div>
          </div>

          {/* Salary Calculation */}
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Salary Calculation</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p>• Monthly Salary = 2.5% of Active BV</p>
              <p>• Current Calculation: 2.5% × {salaryData.activeBV} BV = ₹{salaryData.monthlySalary}</p>
              <p>• Credited every 30th day until BV expires</p>
              <p>• Requires equal direct referrals on both sides</p>
            </div>
          </div>
        </div>

        {/* Salary History */}
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Salary History</h3>
          
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left p-3">Month</th>
                    <th className="text-left p-3">Active BV</th>
                    <th className="text-left p-3">Amount</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {salaryHistory.map((salary) => (
                    <tr key={salary.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{salary.month}</td>
                      <td className="p-3">{salary.bv} BV</td>
                      <td className="p-3">₹{salary.amount}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          salary.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {salary.status}
                        </span>
                      </td>
                      <td className="p-3">{salary.date}</td>
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

export default SalaryTab;
