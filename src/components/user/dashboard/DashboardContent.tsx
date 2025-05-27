
import { useAuth } from '@/hooks/useAuth';
import { User, Mail, Phone, IdCard, Copy, Star } from 'lucide-react';

const DashboardContent = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Purchased Amount', value: '₹25,000', color: 'from-blue-500 to-blue-600' },
    { label: 'Referral Bonus', value: '₹3,750', color: 'from-green-500 to-green-600' },
    { label: 'Total Team', value: '156', color: 'from-purple-500 to-purple-600' },
    { label: 'Direct Team', value: '24', color: 'from-orange-500 to-orange-600' },
    { label: 'Salary', value: '₹625', color: 'from-pink-500 to-pink-600' },
    { label: 'Business Volume', value: '5,000 BV', color: 'from-indigo-500 to-indigo-600' },
  ];

  const ranks = [
    { name: 'Wood', required: '0 BV', current: true },
    { name: 'Silver', required: '1,000 BV', current: false },
    { name: 'Gold', required: '5,000 BV', current: false },
    { name: 'Platinum', required: '15,000 BV', current: false },
    { name: 'Diamond', required: '50,000 BV', current: false },
    { name: 'Ruby', required: '100,000 BV', current: false },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Section */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user?.name?.charAt(0) || 'U'}
          </div>
          
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>{user?.mobile}</span>
              </div>
              <div className="flex items-center space-x-2">
                <IdCard className="w-4 h-4" />
                <span>ID: {user?.id}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4" />
                <span>Rank: {user?.rank}</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              user?.kycStatus === 'approved' ? 'bg-green-100 text-green-800' :
              user?.kycStatus === 'rejected' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              KYC: {user?.kycStatus}
            </div>
          </div>
        </div>
      </div>

      {/* Wallet Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">Top-up Balance</h3>
          <p className="text-3xl font-bold">₹8,250</p>
          <p className="text-blue-100 text-sm mt-1">Available for shopping</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">Main Balance</h3>
          <p className="text-3xl font-bold">₹12,345</p>
          <p className="text-green-100 text-sm mt-1">Withdrawable amount</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className={`bg-gradient-to-br ${stat.color} text-white p-4 rounded-xl`}>
            <h4 className="font-medium text-sm opacity-90">{stat.label}</h4>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Referral Section */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Referral Information</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700">Referral Code:</span>
            <div className="flex items-center space-x-2">
              <code className="bg-white px-3 py-1 rounded border font-mono">{user?.referralCode}</code>
              <button className="p-1 text-blue-600 hover:text-blue-800">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700 text-sm">Left Referral Link:</span>
              <div className="flex items-center justify-between mt-1">
                <code className="text-xs bg-white px-2 py-1 rounded border truncate flex-1 mr-2">
                  https://alkalineamrit.com/signup?ref={user?.referralCode}&side=left
                </code>
                <button className="p-1 text-blue-600 hover:text-blue-800 flex-shrink-0">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700 text-sm">Right Referral Link:</span>
              <div className="flex items-center justify-between mt-1">
                <code className="text-xs bg-white px-2 py-1 rounded border truncate flex-1 mr-2">
                  https://alkalineamrit.com/signup?ref={user?.referralCode}&side=right
                </code>
                <button className="p-1 text-blue-600 hover:text-blue-800 flex-shrink-0">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rank Box */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Rank Progress</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {ranks.map((rank, index) => (
            <div key={index} className={`text-center p-4 rounded-lg border-2 ${
              rank.current ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${
                rank.current ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                <Star className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-sm">{rank.name}</h4>
              <p className="text-xs text-gray-600 mt-1">{rank.required}</p>
              {rank.current && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full w-3/4"></div>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">Current Rank</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
