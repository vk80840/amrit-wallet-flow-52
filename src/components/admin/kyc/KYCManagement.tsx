
import { useState } from 'react';
import { Search, Eye, Check, X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const KYCManagement = () => {
  const [filter, setFilter] = useState('all');

  // Mock data - will be from database
  const kycRequests = [
    {
      id: 1,
      userId: 'GB00001',
      name: 'John Doe',
      pan: 'ABCDE1234F',
      aadhaar: '1234-5678-9012',
      panFile: 'pan_john.jpg',
      aadhaarFront: 'aadhaar_front_john.jpg',
      aadhaarBack: 'aadhaar_back_john.jpg',
      status: 'Pending',
      submittedDate: '2024-01-25'
    },
    {
      id: 2,
      userId: 'GB00002',
      name: 'Jane Smith',
      pan: 'FGHIJ5678K',
      aadhaar: '9876-5432-1098',
      panFile: 'pan_jane.jpg',
      aadhaarFront: 'aadhaar_front_jane.jpg',
      aadhaarBack: 'aadhaar_back_jane.jpg',
      status: 'Approved',
      submittedDate: '2024-01-20'
    },
    {
      id: 3,
      userId: 'GB00003',
      name: 'Bob Wilson',
      pan: 'KLMNO9012P',
      aadhaar: '5555-6666-7777',
      panFile: 'pan_bob.jpg',
      aadhaarFront: 'aadhaar_front_bob.jpg',
      aadhaarBack: 'aadhaar_back_bob.jpg',
      status: 'Rejected',
      submittedDate: '2024-01-18'
    }
  ];

  const filteredRequests = filter === 'all' ? kycRequests : kycRequests.filter(req => req.status.toLowerCase() === filter);

  const handleAction = (action: string, requestId: number) => {
    console.log(`${action} KYC request:`, requestId);
  };

  const previewFile = (fileName: string) => {
    console.log('Preview file:', fileName);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">KYC Management</h1>
        <div className="text-sm text-gray-600">
          Pending: {kycRequests.filter(req => req.status === 'Pending').length}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            {['all', 'pending', 'approved', 'rejected'].map((status) => (
              <Button
                key={status}
                variant={filter === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* KYC Requests Table */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-3">User ID</th>
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">PAN</th>
                <th className="text-left p-3">Aadhaar</th>
                <th className="text-left p-3">Documents</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Submitted Date</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{request.userId}</td>
                  <td className="p-3">{request.name}</td>
                  <td className="p-3">{request.pan}</td>
                  <td className="p-3">{request.aadhaar}</td>
                  <td className="p-3">
                    <div className="flex space-x-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => previewFile(request.panFile)}
                        title="View PAN"
                      >
                        PAN
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => previewFile(request.aadhaarFront)}
                        title="View Aadhaar Front"
                      >
                        A-F
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => previewFile(request.aadhaarBack)}
                        title="View Aadhaar Back"
                      >
                        A-B
                      </Button>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                      request.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="p-3">{request.submittedDate}</td>
                  <td className="p-3">
                    {request.status === 'Pending' ? (
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAction('approve', request.id)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAction('reject', request.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAction('view', request.id)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    )}
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

export default KYCManagement;
