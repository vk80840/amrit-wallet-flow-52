
import { useState, useEffect } from 'react';
import { Search, Edit, Plus, Minus, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';

const WalletAdjustment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [adjustmentType, setAdjustmentType] = useState('');
  const [amount, setAmount] = useState('');
  const [remark, setRemark] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [adjustmentHistory, setAdjustmentHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAdjustmentHistory();
  }, []);

  const fetchAdjustmentHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select(`
          id,
          amount,
          type,
          description,
          created_at,
          users:user_id (name, user_id)
        `)
        .in('type', ['wallet_adjustment', 'stk_adjustment', 'bv_adjustment'])
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      const formattedHistory = data?.map((transaction, index) => ({
        id: transaction.id,
        timestamp: new Date(transaction.created_at).toLocaleString(),
        admin: 'Admin', // In real app, get from auth context
        userId: transaction.users?.user_id || 'Unknown',
        userName: transaction.users?.name || 'Unknown User',
        type: transaction.type === 'wallet_adjustment' ? 'Main Wallet' : 
              transaction.type === 'stk_adjustment' ? 'STK Wallet' : 'Business Volume',
        action: parseFloat(transaction.amount) > 0 ? 'Credit' : 'Debit',
        amount: Math.abs(parseFloat(transaction.amount)),
        previousBalance: 0, // Would need additional logic to calculate
        newBalance: 0, // Would need additional logic to calculate
        remark: transaction.description || 'No remark'
      })) || [];

      setAdjustmentHistory(formattedHistory);
    } catch (error) {
      console.error('Error fetching adjustment history:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select(`
          id,
          user_id,
          name,
          email,
          mobile,
          wallets (main_balance, topup_balance),
          stk_wallets (total_balance),
          business_volume (amount)
        `)
        .or(`user_id.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,name.ilike.%${searchTerm}%`);

      if (error) throw error;

      const formattedResults = data?.map(user => ({
        id: user.id,
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        mainWallet: user.wallets?.[0]?.main_balance || 0,
        stkWallet: user.stk_wallets?.[0]?.total_balance || 0,
        totalBV: user.business_volume?.reduce((sum, bv) => sum + bv.amount, 0) || 0
      })) || [];

      setSearchResults(formattedResults);
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdjustment = async (e) => {
    e.preventDefault();
    if (!selectedUser || !adjustmentType || !amount || !remark) {
      alert('Please fill all required fields');
      return;
    }

    try {
      setLoading(true);
      
      // Create transaction record
      const { error: transactionError } = await supabase
        .from('transactions')
        .insert({
          user_id: selectedUser.id,
          type: `${adjustmentType}_adjustment`,
          amount: parseFloat(amount),
          description: remark,
          status: 'completed'
        });

      if (transactionError) throw transactionError;

      // Update the respective wallet/balance
      if (adjustmentType === 'mainWallet') {
        const { error: walletError } = await supabase
          .from('wallets')
          .upsert({
            user_id: selectedUser.id,
            main_balance: selectedUser.mainWallet + parseFloat(amount)
          });
        if (walletError) throw walletError;
      } else if (adjustmentType === 'stkWallet') {
        const { error: stkError } = await supabase
          .from('stk_wallets')
          .upsert({
            user_id: selectedUser.id,
            total_balance: selectedUser.stkWallet + parseInt(amount)
          });
        if (stkError) throw stkError;
      }

      // Reset form
      setAdjustmentType('');
      setAmount('');
      setRemark('');
      setSelectedUser(null);
      setSearchTerm('');
      setSearchResults([]);
      
      // Refresh history
      fetchAdjustmentHistory();
      
      alert('Wallet adjustment completed successfully');
    } catch (error) {
      console.error('Error making adjustment:', error);
      alert('Error making adjustment. Please try again.');
    } finally {
      setLoading(false);
    }
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
              placeholder="Enter User ID, Email, or Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={handleSearch} disabled={loading}>
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
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
                    <p className="text-sm text-gray-600">ID: {user.user_id} | Email: {user.email}</p>
                    <p className="text-sm text-gray-600">Mobile: {user.mobile}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">Main: ₹{parseFloat(user.mainWallet).toLocaleString()}</p>
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
              <p className="text-2xl font-bold text-green-600">₹{parseFloat(selectedUser.mainWallet).toLocaleString()}</p>
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
              <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={loading}>
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
                <th className="text-left p-3">Remark</th>
              </tr>
            </thead>
            <tbody>
              {adjustmentHistory.length > 0 ? (
                adjustmentHistory.map((adjustment) => (
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
                    <td className="p-3 max-w-xs truncate" title={adjustment.remark}>
                      {adjustment.remark}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No adjustment history found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WalletAdjustment;
