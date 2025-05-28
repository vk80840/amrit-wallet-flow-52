import { useState } from 'react';
import { DollarSign, Calendar, TrendingUp, Lock, CheckCircle } from 'lucide-react';
import { getUserRank, getNextRank, RANKS } from '@/utils/rankSystem';
import RankBadge from '../rank/RankBadge';

const SalaryTab = () => {
  // Mock data - will be from database
  const salaryData = {
    leftBV: 45000,
    rightBV: 35000,
    balancedBV: Math.min(45000, 35000), // 35,000 BV balanced
    currentSlab: 2, // 2nd slab (25k-60k)
    monthlySalary: 500, // Based on 2nd slab
    isEligible: true,
    nextPaymentDate: '2024-01-30',
    totalEarned: 4500
  };

  // New BV-based salary slabs
  const salarySlabs = [
    { level: 1, minBV: 10000, maxBV: 24999, salary: 250 },
    { level: 2, minBV: 25000, maxBV: 59999, salary: 500 },
    { level: 3, minBV: 60000, maxBV: 149999, salary: 1000 },
    { level: 4, minBV: 150000, maxBV: 349999, salary: 2000 },
    { level: 5, minBV: 350000, maxBV: 999999, salary: 4000 },
    { level: 6, minBV: 1000000, maxBV: 2499999, salary: 8000 },
    { level: 7, minBV: 2500000, maxBV: 5999999, salary: 20000 },
    { level: 8, minBV: 6000000, maxBV: 19999999, salary: 40000 },
    { level: 9, minBV: 20000000, maxBV: 49999999, salary: 100000 },
    { level: 10, minBV: 50000000, maxBV: 99999999, salary: 100000 },
    { level: 11, minBV: 100000000, maxBV: Infinity, salary: 'CTO 2%' }
  ];

  const salaryHistory = [
    { id: 1, month: 'December 2023', balancedBV: 30000, slab: 2, amount: 500, status: 'Paid', date: '2023-12-30' },
    { id: 2, month: 'November 2023', balancedBV: 25000, slab: 2, amount: 500, status: 'Paid', date: '2023-11-30' },
    { id: 3, month: 'October 2023', balancedBV: 8000, slab: 0, amount: 0, status: 'Locked', date: '2023-10-30' },
    { id: 4, month: 'September 2023', balancedBV: 15000, slab: 1, amount: 250, status: 'Paid', date: '2023-09-30' },
  ];

  const getCurrentSlab = () => {
    const balanced = salaryData.balancedBV;
    return salarySlabs.find(slab => balanced >= slab.minBV && balanced <= slab.maxBV) || null;
  };

  const getNextSlab = () => {
    const currentSlab = getCurrentSlab();
    if (!currentSlab) return salarySlabs[0];
    const nextIndex = salarySlabs.findIndex(slab => slab.level === currentSlab.level) + 1;
    return nextIndex < salarySlabs.length ? salarySlabs[nextIndex] : null;
  };

  const formatNumber = (num) => {
    if (num >= 10000000) return `${(num / 10000000).toFixed(1)}Cr`;
    if (num >= 100000) return `${(num / 100000).toFixed(1)}L`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  // Updated eligibility check - only completed slabs count
  const eligibilityCheck = () => {
    const currentSlab = getCurrentSlab();
    if (!currentSlab) {
      return {
        eligible: false,
        message: `Need minimum 10,000 balanced BV to reach Level 1. Current: ${formatNumber(salaryData.balancedBV)} BV`
      };
    }
    
    // Check if user has fully completed the slab (reached the max BV for that level)
    const isSlabCompleted = salaryData.balancedBV >= currentSlab.maxBV || currentSlab.maxBV === Infinity;
    const completedLevel = isSlabCompleted ? currentSlab.level : currentSlab.level - 1;
    
    if (completedLevel < 1) {
      return {
        eligible: false,
        message: `Complete Level 1 slab (${formatNumber(salarySlabs[0].maxBV)} BV) to be eligible. Current: ${formatNumber(salaryData.balancedBV)} BV`
      };
    }
    
    return {
      eligible: true,
      message: `Eligible for Level ${completedLevel} salary! Completed ${completedLevel} slab${completedLevel > 1 ? 's' : ''}.`
    };
  };

  const eligibility = eligibilityCheck();
  const currentSlab = getCurrentSlab();
  const nextSlab = getNextSlab();
  
  // Get user rank based on completed salary levels only
  const completedSalaryLevel = eligibility.eligible ? Math.floor(salaryData.balancedBV / salarySlabs[0].minBV) : 0;
  const userRank = getUserRank(completedSalaryLevel);
  const nextRank = getNextRank(completedSalaryLevel);

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="space-y-4 md:space-y-6">
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-3 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6">
            <h2 className="text-lg md:text-2xl font-bold text-gray-800 mb-2 sm:mb-0">Monthly Salary</h2>
            <div className="flex items-center space-x-4">
              <RankBadge rank={userRank} size="md" />
              {nextRank && (
                <div className="text-xs text-gray-600">
                  Next: <RankBadge rank={nextRank} size="sm" />
                </div>
              )}
            </div>
          </div>
          
          {/* Salary Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-3 md:p-4 rounded-xl">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 md:w-5 md:h-5" />
                <div>
                  <p className="text-xs md:text-sm text-green-100">Monthly Salary</p>
                  <p className="text-lg md:text-2xl font-bold">₹{currentSlab ? (typeof currentSlab.salary === 'number' ? currentSlab.salary.toLocaleString() : currentSlab.salary) : '0'}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-3 md:p-4 rounded-xl">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
                <div>
                  <p className="text-xs md:text-sm text-blue-100">Balanced BV</p>
                  <p className="text-lg md:text-2xl font-bold">{formatNumber(salaryData.balancedBV)}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-3 md:p-4 rounded-xl">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                <div>
                  <p className="text-xs md:text-sm text-purple-100">Next Payment</p>
                  <p className="text-xs md:text-sm font-bold">{salaryData.nextPaymentDate}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-3 md:p-4 rounded-xl">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 md:w-5 md:h-5" />
                <div>
                  <p className="text-xs md:text-sm text-orange-100">Total Earned</p>
                  <p className="text-lg md:text-2xl font-bold">₹{salaryData.totalEarned.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Eligibility Status */}
          <div className={`p-3 md:p-4 rounded-lg mb-4 md:mb-6 ${
            eligibility.eligible 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center space-x-2">
              {eligibility.eligible ? (
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
              ) : (
                <Lock className="w-4 h-4 md:w-5 md:h-5 text-red-600" />
              )}
              <div>
                <h4 className={`font-semibold text-sm md:text-base ${
                  eligibility.eligible ? 'text-green-800' : 'text-red-800'
                }`}>
                  Salary {eligibility.eligible ? 'Eligible' : 'Locked'}
                </h4>
                <p className={`text-xs md:text-sm ${
                  eligibility.eligible ? 'text-green-700' : 'text-red-700'
                }`}>
                  {eligibility.message}
                </p>
              </div>
            </div>
          </div>

          {/* Rank System Information */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 p-3 md:p-4 rounded-lg mb-4 md:mb-6">
            <h4 className="font-semibold text-purple-800 mb-2 text-sm md:text-base">Rank System</h4>
            <div className="text-xs md:text-sm text-purple-700 space-y-1">
              <p>• Your current rank: <RankBadge rank={userRank} size="sm" /></p>
              <p>• Ranks are based on completed salary levels only</p>
              <p>• You must fully complete each salary slab to qualify for the next rank</p>
              {nextRank && (
                <p>• Next rank: <RankBadge rank={nextRank} size="sm" /> (requires completing Level {nextRank.requiredSalaryLevel})</p>
              )}
            </div>
          </div>

          {/* BV Balance */}
          <div className="bg-gray-50 p-3 md:p-4 rounded-lg mb-4 md:mb-6">
            <h4 className="font-semibold mb-3 text-sm md:text-base">BV Balance</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div className="bg-white p-3 rounded-lg">
                <p className="text-xs md:text-sm text-gray-600">Left Side BV</p>
                <p className="text-xl md:text-2xl font-bold text-purple-600">{formatNumber(salaryData.leftBV)}</p>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <p className="text-xs md:text-sm text-gray-600">Right Side BV</p>
                <p className="text-xl md:text-2xl font-bold text-orange-600">{formatNumber(salaryData.rightBV)}</p>
              </div>
            </div>
            <div className="mt-3 bg-white p-3 rounded-lg">
              <p className="text-xs md:text-sm text-gray-600">Balanced BV (Minimum of both sides)</p>
              <p className="text-xl md:text-2xl font-bold text-green-600">{formatNumber(salaryData.balancedBV)}</p>
            </div>
          </div>

          {/* Current Slab Info */}
          {currentSlab && (
            <div className="bg-blue-50 border border-blue-200 p-3 md:p-4 rounded-lg mb-4 md:mb-6">
              <h4 className="font-semibold text-blue-800 mb-2 text-sm md:text-base">Current Salary Level {currentSlab.level}</h4>
              <div className="text-xs md:text-sm text-blue-700 space-y-1">
                <p>• Required: {formatNumber(currentSlab.minBV)} - {currentSlab.maxBV === Infinity ? '∞' : formatNumber(currentSlab.maxBV)} BV</p>
                <p>• Monthly Salary: ₹{typeof currentSlab.salary === 'number' ? currentSlab.salary.toLocaleString() : currentSlab.salary}</p>
                <p>• Your Balanced BV: {formatNumber(salaryData.balancedBV)} BV</p>
              </div>
            </div>
          )}

          {/* Next Level Progress */}
          {nextSlab && (
            <div className="bg-yellow-50 border border-yellow-200 p-3 md:p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2 text-sm md:text-base">Next Level {nextSlab.level}</h4>
              <div className="text-xs md:text-sm text-yellow-700 space-y-1">
                <p>• Target: {formatNumber(nextSlab.minBV)} BV</p>
                <p>• Salary: ₹{typeof nextSlab.salary === 'number' ? nextSlab.salary.toLocaleString() : nextSlab.salary}</p>
                <p>• Needed: {formatNumber(nextSlab.minBV - salaryData.balancedBV)} more balanced BV</p>
              </div>
              <div className="w-full bg-yellow-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((salaryData.balancedBV / nextSlab.minBV) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Salary Slabs Table */}
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-3 md:p-6">
          <h3 className="text-base md:text-xl font-bold text-gray-800 mb-4">Salary Slabs & Ranks</h3>
          
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <table className="w-full text-xs md:text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left p-2 md:p-3">Level</th>
                    <th className="text-left p-2 md:p-3">Balanced BV Range</th>
                    <th className="text-left p-2 md:p-3">Monthly Salary</th>
                    <th className="text-left p-2 md:p-3">Rank</th>
                    <th className="text-left p-2 md:p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {salarySlabs.map((slab) => {
                    const slabRank = RANKS.find(rank => rank.requiredSalaryLevel === slab.level);
                    return (
                      <tr key={slab.level} className={`border-b hover:bg-gray-50 ${
                        currentSlab?.level === slab.level ? 'bg-blue-50' : ''
                      }`}>
                        <td className="p-2 md:p-3 font-medium">Level {slab.level}</td>
                        <td className="p-2 md:p-3">
                          {formatNumber(slab.minBV)} - {slab.maxBV === Infinity ? '∞' : formatNumber(slab.maxBV)}
                        </td>
                        <td className="p-2 md:p-3 font-bold">
                          ₹{typeof slab.salary === 'number' ? slab.salary.toLocaleString() : slab.salary}
                        </td>
                        <td className="p-2 md:p-3">
                          {slabRank && <RankBadge rank={slabRank} size="sm" />}
                        </td>
                        <td className="p-2 md:p-3">
                          {currentSlab?.level === slab.level ? (
                            <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                              Current
                            </span>
                          ) : salaryData.balancedBV >= slab.minBV ? (
                            <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                              Achieved
                            </span>
                          ) : (
                            <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                              Locked
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Salary History */}
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-3 md:p-6">
          <h3 className="text-base md:text-xl font-bold text-gray-800 mb-4">Salary History</h3>
          
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <table className="w-full text-xs md:text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left p-2 md:p-3">Month</th>
                    <th className="text-left p-2 md:p-3">Balanced BV</th>
                    <th className="text-left p-2 md:p-3">Level</th>
                    <th className="text-left p-2 md:p-3">Amount</th>
                    <th className="text-left p-2 md:p-3">Status</th>
                    <th className="text-left p-2 md:p-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {salaryHistory.map((salary) => (
                    <tr key={salary.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 md:p-3">{salary.month}</td>
                      <td className="p-2 md:p-3">{formatNumber(salary.balancedBV)} BV</td>
                      <td className="p-2 md:p-3">Level {salary.slab || 'N/A'}</td>
                      <td className="p-2 md:p-3">₹{salary.amount.toLocaleString()}</td>
                      <td className="p-2 md:p-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          salary.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {salary.status}
                        </span>
                      </td>
                      <td className="p-2 md:p-3">{salary.date}</td>
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
