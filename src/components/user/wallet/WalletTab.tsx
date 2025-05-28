
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Wallet, ArrowUpRight, ArrowDownLeft, RefreshCw, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

interface WalletTabProps {
  onNavigateToTab?: (tab: string) => void;
}

const WalletTab = ({ onNavigateToTab }: WalletTabProps) => {
  const { user } = useAuth();
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [transferAmount, setTransferAmount] = useState('');
  const [transferUserId, setTransferUserId] = useState('');
  const [topupAmount, setTopupAmount] = useState('');
  const [verifiedUser, setVerifiedUser] = useState<string | null>(null);

  // Mock balances - will be from database
  const mainBalance = 12345;
  const topupBalance = 8250;

  const handleVerifyUser = () => {
    // Mock verification - will connect to database
    if (transferUserId) {
      setVerifiedUser('John Doe'); // Mock verified user name
      toast({
        title: "User Verified",
        description: `User ID ${transferUserId} belongs to John Doe`,
      });
    }
  };

  const handleTransfer = () => {
    const amount = parseFloat(transferAmount);
    if (amount < 100) {
      toast({
        title: "Error",
        description: "Minimum transfer amount is ₹100",
        variant: "destructive"
      });
      return;
    }
    
    // Calculate charges: 6% + 2% TDS
    const charges = amount * 0.08;
    const finalAmount = amount + charges;
    
    toast({
      title: "Transfer Initiated",
      description: `₹${amount} + ₹${charges.toFixed(2)} charges = ₹${finalAmount.toFixed(2)} total`,
    });
    
    setActiveAction(null);
    setTransferAmount('');
    setTransferUserId('');
    setVerifiedUser(null);
  };

  const handleTopup = () => {
    const amount = parseFloat(topupAmount);
    if (amount < 100) {
      toast({
        title: "Error",
        description: "Minimum top-up amount is ₹100",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Top-up Successful",
      description: `₹${amount} transferred to top-up balance`,
    });
    
    setActiveAction(null);
    setTopupAmount('');
  };

  const transactions = [
    { id: 1, type: 'Deposit', amount: 5000, status: 'Completed', date: '2024-01-15' },
    { id: 2, type: 'Withdraw', amount: -2000, status: 'Pending', date: '2024-01-14' },
    { id: 3, type: 'Transfer', amount: -500, status: 'Completed', date: '2024-01-13' },
  ];

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="space-y-4 sm:space-y-6">
        {/* Balance Cards - Mobile Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 sm:p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <Wallet className="w-6 sm:w-8 h-6 sm:h-8" />
              <span className="text-blue-100 text-xs sm:text-sm">Withdrawable</span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-2">Main Balance</h3>
            <p className="text-2xl sm:text-3xl font-bold">₹{mainBalance.toLocaleString()}</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 sm:p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <Wallet className="w-6 sm:w-8 h-6 sm:h-8" />
              <span className="text-green-100 text-xs sm:text-sm">Shopping</span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold mb-2">Top-up Balance</h3>
            <p className="text-2xl sm:text-3xl font-bold">₹{topupBalance.toLocaleString()}</p>
          </div>
        </div>

        {/* Action Buttons - Mobile Responsive */}
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
            <Button 
              onClick={() => onNavigateToTab?.('deposit')}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 sm:p-4 h-auto flex-col space-y-2"
            >
              <ArrowDownLeft className="w-5 sm:w-6 h-5 sm:h-6" />
              <span className="text-xs sm:text-sm">Deposit</span>
            </Button>
            
            <Button 
              onClick={() => onNavigateToTab?.('withdraw')}
              className="bg-red-500 hover:bg-red-600 text-white p-3 sm:p-4 h-auto flex-col space-y-2"
            >
              <ArrowUpRight className="w-5 sm:w-6 h-5 sm:h-6" />
              <span className="text-xs sm:text-sm">Withdraw</span>
            </Button>
            
            <Button 
              onClick={() => setActiveAction('topup')}
              className="bg-green-500 hover:bg-green-600 text-white p-3 sm:p-4 h-auto flex-col space-y-2"
            >
              <RefreshCw className="w-5 sm:w-6 h-5 sm:h-6" />
              <span className="text-xs sm:text-sm">Top-up</span>
            </Button>
            
            <Button 
              onClick={() => setActiveAction('transfer')}
              className="bg-purple-500 hover:bg-purple-600 text-white p-3 sm:p-4 h-auto flex-col space-y-2"
            >
              <Users className="w-5 sm:w-6 h-5 sm:h-6" />
              <span className="text-xs sm:text-sm">Transfer</span>
            </Button>
          </div>

          {/* Transfer Form - Mobile Responsive */}
          {activeAction === 'transfer' && (
            <div className="border-t pt-4 space-y-4">
              <h4 className="font-semibold text-sm sm:text-base">User to User Transfer</h4>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="userId" className="text-sm">User ID</Label>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <Input
                      id="userId"
                      value={transferUserId}
                      onChange={(e) => setTransferUserId(e.target.value)}
                      placeholder="Enter User ID"
                      className="flex-1"
                    />
                    <Button onClick={handleVerifyUser} variant="outline" className="w-full sm:w-auto">
                      Verify
                    </Button>
                  </div>
                  {verifiedUser && (
                    <p className="text-green-600 text-sm mt-1">✓ {verifiedUser}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="amount" className="text-sm">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                  <p className="text-xs text-gray-500 mt-1">Charges: 6% + 2% TDS</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Button onClick={handleTransfer} disabled={!verifiedUser} className="w-full sm:w-auto">
                  Transfer
                </Button>
                <Button onClick={() => setActiveAction(null)} variant="outline" className="w-full sm:w-auto">
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* Top-up Form - Mobile Responsive */}
          {activeAction === 'topup' && (
            <div className="border-t pt-4 space-y-4">
              <h4 className="font-semibold text-sm sm:text-base">Transfer to Top-up Balance</h4>
              <div>
                <Label htmlFor="topupAmount" className="text-sm">Amount</Label>
                <Input
                  id="topupAmount"
                  type="number"
                  value={topupAmount}
                  onChange={(e) => setTopupAmount(e.target.value)}
                  placeholder="Enter amount to transfer"
                />
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Button onClick={handleTopup} className="w-full sm:w-auto">
                  Transfer
                </Button>
                <Button onClick={() => setActiveAction(null)} variant="outline" className="w-full sm:w-auto">
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Transaction History - Mobile Responsive */}
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Transaction History</h3>
          
          <div className="overflow-x-auto">
            <div className="min-w-[400px]">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 sm:p-3">Type</th>
                    <th className="text-left p-2 sm:p-3">Amount</th>
                    <th className="text-left p-2 sm:p-3">Status</th>
                    <th className="text-left p-2 sm:p-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-b">
                      <td className="p-2 sm:p-3">{tx.type}</td>
                      <td className={`p-2 sm:p-3 ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ₹{Math.abs(tx.amount).toLocaleString()}
                      </td>
                      <td className="p-2 sm:p-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          tx.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="p-2 sm:p-3">{tx.date}</td>
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

export default WalletTab;
