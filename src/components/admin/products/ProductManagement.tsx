
import { useState } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProductManagement = () => {
  const products = [
    { id: 1, name: 'Alkaline Water Bottle', price: 500, gst: 90, bv: 1, description: 'Premium alkaline water bottle', status: 'Active', image: 'bottle.jpg' },
    { id: 2, name: 'Health Supplement', price: 2500, gst: 450, bv: 5, description: 'Natural health supplement', status: 'Active', image: 'supplement.jpg' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>
      
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-3">Image</th>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Price</th>
                <th className="text-left p-3">GST</th>
                <th className="text-left p-3">BV</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div className="w-12 h-12 bg-gray-200 rounded"></div>
                  </td>
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">₹{product.price}</td>
                  <td className="p-3">₹{product.gst}</td>
                  <td className="p-3">{product.bv} BV</td>
                  <td className="p-3">
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      {product.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline"><Eye className="w-4 h-4" /></Button>
                      <Button size="sm" variant="outline"><Edit className="w-4 h-4" /></Button>
                      <Button size="sm" variant="outline" className="text-red-600"><Trash2 className="w-4 h-4" /></Button>
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

export default ProductManagement;
