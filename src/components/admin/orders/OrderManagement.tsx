
import { Eye, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OrderManagement = () => {
  const orders = [
    { id: 'ORD001', userId: 'GB00001', user: 'John Doe', product: 'Alkaline Water', amount: 590, bv: 1, status: 'Pending', date: '2024-01-25', address: 'Mumbai, India' },
    { id: 'ORD002', userId: 'GB00002', user: 'Jane Smith', product: 'Health Supplement', amount: 2950, bv: 5, status: 'Delivered', date: '2024-01-20', address: 'Delhi, India' }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Order Management</h1>
      
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-3">Order ID</th>
                <th className="text-left p-3">User</th>
                <th className="text-left p-3">Product</th>
                <th className="text-left p-3">Amount</th>
                <th className="text-left p-3">BV Credited</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{order.id}</td>
                  <td className="p-3">{order.user}</td>
                  <td className="p-3">{order.product}</td>
                  <td className="p-3">₹{order.amount}</td>
                  <td className="p-3">{order.bv} BV</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3">{order.date}</td>
                  <td className="p-3">
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline"><Eye className="w-4 h-4" /></Button>
                      <Button size="sm" variant="outline"><Edit className="w-4 h-4" /></Button>
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

export default OrderManagement;
