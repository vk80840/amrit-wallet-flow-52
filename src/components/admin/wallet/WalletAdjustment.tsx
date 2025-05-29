
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Search, Plus, Minus, History, User, Wallet, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface UserWallet {
  user_id: string;
  name: string;
  email: string;
  main_balance: number;
  topup_balance: number;
  stk_balance: number;
}

const WalletAdjustment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserWallet | null>(null);
  const [users, setUsers] = useState<UserWallet[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserWallet[]>([]);
  const [adjustmentType, setAdjustmentType] = useState<'add' | 'subtract'>('add');
  const [walletType, setWalletType] = useState<'main' | 'topup' | 'stk'>('main');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    if (searchTerm.length >= 2) {
      searchUsers();
    } else {
      setFilteredUsers([]);
    }
  }, [searchTerm]);

  const searchUsers = async () => {
    try {
      setSearchLoading(true);
      
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('id, user_id, name, email')
        .or(`name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,user_id.ilike.%${searchTerm}%`)
        .limit(10);

      if (usersError) throw usersError;

      if (usersData) {
        const usersWithWallets = await Promise.all(
          usersData.map(async (user) => {
            // Get main wallet
            const { data: walletData } = await supabase
              .from('wallets')
              .select('main_balance, topup_balance')
              .eq('user_id', user.id)
              .single();

            // Get STK wallet
            const { data: stkData } = await supabase
              .from('stk_wallets')
              .select('total_balance')
              .eq('user_id', user.id)
              .single();

            return {
              user_id: user.user_id,
              name: user.name,
              email: user.email,
              main_balance: parseFloat(walletData?.main_balance?.toString() || '0'),
              topup_balance: parseFloat(walletData?.topup_balance?.toString() || '0'),
              stk_balance: stkData?.total_balance || 0
            };
          })
        );

        setFilteredUsers(usersWithWallets);
      }
    } catch (error) {
      console.error('Error searching users:', error);
      toast({
        title: "Error",
        description: "Failed to search users",
        variant: "destructive",
      });
    } finally {
      setSearchLoading(false);
    }
  };

  const selectUser = (user: UserWallet) => {
    setSelectedUser(user);
    setFilteredUsers([]);
    setSearchTerm('');
  };

  const handleAdjustment = async () => {
    if (!selectedUser || !amount || !reason) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const adjustmentAmount = parseFloat(amount);
    if (isNaN(adjustmentAmount) || adjustmentAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid positive amount",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      // Get user ID
      const { data: userData } = await supabase
        .from('users')
        .select('id')
        .eq('user_id', selectedUser.user_id)
        .single();

      if (!userData) {
        throw new Error('User not found');
      }

      const finalAmount = adjustmentType === 'subtract' ? -adjustmentAmount : adjustmentAmount;

      if (walletType === 'stk') {
        // Handle STK wallet adjustment
        const { error: stkError } = await supabase
          .from('stk_wallets')
          .update({
            total_balance: selectedUser.stk_balance + Math.round(finalAmount),
            updated_at: new Date().toISOString()
          })
          .eq('user_id', userData.id);

        if (stkError) throw stkError;

        // Create STK transaction record
        await supabase
          .from('stk_transactions')
          .insert({
            user_id: userData.id,
            type: adjustmentType === 'add' ? 'buy' : 'sell',
            amount: Math.round(Math.abs(finalAmount)),
            price: 1.0,
            total_cost: Math.abs(finalAmount)
          });
      } else {
        // Handle main/topup wallet adjustment
        const updateField = walletType === 'main' ? 'main_balance' : 'topup_balance';
        const currentBalance = walletType === 'main' ? selectedUser.main_balance : selectedUser.topup_balance;
        
        const { error: walletError } = await supabase
          .from('wallets')
          .update({
            [updateField]: currentBalance + finalAmount,
            updated_at: new Date().toISOString()
          })
          .eq('user_id', userData.id);

        if (walletError) throw walletError;

        // Create transaction record
        await supabase
          .from('transactions')
          .insert({
            user_id: userData.id,
            type: adjustmentType === 'add' ? 'deposit' : 'withdrawal',
            amount: Math.abs(finalAmount),
            status: 'completed',
            description: `Admin adjustment: ${reason}`,
            reference_id: `ADJ_${Date.now()}`
          });
      }

      toast({
        title: "Success",
        description: `Wallet adjusted successfully`,
      });

      // Reset form
      setSelectedUser(null);
      setAmount('');
      setReason('');
      setAdjustmentType('add');
      setWalletType('main');

    } catch (error) {
      console.error('Error adjusting wallet:', error);
      toast({
        title: "Error",
        description: "Failed to adjust wallet",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Wallet Adjustment</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Search User</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="search">Search by Name, Email, or User ID</Label>
              <Input
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter name, email, or user ID..."
                className="mt-1"
              />
            </div>

            {/* Search Results */}
            {searchLoading && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            )}

            {filteredUsers.length > 0 && (
              <div className="border rounded-lg max-h-60 overflow-y-auto">
                {filteredUsers.map((user, index) => (
                  <div
                    key={index}
                    onClick={() => selectUser(user)}
                    className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-sm text-gray-500">ID: {user.user_id}</p>
                      </div>
                      <div className="text-right text-sm">
                        <p>Main: ₹{user.main_balance.toFixed(2)}</p>
                        <p>Topup: ₹{user.topup_balance.toFixed(2)}</p>
                        <p>STK: {user.stk_balance}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Selected User */}
            {selectedUser && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <User className="w-8 h-8 text-blue-600" />
                    <div className="flex-1">
                      <p className="font-medium">{selectedUser.name}</p>
                      <p className="text-sm text-gray-600">{selectedUser.email}</p>
                      <p className="text-sm text-gray-500">ID: {selectedUser.user_id}</p>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                    <div className="text-center p-2 bg-white rounded">
                      <p className="text-gray-600">Main Balance</p>
                      <p className="font-bold">₹{selectedUser.main_balance.toFixed(2)}</p>
                    </div>
                    <div className="text-center p-2 bg-white rounded">
                      <p className="text-gray-600">Topup Balance</p>
                      <p className="font-bold">₹{selectedUser.topup_balance.toFixed(2)}</p>
                    </div>
                    <div className="text-center p-2 bg-white rounded">
                      <p className="text-gray-600">STK Balance</p>
                      <p className="font-bold">{selectedUser.stk_balance}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* Adjustment Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wallet className="w-5 h-5" />
              <span>Wallet Adjustment</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Adjustment Type</Label>
                <Select value={adjustmentType} onValueChange={(value: 'add' | 'subtract') => setAdjustmentType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="add">
                      <div className="flex items-center space-x-2">
                        <Plus className="w-4 h-4 text-green-600" />
                        <span>Add Funds</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="subtract">
                      <div className="flex items-center space-x-2">
                        <Minus className="w-4 h-4 text-red-600" />
                        <span>Subtract Funds</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Wallet Type</Label>
                <Select value={walletType} onValueChange={(value: 'main' | 'topup' | 'stk') => setWalletType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">Main Wallet</SelectItem>
                    <SelectItem value="topup">Topup Wallet</SelectItem>
                    <SelectItem value="stk">STK Wallet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount..."
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="reason">Reason for Adjustment</Label>
              <Textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter reason for this adjustment..."
                className="mt-1"
                rows={3}
              />
            </div>

            <Button
              onClick={handleAdjustment}
              disabled={!selectedUser || !amount || !reason || loading}
              className="w-full"
            >
              {loading ? 'Processing...' : `${adjustmentType === 'add' ? 'Add' : 'Subtract'} ${walletType === 'stk' ? 'STK' : '₹' + amount} ${adjustmentType === 'add' ? 'to' : 'from'} ${walletType} Wallet`}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WalletAdjustment;
