
import { useState } from 'react';
import { Upload, QrCode, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const DepositTab = () => {
  const [depositType, setDepositType] = useState<'crypto' | 'bank'>('bank');
  const [amount, setAmount] = useState('');
  const [utrId, setUtrId] = useState('');
  const [proofLink, setProofLink] = useState('');

  const bankDetails = {
    accountName: "AlkalineAmrit Pvt Ltd",
    accountNumber: "1234567890123456",
    ifsc: "HDFC0000123",
    bankName: "HDFC Bank",
    branch: "Mumbai Central"
  };

  const cryptoAddress = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh";

  const handleSubmit = () => {
    if (!amount || !utrId || !proofLink) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Deposit Request Submitted",
      description: "Your deposit request has been submitted for admin approval",
    });

    // Reset form
    setAmount('');
    setUtrId('');
    setProofLink('');
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: `${label} copied to clipboard`,
    });
  };

  const pendingDeposits = [
    { id: 1, amount: 5000, type: 'Bank', status: 'Pending', date: '2024-01-15' },
    { id: 2, amount: 3000, type: 'Crypto', status: 'Approved', date: '2024-01-14' },
  ];

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="space-y-4 sm:space-y-6">
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-3 sm:p-6 w-full">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Deposit Funds</h2>
          
          {/* Deposit Type Selection */}
          <div className="mb-4 sm:mb-6">
            <Label className="text-sm sm:text-base font-semibold mb-3 block">Select Deposit Method</Label>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 max-w-xs sm:max-w-md">
              <Button
                onClick={() => setDepositType('bank')}
                variant={depositType === 'bank' ? 'default' : 'outline'}
                className="h-12 sm:h-16 flex flex-col space-y-1 text-xs sm:text-sm p-2"
                size="sm"
              >
                <QrCode className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Bank Transfer</span>
              </Button>
              <Button
                onClick={() => setDepositType('crypto')}
                variant={depositType === 'crypto' ? 'default' : 'outline'}
                className="h-12 sm:h-16 flex flex-col space-y-1 text-xs sm:text-sm p-2"
                size="sm"
              >
                <QrCode className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Cryptocurrency</span>
              </Button>
            </div>
          </div>

          {/* QR Code Display */}
          <div className="mb-4 sm:mb-6">
            <div className="bg-gray-50 border border-gray-200 p-3 sm:p-4 rounded-lg max-w-xs sm:max-w-md">
              <div className="flex items-center justify-center bg-white p-3 sm:p-4 rounded border-2 border-dashed border-gray-300">
                <QrCode className="w-16 h-16 sm:w-24 sm:h-24 text-gray-400" />
              </div>
              <p className="text-center text-xs sm:text-sm text-gray-600 mt-2">
                {depositType === 'bank' ? 'Scan to pay via UPI/Bank' : 'Scan to send crypto'}
              </p>
            </div>
          </div>

          {/* Payment Details */}
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
              {depositType === 'bank' ? 'Bank Details' : 'Crypto Address'}
            </h3>
            
            {depositType === 'bank' ? (
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg space-y-3">
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  <div>
                    <Label className="text-xs sm:text-sm font-medium text-gray-600">Account Name</Label>
                    <div className="flex items-center justify-between bg-white p-2 rounded border mt-1">
                      <span className="text-xs sm:text-sm truncate">{bankDetails.accountName}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(bankDetails.accountName, 'Account Name')}
                        className="ml-2 p-1"
                      >
                        <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs sm:text-sm font-medium text-gray-600">Account Number</Label>
                    <div className="flex items-center justify-between bg-white p-2 rounded border mt-1">
                      <span className="text-xs sm:text-sm font-mono truncate">{bankDetails.accountNumber}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(bankDetails.accountNumber, 'Account Number')}
                        className="ml-2 p-1"
                      >
                        <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs sm:text-sm font-medium text-gray-600">IFSC Code</Label>
                    <div className="flex items-center justify-between bg-white p-2 rounded border mt-1">
                      <span className="text-xs sm:text-sm font-mono">{bankDetails.ifsc}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(bankDetails.ifsc, 'IFSC Code')}
                        className="ml-2 p-1"
                      >
                        <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs sm:text-sm font-medium text-gray-600">Bank & Branch</Label>
                    <div className="bg-white p-2 rounded border mt-1">
                      <span className="text-xs sm:text-sm">{bankDetails.bankName}, {bankDetails.branch}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                <Label className="text-xs sm:text-sm font-medium text-gray-600">Bitcoin Address</Label>
                <div className="flex items-center justify-between bg-white p-2 sm:p-3 rounded border mt-2">
                  <span className="text-xs sm:text-sm font-mono break-all mr-2">{cryptoAddress}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(cryptoAddress, 'Crypto Address')}
                    className="flex-shrink-0"
                  >
                    <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Deposit Form */}
          <div className="space-y-3 sm:space-y-4">
            <div>
              <Label htmlFor="amount" className="text-xs sm:text-sm">Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter deposit amount"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="utrId" className="text-xs sm:text-sm">UTR/Transaction ID</Label>
              <Input
                id="utrId"
                value={utrId}
                onChange={(e) => setUtrId(e.target.value)}
                placeholder="Enter UTR or transaction ID"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="proof" className="text-xs sm:text-sm">Proof Link (Google Drive)</Label>
              <Input
                id="proof"
                value={proofLink}
                onChange={(e) => setProofLink(e.target.value)}
                placeholder="Enter Google Drive link to payment proof"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload payment screenshot to Google Drive and share the link
              </p>
            </div>
            
            <Button onClick={handleSubmit} className="w-full text-sm">
              <Upload className="w-4 h-4 mr-2" />
              Submit Deposit Request
            </Button>
          </div>
        </div>

        {/* Deposit History */}
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-3 sm:p-6 w-full">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Deposit History</h3>
          
          <div className="overflow-x-auto">
            <div className="min-w-[400px]">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Amount</th>
                    <th className="text-left p-2">Type</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingDeposits.map((deposit) => (
                    <tr key={deposit.id} className="border-b">
                      <td className="p-2">₹{deposit.amount.toLocaleString()}</td>
                      <td className="p-2">{deposit.type}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          deposit.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {deposit.status}
                        </span>
                      </td>
                      <td className="p-2">{deposit.date}</td>
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

export default DepositTab;
