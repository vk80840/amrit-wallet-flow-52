
import { useState } from 'react';
import { Download, AlertCircle, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const WithdrawTab = () => {
  const [withdrawType, setWithdrawType] = useState<'bank' | 'crypto'>('bank');
  const [amount, setAmount] = useState('');
  const [password, setPassword] = useState('');

  // Mock data - will be from database
  const withdrawableBalance = 12345;
  const minWithdraw = 1000;
  const processingTime = "7 Business Days";
  const withdrawalCharge = 12; // 12%
  const tds = 2; // 2%

  const calculateCharges = (amt: number) => {
    const charges = amt * (withdrawalCharge / 100);
    const tdsAmount = amt * (tds / 100);
    const netAmount = amt - charges - tdsAmount;
    return { charges, tdsAmount, netAmount };
  };

  const handleWithdraw = () => {
    const withdrawAmount = parseFloat(amount);
    
    if (!amount || !password) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    if (withdrawAmount < minWithdraw) {
      toast({
        title: "Error",
        description: `Minimum withdrawal amount is ₹${minWithdraw}`,
        variant: "destructive"
      });
      return;
    }

    if (withdrawAmount > withdrawableBalance) {
      toast({
        title: "Error",
        description: "Insufficient balance",
        variant: "destructive"
      });
      return;
    }

    const { charges, tdsAmount, netAmount } = calculateCharges(withdrawAmount);

    toast({
      title: "Withdrawal Request Submitted",
      description: `You will receive ₹${netAmount.toFixed(2)} after charges and TDS`,
    });

    // Reset form
    setAmount('');
    setPassword('');
  };

  const withdrawalHistory = [
    { id: 1, amount: 5000, netAmount: 4300, status: 'Pending', date: '2024-01-15', type: 'Bank' },
    { id: 2, amount: 3000, netAmount: 2580, status: 'Approved', date: '2024-01-10', type: 'Bank' },
    { id: 3, amount: 2000, netAmount: 1720, status: 'Rejected', date: '2024-01-08', type: 'Crypto' },
  ];

  const currentAmount = parseFloat(amount) || 0;
  const { charges, tdsAmount, netAmount } = calculateCharges(currentAmount);

  return (
    <div className="space-y-6">
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Withdraw Funds</h2>
        
        {/* Balance Display */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl mb-6">
          <h3 className="text-lg font-semibold mb-2">Withdrawable Balance</h3>
          <p className="text-3xl font-bold">₹{withdrawableBalance.toLocaleString()}</p>
          <p className="text-green-100 text-sm mt-2">
            Minimum: ₹{minWithdraw} • Processing: {processingTime}
          </p>
        </div>

        {/* Withdrawal Type Selection - Made Smaller */}
        <div className="mb-6">
          <Label className="text-base font-semibold mb-3 block">Select Withdrawal Method</Label>
          <div className="grid grid-cols-2 gap-3 max-w-md">
            <Button
              onClick={() => setWithdrawType('bank')}
              variant={withdrawType === 'bank' ? 'default' : 'outline'}
              className="h-16 flex flex-col space-y-1 text-xs"
              size="sm"
            >
              <Download className="w-5 h-5" />
              <span>Bank Transfer</span>
            </Button>
            <Button
              onClick={() => setWithdrawType('crypto')}
              variant={withdrawType === 'crypto' ? 'default' : 'outline'}
              className="h-16 flex flex-col space-y-1 text-xs"
              size="sm"
            >
              <Download className="w-5 h-5" />
              <span>Cryptocurrency</span>
            </Button>
          </div>
        </div>

        {/* QR Code Display */}
        <div className="mb-6">
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg max-w-md">
            <div className="flex items-center justify-center bg-white p-4 rounded border-2 border-dashed border-gray-300">
              <QrCode className="w-24 h-24 text-gray-400" />
            </div>
            <p className="text-center text-sm text-gray-600 mt-2">
              {withdrawType === 'bank' ? 'Bank Transfer QR Code' : 'Crypto Wallet QR Code'}
            </p>
          </div>
        </div>

        {/* Charges Information */}
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-yellow-800">Withdrawal Charges</h4>
              <p className="text-sm text-yellow-700">
                {withdrawalCharge}% processing fee + {tds}% TDS will be deducted from your withdrawal amount
              </p>
            </div>
          </div>
        </div>

        {/* Withdrawal Form */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="amount">Withdrawal Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`Enter amount (Min: ₹${minWithdraw})`}
            />
          </div>

          {/* Amount Breakdown */}
          {currentAmount > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Amount Breakdown</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Withdrawal Amount:</span>
                  <span>₹{currentAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>Processing Fee ({withdrawalCharge}%):</span>
                  <span>-₹{charges.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>TDS ({tds}%):</span>
                  <span>-₹{tdsAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-1">
                  <span>Net Amount:</span>
                  <span className="text-green-600">₹{netAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
          
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          
          <Button 
            onClick={handleWithdraw} 
            className="w-full"
            disabled={currentAmount < minWithdraw}
          >
            <Download className="w-4 h-4 mr-2" />
            Submit Withdrawal Request
          </Button>
        </div>
      </div>

      {/* Withdrawal History - Made Scrollable */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Withdrawal History</h3>
        
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Amount</th>
                  <th className="text-left p-2">Net Amount</th>
                  <th className="text-left p-2">Type</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {withdrawalHistory.map((withdrawal) => (
                  <tr key={withdrawal.id} className="border-b">
                    <td className="p-2">₹{withdrawal.amount.toLocaleString()}</td>
                    <td className="p-2 text-green-600">₹{withdrawal.netAmount.toLocaleString()}</td>
                    <td className="p-2">{withdrawal.type}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        withdrawal.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                        withdrawal.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {withdrawal.status}
                      </span>
                    </td>
                    <td className="p-2">{withdrawal.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawTab;
