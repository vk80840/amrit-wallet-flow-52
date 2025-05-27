
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
    <div className="space-y-6">
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Deposit Funds</h2>
        
        {/* Deposit Type Selection */}
        <div className="mb-6">
          <Label className="text-base font-semibold mb-3 block">Select Deposit Method</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              onClick={() => setDepositType('bank')}
              variant={depositType === 'bank' ? 'default' : 'outline'}
              className="h-auto p-4 flex flex-col space-y-2"
            >
              <QrCode className="w-8 h-8" />
              <span>Bank Transfer</span>
            </Button>
            <Button
              onClick={() => setDepositType('crypto')}
              variant={depositType === 'crypto' ? 'default' : 'outline'}
              className="h-auto p-4 flex flex-col space-y-2"
            >
              <QrCode className="w-8 h-8" />
              <span>Cryptocurrency</span>
            </Button>
          </div>
        </div>

        {/* Payment Details */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {depositType === 'bank' ? 'Bank Details' : 'Crypto Address'}
          </h3>
          
          {depositType === 'bank' ? (
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Account Name</Label>
                  <div className="flex items-center justify-between bg-white p-2 rounded border">
                    <span className="text-sm">{bankDetails.accountName}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(bankDetails.accountName, 'Account Name')}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Account Number</Label>
                  <div className="flex items-center justify-between bg-white p-2 rounded border">
                    <span className="text-sm font-mono">{bankDetails.accountNumber}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(bankDetails.accountNumber, 'Account Number')}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">IFSC Code</Label>
                  <div className="flex items-center justify-between bg-white p-2 rounded border">
                    <span className="text-sm font-mono">{bankDetails.ifsc}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(bankDetails.ifsc, 'IFSC Code')}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Bank & Branch</Label>
                  <div className="bg-white p-2 rounded border">
                    <span className="text-sm">{bankDetails.bankName}, {bankDetails.branch}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 p-4 rounded-lg">
              <Label className="text-sm font-medium text-gray-600">Bitcoin Address</Label>
              <div className="flex items-center justify-between bg-white p-3 rounded border mt-2">
                <span className="text-sm font-mono break-all mr-2">{cryptoAddress}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(cryptoAddress, 'Crypto Address')}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Deposit Form */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="amount">Amount (₹)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter deposit amount"
            />
          </div>
          
          <div>
            <Label htmlFor="utrId">UTR/Transaction ID</Label>
            <Input
              id="utrId"
              value={utrId}
              onChange={(e) => setUtrId(e.target.value)}
              placeholder="Enter UTR or transaction ID"
            />
          </div>
          
          <div>
            <Label htmlFor="proof">Proof Link (Google Drive)</Label>
            <Input
              id="proof"
              value={proofLink}
              onChange={(e) => setProofLink(e.target.value)}
              placeholder="Enter Google Drive link to payment proof"
            />
            <p className="text-xs text-gray-500 mt-1">
              Upload payment screenshot to Google Drive and share the link
            </p>
          </div>
          
          <Button onClick={handleSubmit} className="w-full">
            <Upload className="w-4 h-4 mr-2" />
            Submit Deposit Request
          </Button>
        </div>
      </div>

      {/* Deposit History */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Deposit History</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
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
  );
};

export default DepositTab;
