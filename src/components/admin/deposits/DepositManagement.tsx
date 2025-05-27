
import { Check, X, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DepositManagement = () => {
  const deposits = [
    { id: 1, userId: 'GB00001', name: 'John Doe', amount: 10000, proof: 'payment_proof.jpg', type: 'Wallet', requestDate: '2024-01-25', status: 'Pending' },
    { id: 2, userId: 'GB00002', name: 'Jane Smith', amount: 5000, proof: 'upi_screenshot.jpg', type: 'Wallet', requestDate: '2024-01-24', status: 'Approved' }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Deposit Management</h1>
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-3">User ID</th>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Amount</th>
                <th className="text-left p-3">Proof</th>
                <th className="text-left p-3">Type</th>
                <th className="text-left p-3">Request Date</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {deposits.map((deposit) => (
                <tr key={deposit.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{deposit.userId}</td>
                  <td className="p-3">{deposit.name}</td>
                  <td className="p-3">₹{deposit.amount.toLocaleString()}</td>
                  <td className="p-3">
                    <Button size="sm" variant="outline">View Proof</Button>
                  </td>
                  <td className="p-3">{deposit.type}</td>
                  <td className="p-3">{deposit.requestDate}</td>
                  <td className="p-3">
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline"><Eye className="w-4 h-4" /></Button>
                      <Button size="sm" variant="outline" className="text-green-600"><Check className="w-4 h-4" /></Button>
                      <Button size="sm" variant="outline" className="text-red-600"><X className="w-4 h-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DepositManagement;
