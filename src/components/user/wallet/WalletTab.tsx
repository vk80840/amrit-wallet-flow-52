
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Wallet, CreditCard, ArrowUpRight, ArrowDownLeft, RefreshCw, Send } from 'lucide-react';

interface WalletData {
  main_balance: number;
  topup_balance: number;
}

interface Transaction {
  id: string;
  type: string;
  amount: number;
  status: string;
  created_at: string;
  description?: string;
}

const WalletTab = () => {
  const { userProfile } = useAuth();
  const [walletData, setWalletData] = useState<WalletData>({ main_balance: 0, topup_balance: 0 });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeAction, setActiveAction] = useState<string | null>(null);
  
  // Form states
  const [topupAmount, setTopupAmount] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [recipientUserId, setRecipientUserId] = useState('');
  const [verifiedRecipient, setVerifiedRecipient] = useState<any>(null);

  useEffect(() => {
    if (userProfile?.id) {
      fetchWalletData();
      fetchTransactions();
    }
  }, [userProfile]);

  const fetchWalletData = async () => {
    try {
      const { data, error } = await supabase
        .from('wallets')
        .select('main_balance, topup_balance')
        .eq('user_id', userProfile?.id)
        .single();

      if (error) throw error;
      setWalletData(data || { main_balance: 0, topup_balance: 0 });
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', userProfile?.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const verifyRecipient = async () => {
    if (!recipientUserId) return;

    try {
      const { data, error } = await supabase
        .from('users')
        .select('user_id, name')
        .eq('user_id', recipientUserId)
        .single();

      if (error || !data) {
        toast({
          title: "Error",
          description: "User ID not found",
          variant: "destructive"
        });
        return;
      }

      setVerifiedRecipient(data);
      toast({
        title: "User Verified",
        description: `Recipient: ${data.name}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify user",
        variant: "destructive"
      });
    }
  };

  const handleTopup = async () => {
    const amount = parseFloat(topupAmount);
    if (amount < 100) {
      toast({
        title: "Error",
        description: "Minimum top-up amount is ₹100",
        variant: "destructive"
      });
      return;
    }

    if (amount > walletData.main_balance) {
      toast({
        title: "Error",
        description: "Insufficient main balance",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('wallets')
        .update({
          main_balance: walletData.main_balance - amount,
          topup_balance: walletData.topup_balance + amount
        })
        .eq('user_id', userProfile?.id);

      if (error) throw error;

      // Record transaction
      await supabase.from('transactions').insert({
        user_id: userProfile?.id,
        type: 'topup',
        amount: amount,
        status: 'completed',
        description: 'Transfer to top-up balance'
      });

      toast({
        title: "Top-up Successful",
        description: `₹${amount} transferred to top-up balance`,
      });

      fetchWalletData();
      fetchTransactions();
      setActiveAction(null);
      setTopupAmount('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Transfer failed",
        variant: "destructive"
      });
    }
  };

  const handleTransfer = async () => {
    if (!verifiedRecipient) return;

    const amount = parseFloat(transferAmount);
    const taxAmount = amount * 0.08; // 8% tax
    const totalDeduction = amount + taxAmount;

    if (totalDeduction > walletData.main_balance) {
      toast({
        title: "Error",
        description: "Insufficient balance (including 8% tax)",
        variant: "destructive"
      });
      return;
    }

    try {
      // Deduct from sender
      const { error: senderError } = await supabase
        .from('wallets')
        .update({
          main_balance: walletData.main_balance - totalDeduction
        })
        .eq('user_id', userProfile?.id);

      if (senderError) throw senderError;

      // Add to recipient
      const { data: recipientWallet, error: recipientError } = await supabase
        .from('wallets')
        .select('main_balance')
        .eq('user_id', (await supabase.from('users').select('id').eq('user_id', recipientUserId).single()).data?.id)
        .single();

      if (recipientError) throw recipientError;

      await supabase
        .from('wallets')
        .update({
          main_balance: recipientWallet.main_balance + amount
        })
        .eq('user_id', (await supabase.from('users').select('id').eq('user_id', recipientUserId).single()).data?.id);

      // Record transactions
      await supabase.from('transactions').insert([
        {
          user_id: userProfile?.id,
          type: 'transfer_out',
          amount: -totalDeduction,
          status: 'completed',
          description: `Transfer to ${verifiedRecipient.name} (${recipientUserId}) + 8% tax`
        },
        {
          user_id: (await supabase.from('users').select('id').eq('user_id', recipientUserId).single()).data?.id,
          type: 'transfer_in',
          amount: amount,
          status: 'completed',
          description: `Transfer from ${userProfile?.name} (${userProfile?.user_id})`
        }
      ]);

      toast({
        title: "Transfer Successful",
        description: `₹${amount} sent to ${verifiedRecipient.name}`,
      });

      fetchWalletData();
      fetchTransactions();
      setActiveAction(null);
      setTransferAmount('');
      setRecipientUserId('');
      setVerifiedRecipient(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Transfer failed",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading wallet...</div>;
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Main Balance</span>
              <Wallet className="w-6 h-6" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₹{walletData.main_balance.toLocaleString()}</p>
            <p className="text-blue-100 text-sm">Withdrawable</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Top-up Balance</span>
              <CreditCard className="w-6 h-6" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">₹{walletData.topup_balance.toLocaleString()}</p>
            <p className="text-green-100 text-sm">Shopping wallet</p>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button onClick={() => window.location.hash = '#deposit'} className="h-20 flex-col space-y-2">
          <ArrowDownLeft className="w-6 h-6" />
          <span>Deposit</span>
        </Button>
        
        <Button onClick={() => window.location.hash = '#withdraw'} variant="outline" className="h-20 flex-col space-y-2">
          <ArrowUpRight className="w-6 h-6" />
          <span>Withdraw</span>
        </Button>
        
        <Button onClick={() => setActiveAction('topup')} variant="outline" className="h-20 flex-col space-y-2">
          <RefreshCw className="w-6 h-6" />
          <span>Top-up</span>
        </Button>
        
        <Button onClick={() => setActiveAction('transfer')} variant="outline" className="h-20 flex-col space-y-2">
          <Send className="w-6 h-6" />
          <span>Transfer</span>
        </Button>
      </div>

      {/* Action Forms */}
      {activeAction === 'topup' && (
        <Card>
          <CardHeader>
            <CardTitle>Transfer to Top-up Balance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="topupAmount">Amount</Label>
              <Input
                id="topupAmount"
                type="number"
                value={topupAmount}
                onChange={(e) => setTopupAmount(e.target.value)}
                placeholder="Enter amount (min ₹100)"
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleTopup}>Transfer</Button>
              <Button onClick={() => setActiveAction(null)} variant="outline">Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeAction === 'transfer' && (
        <Card>
          <CardHeader>
            <CardTitle>Transfer to User</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="recipientUserId">Recipient User ID</Label>
              <div className="flex space-x-2">
                <Input
                  id="recipientUserId"
                  value={recipientUserId}
                  onChange={(e) => setRecipientUserId(e.target.value)}
                  placeholder="Enter User ID (e.g., AU00001)"
                />
                <Button onClick={verifyRecipient} variant="outline">Verify</Button>
              </div>
              {verifiedRecipient && (
                <p className="text-green-600 text-sm mt-1">
                  Verified: {verifiedRecipient.name}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="transferAmount">Amount</Label>
              <Input
                id="transferAmount"
                type="number"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                placeholder="Enter amount"
              />
              {transferAmount && (
                <p className="text-sm text-gray-600 mt-1">
                  Tax (8%): ₹{(parseFloat(transferAmount) * 0.08).toFixed(2)} | 
                  Total Deduction: ₹{(parseFloat(transferAmount) * 1.08).toFixed(2)}
                </p>
              )}
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleTransfer} disabled={!verifiedRecipient}>Transfer</Button>
              <Button onClick={() => {
                setActiveAction(null);
                setRecipientUserId('');
                setVerifiedRecipient(null);
                setTransferAmount('');
              }} variant="outline">Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium capitalize">{transaction.type.replace('_', ' ')}</p>
                  <p className="text-sm text-gray-600">{transaction.description}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(transaction.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.amount >= 0 ? '+' : ''}₹{Math.abs(transaction.amount).toLocaleString()}
                  </p>
                  <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletTab;
