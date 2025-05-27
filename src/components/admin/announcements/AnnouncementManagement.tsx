
import { useState } from 'react';
import { Plus, Edit, Trash2, Send, Eye, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AnnouncementManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'general',
    targetUsers: 'all',
    scheduledDate: '',
    priority: 'normal'
  });

  // Mock data - will be from database
  const announcements = [
    {
      id: 1,
      title: 'System Maintenance Notice',
      message: 'Scheduled maintenance on Sunday 2 AM - 4 AM. Services may be temporarily unavailable.',
      type: 'maintenance',
      targetUsers: 'all',
      priority: 'high',
      status: 'active',
      createdBy: 'Neeraj',
      createdDate: '2024-01-25',
      scheduledDate: '2024-01-28',
      viewCount: 1234
    },
    {
      id: 2,
      title: 'New Product Launch',
      message: 'Exciting new health supplement now available in our shop! Check it out now.',
      type: 'product',
      targetUsers: 'all',
      priority: 'normal',
      status: 'active',
      createdBy: 'Vansh',
      createdDate: '2024-01-24',
      scheduledDate: null,
      viewCount: 856
    },
    {
      id: 3,
      title: 'KYC Verification Reminder',
      message: 'Please complete your KYC verification to unlock all features.',
      type: 'kyc',
      targetUsers: 'pending_kyc',
      priority: 'normal',
      status: 'active',
      createdBy: 'Deepanshu',
      createdDate: '2024-01-23',
      scheduledDate: null,
      viewCount: 345
    },
    {
      id: 4,
      title: 'Weekly Bonus Campaign',
      message: 'Double referral bonus this week! Invite friends and earn more.',
      type: 'promotion',
      targetUsers: 'active_users',
      priority: 'high',
      status: 'scheduled',
      createdBy: 'Neeraj',
      createdDate: '2024-01-25',
      scheduledDate: '2024-01-29',
      viewCount: 0
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Creating announcement:', formData);
    setShowAddForm(false);
    setFormData({
      title: '',
      message: '',
      type: 'general',
      targetUsers: 'all',
      scheduledDate: '',
      priority: 'normal'
    });
  };

  const handleDelete = (id) => {
    console.log('Deleting announcement:', id);
  };

  const handleEdit = (id) => {
    console.log('Editing announcement:', id);
  };

  const sendNow = (id) => {
    console.log('Sending announcement immediately:', id);
  };

  const getTypeColor = (type) => {
    const colors = {
      general: 'bg-blue-100 text-blue-800',
      maintenance: 'bg-red-100 text-red-800',
      product: 'bg-green-100 text-green-800',
      kyc: 'bg-yellow-100 text-yellow-800',
      promotion: 'bg-purple-100 text-purple-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      normal: 'bg-blue-100 text-blue-800',
      high: 'bg-red-100 text-red-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      scheduled: 'bg-yellow-100 text-yellow-800',
      expired: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Announcement Management</h1>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Announcement
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
          <div className="flex items-center space-x-3">
            <Send className="w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold">Active</h3>
              <p className="text-3xl font-bold">3</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-xl">
          <div className="flex items-center space-x-3">
            <Calendar className="w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold">Scheduled</h3>
              <p className="text-3xl font-bold">2</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
          <div className="flex items-center space-x-3">
            <Eye className="w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold">Total Views</h3>
              <p className="text-3xl font-bold">2,435</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold">Reach</h3>
              <p className="text-3xl font-bold">98%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Announcement Form */}
      {showAddForm && (
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Announcement</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Announcement title"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="type">Type</Label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="general">General</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="product">Product</option>
                  <option value="kyc">KYC</option>
                  <option value="promotion">Promotion</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="targetUsers">Target Users</Label>
                <select
                  id="targetUsers"
                  value={formData.targetUsers}
                  onChange={(e) => setFormData({...formData, targetUsers: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="all">All Users</option>
                  <option value="active_users">Active Users</option>
                  <option value="pending_kyc">Pending KYC</option>
                  <option value="high_volume">High Volume Users</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="priority">Priority</Label>
                <select
                  id="priority"
                  value={formData.priority}
                  onChange={(e) => setFormData({...formData, priority: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <Label htmlFor="message">Message</Label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Announcement message"
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="scheduledDate">Scheduled Date (Optional)</Label>
                <Input
                  id="scheduledDate"
                  type="datetime-local"
                  value={formData.scheduledDate}
                  onChange={(e) => setFormData({...formData, scheduledDate: e.target.value})}
                />
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button type="submit">
                {formData.scheduledDate ? 'Schedule' : 'Send Now'}
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Announcements List */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">All Announcements</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left p-3">Title</th>
                <th className="text-left p-3">Type</th>
                <th className="text-left p-3">Target</th>
                <th className="text-left p-3">Priority</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Views</th>
                <th className="text-left p-3">Created By</th>
                <th className="text-left p-3">Date</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {announcements.map((announcement) => (
                <tr key={announcement.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">
                    <div>
                      <p className="font-medium">{announcement.title}</p>
                      <p className="text-xs text-gray-600 truncate max-w-xs" title={announcement.message}>
                        {announcement.message}
                      </p>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(announcement.type)}`}>
                      {announcement.type}
                    </span>
                  </td>
                  <td className="p-3">{announcement.targetUsers.replace('_', ' ')}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(announcement.priority)}`}>
                      {announcement.priority}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(announcement.status)}`}>
                      {announcement.status}
                    </span>
                  </td>
                  <td className="p-3">{announcement.viewCount.toLocaleString()}</td>
                  <td className="p-3">{announcement.createdBy}</td>
                  <td className="p-3">{announcement.createdDate}</td>
                  <td className="p-3">
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(announcement.id)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      {announcement.status === 'scheduled' && (
                        <Button size="sm" variant="outline" onClick={() => sendNow(announcement.id)}>
                          <Send className="w-4 h-4" />
                        </Button>
                      )}
                      <Button size="sm" variant="outline" className="text-red-600" onClick={() => handleDelete(announcement.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
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

export default AnnouncementManagement;
