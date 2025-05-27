
import { useState } from 'react';
import { Search, Eye, Edit, Ban, RotateCcw, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const UserManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const usersPerPage = 10;

  // Mock data - will be from database
  const users = Array.from({ length: 50 }, (_, i) => ({
    id: `GB${String(i + 1).padStart(5, '0')}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    mobile: `+91-98765${String(i).padStart(5, '0')}`,
    joinedDate: `2024-01-${String((i % 30) + 1).padStart(2, '0')}`,
    referralCode: `REF${String(i + 1).padStart(5, '0')}`,
    referralUpline: i > 0 ? `GB${String(Math.floor(i / 2) + 1).padStart(5, '0')}` : 'None',
    walletBalance: Math.floor(Math.random() * 50000),
    status: Math.random() > 0.1 ? 'Active' : 'Blocked'
  }));

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  const handleAction = (action: string, userId: string) => {
    console.log(`${action} user:`, userId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        <div className="text-sm text-gray-600">
          Total Users: {filteredUsers.length}
        </div>
      </div>

      {/* Search */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, email, or user ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            Export CSV
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-3">User ID</th>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Mobile</th>
                <th className="text-left p-3">Joined Date</th>
                <th className="text-left p-3">Referral Code</th>
                <th className="text-left p-3">Upline</th>
                <th className="text-left p-3">Wallet Balance</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{user.id}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.mobile}</td>
                  <td className="p-3">{user.joinedDate}</td>
                  <td className="p-3">{user.referralCode}</td>
                  <td className="p-3">{user.referralUpline}</td>
                  <td className="p-3">₹{user.walletBalance.toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAction('view', user.id)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAction('edit', user.id)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAction(user.status === 'Active' ? 'block' : 'unblock', user.id)}
                      >
                        {user.status === 'Active' ? <Ban className="w-4 h-4" /> : <RotateCcw className="w-4 h-4" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAction('delete', user.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(startIndex + usersPerPage, filteredUsers.length)} of {filteredUsers.length} users
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
