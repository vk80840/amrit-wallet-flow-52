
import { useState } from 'react';
import { Coins, TrendingUp, Calendar, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const STKWalletTab = () => {
  const [transferAmount, setTransferAmount] = useState('');
  const [transferType, setTransferType] = useState<'buy' | 'sell'>('buy');

  // Mock data - will be from database
  const stkData = {
    balance: 2500,
    currentPrice: 0.50, // ₹0.50 per STK
    totalValue: 1250, // 2500 × 0.50
    todayChange: +5.2,
    volume24h: 15000
  };

  const stkHistory = [
    { id: 1, type: 'Buy', amount: 1000, price: 0.48, total: 480, date: '2024-01-25' },
    { id: 2, type: 'Sell', amount: 500, price: 0.52, total: 260, date: '2024-01-20' },
    { id: 3, type: 'Buy', amount: 2000, price: 0.45, total: 900, date: '2024-01-15' },
    { id: 4, type: 'Reward', amount: 100, price: 0.50, total: 50, date: '2024-01-10' },
  ];

  const handleTransfer = () => {
    console.log(`${transferType} ${transferAmount} STK`);
    setTransferAmount('');
  };

  return (
    <div className="max-w-full overflow-hidden">
      <div className="space-y-6">
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">STK Wallet</h2>
          
          {/* STK Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-4 rounded-xl">
              <div className="flex items-center space-x-2">
                <Coins className="w-5 h-5" />
                <div>
                  <p className="text-sm text-yellow-100">STK Balance</p>
                  <p className="text-2xl font-bold">{stkData.balance.toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-xl">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <div>
                  <p className="text-sm text-green-100">Current Price</p>
                  <p className="text-2xl font-bold">₹{stkData.currentPrice}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-xl">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <div>
                  <p className="text-sm text-blue-100">Total Value</p>
                  <p className="text-2xl font-bold">₹{stkData.totalValue}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-xl">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <div>
                  <p className="text-sm text-purple-100">24h Change</p>
                  <p className="text-2xl font-bold text-green-200">+{stkData.todayChange}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Buy/Sell Section */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h4 className="font-semibold mb-4">Buy/Sell STK</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Button
                onClick={() => setTransferType('buy')}
                variant={transferType === 'buy' ? 'default' : 'outline'}
                className="h-12"
              >
                <ArrowUpRight className="w-4 h-4 mr-2" />
                Buy STK
              </Button>
              <Button
                onClick={() => setTransferType('sell')}
                variant={transferType === 'sell' ? 'default' : 'outline'}
                className="h-12"
              >
                <ArrowDownLeft className="w-4 h-4 mr-2" />
                Sell STK
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="amount">Amount (STK)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  placeholder="Enter STK amount"
                />
              </div>

              {transferAmount && (
                <div className="bg-white p-3 rounded border">
                  <div className="flex justify-between text-sm">
                    <span>Amount:</span>
                    <span>{transferAmount} STK</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Price:</span>
                    <span>₹{stkData.currentPrice} per STK</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-1 mt-1">
                    <span>Total:</span>
                    <span>₹{(parseFloat(transferAmount) * stkData.currentPrice).toFixed(2)}</span>
                  </div>
                </div>
              )}

              <Button onClick={handleTransfer} className="w-full" disabled={!transferAmount}>
                Confirm {transferType === 'buy' ? 'Purchase' : 'Sale'}
              </Button>
            </div>
          </div>

          {/* STK Information */}
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">STK Token Information</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• STK is AlkalineAmrit's internal cryptocurrency</li>
              <li>• Price fluctuates based on market demand</li>
              <li>• Can be earned through rewards and referrals</li>
              <li>• Can be traded for INR in your main wallet</li>
              <li>• 24h Trading Volume: {stkData.volume24h.toLocaleString()} STK</li>
            </ul>
          </div>
        </div>

        {/* STK History */}
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">STK Transaction History</h3>
          
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left p-3">Type</th>
                    <th className="text-left p-3">Amount (STK)</th>
                    <th className="text-left p-3">Price (₹)</th>
                    <th className="text-left p-3">Total (₹)</th>
                    <th className="text-left p-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stkHistory.map((transaction) => (
                    <tr key={transaction.id} className="border-b hover:bg-gray-50">
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
        </div>
      </div>
    </div>
  );
};

export default STKWalletTab;
