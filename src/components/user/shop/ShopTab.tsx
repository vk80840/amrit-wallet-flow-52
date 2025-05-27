
import { useState } from 'react';
import { ShoppingCart, Eye, Package, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const ShopTab = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [topupBalance] = useState(8250); // Mock balance

  // Mock products data
  const products = [
    {
      id: 1,
      name: 'Alkaline Water Filter Pro',
      price: 4999,
      gst: 899,
      bv: 25,
      image: '/placeholder.svg',
      description: 'Advanced alkaline water filtration system with 7-stage purification'
    },
    {
      id: 2,
      name: 'Alkaline Water Bottle',
      price: 999,
      gst: 180,
      bv: 5,
      image: '/placeholder.svg',
      description: 'Portable alkaline water bottle with built-in pH enhancement'
    },
    {
      id: 3,
      name: 'pH Test Kit',
      price: 599,
      gst: 108,
      bv: 3,
      image: '/placeholder.svg',
      description: 'Professional pH testing kit for water quality measurement'
    }
  ];

  // Mock order history
  const orderHistory = [
    {
      id: 'ORD001',
      product: 'Alkaline Water Filter Pro',
      amount: 5898,
      bv: 25,
      status: 'Delivered',
      date: '2024-01-15'
    },
    {
      id: 'ORD002',
      product: 'Alkaline Water Bottle',
      amount: 1179,
      bv: 5,
      status: 'In Transit',
      date: '2024-01-20'
    }
  ];

  const handleBuyProduct = (product: any) => {
    const totalAmount = product.price + product.gst;
    
    if (totalAmount > topupBalance) {
      toast({
        title: "Insufficient Balance",
        description: "Please top-up your balance to make this purchase",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Order Placed",
      description: `Your order for ${product.name} has been placed successfully`,
    });

    setSelectedProduct(null);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'in transit': return 'bg-blue-100 text-blue-800';
      case 'packed': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <div className="flex space-x-4">
          <Button
            onClick={() => setActiveTab('products')}
            variant={activeTab === 'products' ? 'default' : 'outline'}
            className="flex items-center space-x-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Products</span>
          </Button>
          <Button
            onClick={() => setActiveTab('orders')}
            variant={activeTab === 'orders' ? 'default' : 'outline'}
            className="flex items-center space-x-2"
          >
            <Package className="w-4 h-4" />
            <span>Order History</span>
          </Button>
        </div>
      </div>

      {/* Balance Display */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-2">Top-up Balance</h3>
        <p className="text-3xl font-bold">₹{topupBalance.toLocaleString()}</p>
        <p className="text-green-100 text-sm mt-1">Available for shopping</p>
      </div>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Price:</span>
                    <span>₹{product.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">GST (18%):</span>
                    <span>₹{product.gst.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">BV Credit:</span>
                    <span className="text-blue-600 font-semibold">{product.bv} BV</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-2">
                    <span>Total:</span>
                    <span>₹{(product.price + product.gst).toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={() => setSelectedProduct(product)}
                    className="flex-1"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  <Button
                    onClick={() => handleBuyProduct(product)}
                    className="flex-1 bg-green-500 hover:bg-green-600"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Order History</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Order ID</th>
                  <th className="text-left p-2">Product</th>
                  <th className="text-left p-2">Amount</th>
                  <th className="text-left p-2">BV Credited</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {orderHistory.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="p-2 font-mono">{order.id}</td>
                    <td className="p-2">{order.product}</td>
                    <td className="p-2">₹{order.amount.toLocaleString()}</td>
                    <td className="p-2 text-blue-600">{order.bv} BV</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-2">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-90vh overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{selectedProduct.name}</h3>
                <Button
                  onClick={() => setSelectedProduct(null)}
                  variant="outline"
                  size="sm"
                >
                  ✕
                </Button>
              </div>
              
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              
              <p className="text-gray-600 mb-6">{selectedProduct.description}</p>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold mb-3">Price Breakdown</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Base Price:</span>
                    <span>₹{selectedProduct.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%):</span>
                    <span>₹{selectedProduct.gst.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>BV Credit to Team:</span>
                    <span className="text-blue-600 font-semibold">{selectedProduct.bv} BV</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-2">
                    <span>Total Amount:</span>
                    <span>₹{(selectedProduct.price + selectedProduct.gst).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <Button
                onClick={() => handleBuyProduct(selectedProduct)}
                className="w-full bg-green-500 hover:bg-green-600"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Buy Now - ₹{(selectedProduct.price + selectedProduct.gst).toLocaleString()}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopTab;
