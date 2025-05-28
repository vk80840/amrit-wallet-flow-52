
import { useState } from 'react';
import { Coins, TrendingUp, Calendar, ArrowUpRight, ArrowDownLeft, Lock, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const STKWalletTab = () => {
  const [transferAmount, setTransferAmount] = useState('');
  const [transferType, setTransferType] = useState<'buy' | 'sell'>('buy');

  // Mock data - will be from database
  const stkData = {
    availableBalance: 1500, // STK that can be traded
    lockedBalance: 1000, // STK locked for 15 months
    totalBalance: 2500, // Total STK
    currentPrice: 0.50, // ₹0.50 per STK
    totalValue: 1250, // Only available balance value
    todayChange: +5.2,
    volume24h: 15000
  };

  const stkHistory = [
    { id: 1, type: 'Buy', amount: 1000, price: 0.48, total: 480, date: '2024-01-25', status: 'Available' },
    { id: 2, type: 'Reward', amount: 500, price: 0.50, total: 250, date: '2024-01-20', status: 'Locked', unlockDate: '2025-04-20' },
    { id: 3, type: 'Buy', amount: 1000, price: 0.45, total: 450, date: '2024-01-15', status: 'Available' },
    { id: 4, type: 'Referral Bonus', amount: 500, price: 0.50, total: 250, date: '2024-01-10', status: 'Locked', unlockDate: '2025-04-10' },
  ];

  const handleTransfer = () => {
    if (transferType === 'sell' && parseFloat(transferAmount) > stkData.availableBalance) {
      alert('Insufficient available STK balance. Locked STK cannot be sold.');
      return;
    }
    console.log(`${transferType} ${transferAmount} STK`);
    setTransferAmount('');
  };

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="space-y-4 sm:space-y-6">
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-3 sm:p-6 w-full">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">STK Wallet</h2>
          
          {/* STK Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-3 sm:p-4 rounded-xl">
              <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-1">
                  <Coins className="w-4 h-4" />
                  <p className="text-xs text-green-100">Available STK</p>
                </div>
                <p className="text-lg sm:text-2xl font-bold">{stkData.availableBalance.toLocaleString()}</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-3 sm:p-4 rounded-xl">
              <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-1">
                  <Lock className="w-4 h-4" />
                  <p className="text-xs text-red-100">Locked STK</p>
                </div>
                <p className="text-lg sm:text-2xl font-bold">{stkData.lockedBalance.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-3 sm:p-4 rounded-xl">
              <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4" />
                  <p className="text-xs text-blue-100">Current Price</p>
                </div>
                <p className="text-lg sm:text-2xl font-bold">₹{stkData.currentPrice}</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-3 sm:p-4 rounded-xl">
              <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <p className="text-xs text-purple-100">Available Value</p>
                </div>
                <p className="text-lg sm:text-2xl font-bold">₹{stkData.totalValue}</p>
              </div>
            </div>
          </div>

          {/* Enhanced Locked STK Information */}
          <div className="bg-red-50 border border-red-200 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
            <h4 className="font-semibold text-red-800 mb-2 flex items-center">
              <Lock className="w-4 h-4 mr-2" />
              Locked STK Information (15-Month Lock Period)
            </h4>
            <ul className="text-xs sm:text-sm text-red-700 space-y-1">
              <li>• All STK received from rewards, referrals, bonuses, and any other source are automatically locked for 15 months</li>
              <li>• Locked STK cannot be sold, transferred, or traded during the lock period</li>
              <li>• Locked STK will automatically become available after exactly 15 months from the date received</li>
              <li>• Only purchased STK is immediately available for trading</li>
              <li>• Total Locked: {stkData.lockedBalance.toLocaleString()} STK (valued at ₹{(stkData.lockedBalance * stkData.currentPrice).toFixed(2)})</li>
              <li>• Lock period ensures long-term commitment and stability of the STK ecosystem</li>
            </ul>
          </div>

          {/* Buy/Sell Section - Mobile Responsive */}
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6">
            <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Buy/Sell STK</h4>
            
            <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-3 sm:mb-4">
              <Button
                onClick={() => setTransferType('buy')}
                variant={transferType === 'buy' ? 'default' : 'outline'}
                className="h-10 sm:h-12 text-xs sm:text-sm"
              >
                <ArrowUpRight className="w-4 h-4 mr-1 sm:mr-2" />
                Buy STK
              </Button>
              <Button
                onClick={() => setTransferType('sell')}
                variant={transferType === 'sell' ? 'default' : 'outline'}
                className="h-10 sm:h-12 text-xs sm:text-sm"
              >
                <ArrowDownLeft className="w-4 h-4 mr-1 sm:mr-2" />
                Sell STK
              </Button>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div>
                <Label htmlFor="amount" className="text-sm">Amount (STK)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  placeholder="Enter STK amount"
                  className="text-sm"
                />
                {transferType === 'sell' && (
                  <p className="text-xs text-gray-600 mt-1">
                    Available for sale: {stkData.availableBalance.toLocaleString()} STK
                  </p>
                )}
              </div>

              {transferAmount && (
                <div className="bg-white p-3 rounded border">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span>Amount:</span>
                    <span>{transferAmount} STK</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span>Price:</span>
                    <span>₹{stkData.currentPrice} per STK</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-1 mt-1 text-xs sm:text-sm">
                    <span>Total:</span>
                    <span>₹{(parseFloat(transferAmount) * stkData.currentPrice).toFixed(2)}</span>
                  </div>
                </div>
              )}

              <Button onClick={handleTransfer} className="w-full text-sm" disabled={!transferAmount}>
                Confirm {transferType === 'buy' ? 'Purchase' : 'Sale'}
              </Button>
            </div>
          </div>

          {/* STK Information */}
          <div className="bg-yellow-50 border border-yellow-200 p-3 sm:p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2 text-sm sm:text-base">STK Token Information</h4>
            <ul className="text-xs sm:text-sm text-yellow-700 space-y-1">
              <li>• STK is AlkalineAmrit's internal cryptocurrency with a 15-month lock mechanism</li>
              <li>• Price fluctuates based on market demand and ecosystem growth</li>
              <li>• Can be earned through rewards and referrals (automatically locked for 15 months)</li>
              <li>• Can be traded for INR in your main wallet (only available STK)</li>
              <li>• Lock period ensures long-term value appreciation and ecosystem stability</li>
              <li>• 24h Trading Volume: {stkData.volume24h.toLocaleString()} STK</li>
            </ul>
          </div>
        </div>

        {/* STK History - Mobile Responsive */}
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-3 sm:p-6 w-full">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-3 sm:mb-4">STK Transaction History</h3>
          
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left p-2 sm:p-3">Type</th>
                    <th className="text-left p-2 sm:p-3">Amount (STK)</th>
                    <th className="text-left p-2 sm:p-3">Price (₹)</th>
                    <th className="text-left p-2 sm:p-3">Total (₹)</th>
                    <th className="text-left p-2 sm:p-3">Status</th>
                    <th className="text-left p-2 sm:p-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stkHistory.map((transaction) => (
                    <tr key={transaction.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 sm:p-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          transaction.type === 'Buy' ? 'bg-green-100 text-green-800' :
                          transaction.type === 'Sell' ? 'bg-red-100 text-red-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className="p-2 sm:p-3">{transaction.amount.toLocaleString()}</td>
                      <td className="p-2 sm:p-3">₹{transaction.price}</td>
                      <td className="p-2 sm:p-3">₹{transaction.total}</td>
                      <td className="p-2 sm:p-3">
                        <span className={`px-2 py-1 rounded-full text-xs flex items-center ${
                          transaction.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {transaction.status === 'Locked' && <Lock className="w-3 h-3 mr-1" />}
                          {transaction.status === 'Available' && <Coins className="w-3 h-3 mr-1" />}
                          {transaction.status}
                        </span>
                        {transaction.unlockDate && (
                          <div className="text-xs text-gray-500 mt-1 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            Unlocks: {transaction.unlockDate}
                          </div>
                        )}
                      </td>
                      <td className="p-2 sm:p-3">{transaction.date}</td>
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
