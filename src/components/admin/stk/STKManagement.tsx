
import { useState } from 'react';
import { Coins, TrendingUp, Users, Edit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const STKManagement = () => {
  const [newPrice, setNewPrice] = useState('');
  
  // Mock data - will be from database
  const stkData = {
    totalSupply: 1000000,
    distributedSTK: 150000,
    remainingSTK: 850000,
    currentPrice: 0.50,
    totalUsers: 1234,
    stkHolders: 456
  };

  const recentTransactions = [
    { id: 1, user: 'GB00001', type: 'Buy', amount: 1000, price: 0.50, total: 500, date: '2024-01-25' },
    { id: 2, user: 'GB00002', type: 'Sell', amount: 500, price: 0.52, total: 260, date: '2024-01-25' },
    { id: 3, user: 'GB00003', type: 'Reward', amount: 100, price: 0.50, total: 50, date: '2024-01-24' },
    { id: 4, user: 'GB00004', type: 'Buy', amount: 2000, price: 0.48, total: 960, date: '2024-01-24' },
  ];

  const handlePriceUpdate = () => {
    console.log('Update STK price to:', newPrice);
    setNewPrice('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">STK Management</h1>
        <div className="text-sm text-gray-600">
          Current Price: ₹{stkData.currentPrice}
        </div>
      </div>

      {/* STK Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-xl">
          <div className="flex items-center space-x-3">
            <Coins className="w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold">Remaining STK</h3>
              <p className="text-3xl font-bold">{stkData.remainingSTK.toLocaleString()}</p>
              <p className="text-yellow-100 text-sm">{((stkData.remainingSTK / stkData.totalSupply) * 100).toFixed(1)}% of total supply</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold">Distributed STK</h3>
              <p className="text-3xl font-bold">{stkData.distributedSTK.toLocaleString()}</p>
              <p className="text-blue-100 text-sm">{((stkData.distributedSTK / stkData.totalSupply) * 100).toFixed(1)}% distributed</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold">STK Holders</h3>
              <p className="text-3xl font-bold">{stkData.stkHolders}</p>
              <p className="text-purple-100 text-sm">{((stkData.stkHolders / stkData.totalUsers) * 100).toFixed(1)}% of users</p>
            </div>
          </div>
        </div>
      </div>

      {/* Price Management */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Price Management</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Current STK Price</h4>
            <div className="text-3xl font-bold text-green-600">₹{stkData.currentPrice}</div>
            <p className="text-sm text-gray-600 mt-1">Last updated: 2 hours ago</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <Label htmlFor="newPrice" className="text-base font-semibold">Update STK Price</Label>
            <div className="flex space-x-2 mt-2">
              <Input
                id="newPrice"
                type="number"
                step="0.01"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                placeholder="Enter new price"
              />
              <Button onClick={handlePriceUpdate} disabled={!newPrice}>
                <Edit2 className="w-4 h-4 mr-2" />
                Update
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Price will update immediately for all users</p>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent STK Transactions</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-3">User ID</th>
                <th className="text-left p-3">Type</th>
                <th className="text-left p-3">Amount (STK)</th>
                <th className="text-left p-3">Price (₹)</th>
                <th className="text-left p-3">Total (₹)</th>
                <th className="text-left p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{transaction.user}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      transaction.type === 'Buy' ? 'bg-green-100 text-green-800' :
                      transaction.type === 'Sell' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="p-3">{transaction.amount.toLocaleString()}</td>
                  <td className="p-3">₹{transaction.price}</td>
                  <td className="p-3">₹{transaction.total}</td>
                  <td className="p-3">{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Supply Statistics */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Supply Statistics</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Supply:</span>
            <span className="font-semibold">{stkData.totalSupply.toLocaleString()} STK</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${(stkData.distributedSTK / stkData.totalSupply) * 100}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between text-sm text-gray-600">
            <span>Distributed: {stkData.distributedSTK.toLocaleString()} ({((stkData.distributedSTK / stkData.totalSupply) * 100).toFixed(1)}%)</span>
            <span>Remaining: {stkData.remainingSTK.toLocaleString()} ({((stkData.remainingSTK / stkData.totalSupply) * 100).toFixed(1)}%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default STKManagement;
