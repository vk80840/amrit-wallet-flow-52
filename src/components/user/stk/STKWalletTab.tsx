
import { useState } from 'react';
import { Coins, TrendingUp, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const STKWalletTab = () => {
  const [buyAmount, setBuyAmount] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  // Mock STK data
  const stkData = {
    balance: 2500,
    locked: 1000,
    unlocked: 1500,
    currentPrice: 0.85,
    change24h: +5.2,
    totalSupply: 1000000,
    userSupply: 2500
  };

  const mainBalance = 12345; // Mock main wallet balance

  const handleBuySTK = () => {
    const amount = parseFloat(buyAmount);
    if (amount < 100) {
      toast({
        title: "Error",
        description: "Minimum purchase amount is ₹100",
        variant: "destructive"
      });
      return;
    }

    const stkAmount = amount / stkData.currentPrice;
    toast({
      title: "STK Purchase Successful",
      description: `You have purchased ${stkAmount.toFixed(2)} STK tokens`,
    });
    setBuyAmount('');
  };

  // Mock price history for chart
  const priceHistory = [
    { date: '2024-01-01', price: 0.50 },
    { date: '2024-01-08', price: 0.65 },
    { date: '2024-01-15', price: 0.72 },
    { date: '2024-01-22', price: 0.85 },
  ];

  const transactions = [
    { id: 1, type: 'Purchase', amount: 1000, price: 0.65, date: '2024-01-15' },
    { id: 2, type: 'Reward', amount: 1000, price: 0.00, date: '2024-01-20' },
    { id: 3, type: 'Purchase', amount: 500, price: 0.80, date: '2024-01-22' },
  ];

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <div className="flex space-x-4">
          <Button
            onClick={() => setActiveTab('overview')}
            variant={activeTab === 'overview' ? 'default' : 'outline'}
            className="flex items-center space-x-2"
          >
            <Coins className="w-4 h-4" />
            <span>Overview</span>
          </Button>
          <Button
            onClick={() => setActiveTab('buy')}
            variant={activeTab === 'buy' ? 'default' : 'outline'}
            className="flex items-center space-x-2"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>Buy STK</span>
          </Button>
          <Button
            onClick={() => setActiveTab('history')}
            variant={activeTab === 'history' ? 'default' : 'outline'}
            className="flex items-center space-x-2"
          >
            <TrendingUp className="w-4 h-4" />
            <span>History</span>
          </Button>
        </div>
      </div>

      {/* STK Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <Coins className="w-8 h-8" />
            <span className="text-purple-100 text-sm">Total</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">STK Balance</h3>
          <p className="text-3xl font-bold">{stkData.balance.toLocaleString()}</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <Coins className="w-8 h-8" />
            <span className="text-green-100 text-sm">Available</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Unlocked STK</h3>
          <p className="text-3xl font-bold">{stkData.unlocked.toLocaleString()}</p>
        </div>
        
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <Coins className="w-8 h-8" />
            <span className="text-orange-100 text-sm">Locked</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Locked STK</h3>
          <p className="text-3xl font-bold">{stkData.locked.toLocaleString()}</p>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Current Price */}
          <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">STK Token Price</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <div>
                    <p className="text-3xl font-bold">₹{stkData.currentPrice.toFixed(2)}</p>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm ${stkData.change24h > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {stkData.change24h > 0 ? '+' : ''}{stkData.change24h}%
                      </span>
                      <span className="text-gray-500 text-sm">24h change</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Your STK Value:</span>
                    <span className="font-semibold">₹{(stkData.balance * stkData.currentPrice).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Supply:</span>
                    <span className="font-semibold">{stkData.totalSupply.toLocaleString()} STK</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Your Holdings:</span>
                    <span className="font-semibold">{((stkData.userSupply / stkData.totalSupply) * 100).toFixed(4)}%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Price History</h4>
                <div className="space-y-2">
                  {priceHistory.map((point, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">{point.date}</span>
                      <span className="font-medium">₹{point.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* STK Benefits */}
          <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">STK Token Benefits</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-green-600">How to Earn STK</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                    <span>Purchase products worth ₹5,000+ to get 1,000 STK reward</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                    <span>Buy STK tokens directly with main wallet balance</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                    <span>Special rewards for achieving milestones</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3 text-blue-600">STK Utility</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                    <span>Premium features access</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                    <span>Exclusive product discounts</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                    <span>Priority customer support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Buy STK Tab */}
      {activeTab === 'buy' && (
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Buy STK Tokens</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold mb-2">Current STK Price</h4>
                <p className="text-2xl font-bold text-blue-600">₹{stkData.currentPrice.toFixed(2)}</p>
                <p className="text-sm text-gray-600">per STK token</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="buyAmount">Amount (₹)</Label>
                  <Input
                    id="buyAmount"
                    type="number"
                    value={buyAmount}
                    onChange={(e) => setBuyAmount(e.target.value)}
                    placeholder="Enter amount to invest"
                  />
                </div>
                
                {buyAmount && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Purchase Summary</h4>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Amount:</span>
                        <span>₹{parseFloat(buyAmount || '0').toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>STK Tokens:</span>
                        <span>{(parseFloat(buyAmount || '0') / stkData.currentPrice).toFixed(2)} STK</span>
                      </div>
                      <div className="flex justify-between font-semibold border-t pt-1">
                        <span>Total Cost:</span>
                        <span>₹{parseFloat(buyAmount || '0').toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <Button onClick={handleBuySTK} className="w-full">
                  <Coins className="w-4 h-4 mr-2" />
                  Buy STK Tokens
                </Button>
              </div>
            </div>
            
            <div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Available Balance</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Main Wallet:</span>
                    <span className="font-semibold">₹{mainBalance.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Quick Buy Options</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[1000, 2500, 5000, 10000].map((amount) => (
                      <Button
                        key={amount}
                        onClick={() => setBuyAmount(amount.toString())}
                        variant="outline"
                        size="sm"
                      >
                        ₹{amount.toLocaleString()}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">STK Transaction History</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Type</th>
                  <th className="text-left p-2">Amount (STK)</th>
                  <th className="text-left p-2">Price (₹)</th>
                  <th className="text-left p-2">Total Value</th>
                  <th className="text-left p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b">
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        tx.type === 'Purchase' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="p-2">{tx.amount.toLocaleString()} STK</td>
                    <td className="p-2">
                      {tx.price === 0 ? 'Free' : `₹${tx.price.toFixed(2)}`}
                    </td>
                    <td className="p-2">
                      {tx.price === 0 ? 'Reward' : `₹${(tx.amount * tx.price).toFixed(2)}`}
                    </td>
                    <td className="p-2">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default STKWalletTab;
