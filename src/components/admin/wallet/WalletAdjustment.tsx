
import { useState } from 'react';
import { Search, Edit, Plus, Minus, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const WalletAdjustment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [adjustmentType, setAdjustmentType] = useState('');
  const [amount, setAmount] = useState('');
  const [remark, setRemark] = useState('');

  // Mock data - will be from database
  const searchResults = [
    {
      id: 'GB00001',
      name: 'John Doe',
      email: 'john@example.com',
      mobile: '+91-9876543210',
      mainWallet: 12500,
      stkWallet: 850,
      totalBV: 5000
    },
    {
      id: 'GB00002',
      name: 'Jane Smith',
      email: 'jane@example.com',
      mobile: '+91-9876543211',
      mainWallet: 8750,
      stkWallet: 1200,
      totalBV: 3500
    }
  ];

  const adjustmentHistory = [
    {
      id: 1,
      timestamp: '2024-01-25 14:30:25',
      admin: 'Neeraj',
      userId: 'GB00001',
      userName: 'John Doe',
      type: 'Main Wallet',
      action: 'Credit',
      amount: 5000,
      previousBalance: 7500,
      newBalance: 12500,
      remark: 'Compensation for technical issue'
    },
    {
      id: 2,
      timestamp: '2024-01-25 14:25:10',
      admin: 'Vansh',
      userId: 'GB00002',
      userName: 'Jane Smith',
      type: 'STK Wallet',
      action: 'Credit',
      amount: 200,
      previousBalance: 1000,
      newBalance: 1200,
      remark: 'Bonus STK reward'
    },
    {
      id: 3,
      timestamp: '2024-01-25 14:20:45',
      admin: 'Deepanshu',
      userId: 'GB00003',
      userName: 'Bob Wilson',
      type: 'Main Wallet',
      action: 'Debit',
      amount: 1000,
      previousBalance: 6000,
      newBalance: 5000,
      remark: 'Correction for duplicate credit'
    }
  ];

  const handleSearch = () => {
    console.log('Searching for user:', searchTerm);
    // In real implementation, this would search the database
  };

  const handleAdjustment = (e) => {
    e.preventDefault();
    if (!selectedUser || !adjustmentType || !amount || !remark) {
      alert('Please fill all required fields');
      return;
    }
    
    console.log('Making adjustment:', {
      user: selectedUser.id,
      type: adjustmentType,
      amount: parseFloat(amount),
      remark
    });
    
    // Reset form
    setAdjustmentType('');
    setAmount('');
    setRemark('');
    alert('Wallet adjustment completed successfully');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Manual Wallet Adjustment</h1>

      {/* User Search */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Search User</h2>
        
        <div className="flex space-x-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Enter User ID or Email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={handleSearch}>
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>

        {/* Search Results */}
        {searchTerm && (
          <div className="mt-4 space-y-2">
            {searchResults.map((user) => (
              <div
                key={user.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedUser?.id === user.id ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedUser(user)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{user.name}</h4>
                    <p className="text-sm text-gray-600">ID: {user.id} | Email: {user.email}</p>
                    <p className="text-sm text-gray-600">Mobile: {user.mobile}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">Main: ₹{user.mainWallet.toLocaleString()}</p>
                    <p className="text-sm">STK: {user.stkWallet.toLocaleString()}</p>
                    <p className="text-sm">BV: {user.totalBV.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Adjustment Form */}
      {selectedUser && (
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Adjust Wallet for {selectedUser.name}</h2>
          
          {/* Current Balances */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800">Main Wallet</h4>
              <p className="text-2xl font-bold text-green-600">₹{selectedUser.mainWallet.toLocaleString()}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800">STK Wallet</h4>
              <p className="text-2xl font-bold text-blue-600">{selectedUser.stkWallet.toLocaleString()} STK</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800">Total BV</h4>
              <p className="text-2xl font-bold text-purple-600">{selectedUser.totalBV.toLocaleString()} BV</p>
            </div>
          </div>

          <form onSubmit={handleAdjustment} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="adjustmentType">Wallet Type</Label>
                <select
                  id="adjustmentType"
                  value={adjustmentType}
                  onChange={(e) => setAdjustmentType(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Wallet Type</option>
                  <option value="mainWallet">Main Wallet (₹)</option>
                  <option value="stkWallet">STK Wallet</option>
                  <option value="bv">Business Volume (BV)</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="amount">Amount</Label>
                <div className="flex space-x-2">
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setAmount(prev => prev ? (parseFloat(prev) * -1).toString() : '')}
                  >
                    {amount && parseFloat(amount) > 0 ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Use positive for credit, negative for debit
                </p>
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="remark">Remark/Reason</Label>
                <textarea
                  id="remark"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  placeholder="Enter reason for adjustment"
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                <Edit className="w-4 h-4 mr-2" />
                Apply Adjustment
              </Button>
              <Button type="button" variant="outline" onClick={() => setSelectedUser(null)}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Adjustment History */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Adjustments</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-3">Timestamp</th>
                <th className="text-left p-3">Admin</th>
                <th className="text-left p-3">User</th>
                <th className="text-left p-3">Wallet Type</th>
                <th className="text-left p-3">Action</th>
                <th className="text-left p-3">Amount</th>
                <th className="text-left p-3">Previous</th>
                <th className="text-left p-3">New Balance</th>
                <th className="text-left p-3">Remark</th>
              </tr>
            </thead>
            <tbody>
              {adjustmentHistory.map((adjustment) => (
                <tr key={adjustment.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-mono text-xs">{adjustment.timestamp}</td>
                  <td className="p-3 font-medium">{adjustment.admin}</td>
                  <td className="p-3">
                    <div>
                      <p className="font-medium">{adjustment.userName}</p>
                      <p className="text-xs text-gray-600">{adjustment.userId}</p>
                    </div>
                  </td>
                  <td className="p-3">{adjustment.type}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      adjustment.action === 'Credit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {adjustment.action}
                    </span>
                  </td>
                  <td className="p-3 font-bold">
                    {adjustment.action === 'Credit' ? '+' : '-'}
                    {adjustment.type.includes('STK') ? adjustment.amount.toLocaleString() : `₹${adjustment.amount.toLocaleString()}`}
                  </td>
                  <td className="p-3">
                    {adjustment.type.includes('STK') ? adjustment.previousBalance.toLocaleString() : `₹${adjustment.previousBalance.toLocaleString()}`}
                  </td>
                  <td className="p-3 font-bold">
                    {adjustment.type.includes('STK') ? adjustment.newBalance.toLocaleString() : `₹${adjustment.newBalance.toLocaleString()}`}
                  </td>
                  <td className="p-3 max-w-xs truncate" title={adjustment.remark}>
                    {adjustment.remark}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WalletAdjustment;
