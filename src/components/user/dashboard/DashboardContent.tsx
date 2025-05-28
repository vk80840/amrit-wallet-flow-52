
import { useAuth } from '@/hooks/useAuth';
import { User, Mail, Phone, IdCard, Copy, Star, Calendar, TrendingUp, Users, ShoppingBag, DollarSign, Award } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const DashboardContent = () => {
  const { user } = useAuth();
  
  // Mock user data with salary level (BV completed slabs)
  const mockUserData = {
    salaryLevel: 3, // User has completed 3 salary slabs
    totalBV: 15000, // Total Business Volume
    completedSlabs: 3, // Only slabs that are fully completed count towards salary
    nextSlabRequirement: 20000 // BV needed for next slab
  };

  // Get salary level rank
  const getSalaryRank = (level: number) => {
    const ranks = [
      { level: 0, name: 'Wood', color: 'from-amber-600 to-amber-700' },
      { level: 1, name: 'Iron', color: 'from-gray-600 to-gray-700' },
      { level: 2, name: 'Bronze', color: 'from-orange-600 to-orange-700' },
      { level: 3, name: 'Silver', color: 'from-gray-400 to-gray-500' },
      { level: 4, name: 'Gold', color: 'from-yellow-500 to-yellow-600' },
      { level: 5, name: 'Platinum', color: 'from-indigo-500 to-indigo-600' },
      { level: 6, name: 'Diamond', color: 'from-blue-500 to-blue-600' },
      { level: 7, name: 'Crown', color: 'from-purple-500 to-purple-600' },
      { level: 8, name: 'Royal Crown', color: 'from-pink-500 to-pink-600' }
    ];
    return ranks.find(rank => rank.level === level) || ranks[0];
  };

  const currentRank = getSalaryRank(mockUserData.salaryLevel);
  const nextRank = getSalaryRank(mockUserData.salaryLevel + 1);

  // Random profile pictures from Unsplash
  const profilePictures = [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616b612b6fd?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507081323647-4d250478b919?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face'
  ];

  // Get random profile picture based on user ID
  const getRandomProfilePicture = (userId: string) => {
    const index = userId ? userId.charCodeAt(userId.length - 1) % profilePictures.length : 0;
    return profilePictures[index];
  };

  const stats = [
    { 
      label: 'Purchased Amount', 
      value: '₹25,000', 
      color: 'from-blue-500 to-blue-600',
      icon: ShoppingBag
    },
    { 
      label: 'Referral Bonus', 
      value: '₹3,750', 
      color: 'from-green-500 to-green-600',
      icon: DollarSign
    },
    { 
      label: 'Total Team', 
      value: '156', 
      color: 'from-purple-500 to-purple-600',
      icon: Users
    },
    { 
      label: 'Direct Team', 
      value: '24', 
      color: 'from-orange-500 to-orange-600',
      icon: TrendingUp
    },
    { 
      label: 'Salary Level', 
      value: mockUserData.salaryLevel.toString(), 
      color: 'from-pink-500 to-pink-600',
      icon: Award
    },
    { 
      label: 'Business Volume', 
      value: `${mockUserData.totalBV.toLocaleString()} BV`, 
      color: 'from-indigo-500 to-indigo-600',
      icon: TrendingUp
    },
  ];

  return (
    <div className="space-y-6">
      {/* Enhanced Profile Section with Salary Rank */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-8">
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            <div className="relative">
              <img 
                src={getRandomProfilePicture(user?.id || '')}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{user?.name}</h2>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                    ID: {user?.id}
                  </span>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                    user?.kycStatus === 'approved' ? 'bg-green-100 text-green-800' :
                    user?.kycStatus === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    KYC: {user?.kycStatus}
                  </span>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r ${currentRank.color} text-white`}>
                    {currentRank.name} Rank
                  </span>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-blue-500" />
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-green-500" />
                    <span>{user?.mobile}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-purple-500" />
                    <span>Joined: 15 Jan 2024</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <span>Salary Level: {mockUserData.salaryLevel}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Top-up Balance</h3>
          <p className="text-3xl font-bold">₹8,250</p>
          <p className="text-blue-100 text-sm mt-1">Available for shopping</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold mb-2">Main Balance</h3>
          <p className="text-3xl font-bold">₹12,345</p>
          <p className="text-green-100 text-sm mt-1">Withdrawable amount</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className={`bg-gradient-to-br ${stat.color} text-white p-4 rounded-xl shadow-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-sm opacity-90">{stat.label}</h4>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <stat.icon className="w-8 h-8 opacity-80" />
            </div>
          </div>
        ))}
      </div>

      {/* Salary Rank Progress */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Salary Rank Progress</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Rank */}
          <div className="text-center p-6 rounded-lg border-2 border-blue-500 bg-gradient-to-r from-blue-50 to-green-50">
            <div className="mb-3">
              <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${currentRank.color} flex items-center justify-center text-white font-bold text-lg`}>
                {currentRank.name.charAt(0)}
              </div>
            </div>
            <h4 className="font-semibold text-lg text-gray-800">Current Rank</h4>
            <p className="text-sm text-gray-600 mt-1">{currentRank.name} - Level {currentRank.level}</p>
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full w-full"></div>
              </div>
              <p className="text-xs text-blue-600 mt-2 font-medium">Achieved</p>
            </div>
          </div>

          {/* Next Rank */}
          {nextRank && (
            <div className="text-center p-6 rounded-lg border-2 border-gray-300 bg-gradient-to-r from-gray-50 to-gray-100">
              <div className="mb-3">
                <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${nextRank.color} flex items-center justify-center text-white font-bold text-lg opacity-50`}>
                  {nextRank.name.charAt(0)}
                </div>
              </div>
              <h4 className="font-semibold text-lg text-gray-800">Next Rank</h4>
              <p className="text-sm text-gray-600 mt-1">{nextRank.name} - Level {nextRank.level}</p>
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-gray-400 to-gray-500 h-3 rounded-full w-1/4"></div>
                </div>
                <p className="text-xs text-gray-600 mt-2 font-medium">Complete next slab to unlock</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> Salary rank is based on completed salary slabs only. 
            Current BV: {mockUserData.totalBV.toLocaleString()} | 
            Next Slab Requirement: {mockUserData.nextSlabRequirement.toLocaleString()} BV
          </p>
        </div>
      </div>

      {/* Referral Section */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <Copy className="w-5 h-5 mr-2 text-blue-500" />
          Referral Information
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border">
            <span className="text-gray-700 font-medium">Referral Code:</span>
            <div className="flex items-center space-x-2">
              <code className="bg-white px-4 py-2 rounded-lg border font-mono text-lg font-bold text-blue-600">
                {user?.referralCode}
              </code>
              <button className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors">
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
              <span className="text-gray-700 text-sm font-medium">Left Referral Link:</span>
              <div className="flex items-center justify-between mt-2">
                <code className="text-xs bg-white px-3 py-2 rounded-lg border truncate flex-1 mr-2">
                  https://alkalineamrit.com/signup?ref={user?.referralCode}&side=left
                </code>
                <button className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-lg transition-colors flex-shrink-0">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border">
              <span className="text-gray-700 text-sm font-medium">Right Referral Link:</span>
              <div className="flex items-center justify-between mt-2">
                <code className="text-xs bg-white px-3 py-2 rounded-lg border truncate flex-1 mr-2">
                  https://alkalineamrit.com/signup?ref={user?.referralCode}&side=right
                </code>
                <button className="p-2 text-purple-600 hover:text-purple-800 hover:bg-purple-100 rounded-lg transition-colors flex-shrink-0">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
