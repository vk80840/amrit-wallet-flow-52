
import { useAuth } from '@/hooks/useAuth';

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-2">Total Users</h3>
                <p className="text-3xl font-bold">1,234</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-2">Total Earnings</h3>
                <p className="text-3xl font-bold">₹56,789</p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-2">Pending KYC</h3>
                <p className="text-3xl font-bold">23</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-2">Pending Withdrawals</h3>
                <p className="text-3xl font-bold">12</p>
              </div>
            </div>
            
            <div className="mt-8 text-center text-gray-600">
              <p>Admin panel features will be implemented here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
