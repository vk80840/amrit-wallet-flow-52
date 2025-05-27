
import { useState } from 'react';
import { HelpCircle, Send, Eye, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const SupportTab = () => {
  const [activeView, setActiveView] = useState('create');
  const [ticketData, setTicketData] = useState({
    title: '',
    description: ''
  });

  // Mock ticket history
  const ticketHistory = [
    {
      id: 'TKT001',
      title: 'Withdrawal Request Issue',
      description: 'My withdrawal request has been pending for 5 days',
      status: 'Open',
      priority: 'High',
      date: '2024-01-20',
      response: 'We are reviewing your request. It will be processed within 2 business days.'
    },
    {
      id: 'TKT002',
      title: 'KYC Document Upload',
      description: 'Unable to upload KYC documents, getting error message',
      status: 'Resolved',
      priority: 'Medium',
      date: '2024-01-18',
      response: 'Issue has been resolved. Please try uploading again.'
    },
    {
      id: 'TKT003',
      title: 'Referral Link Not Working',
      description: 'My referral link is not crediting new signups',
      status: 'In Progress',
      priority: 'Medium',
      date: '2024-01-15',
      response: 'Our technical team is investigating this issue.'
    }
  ];

  const handleSubmitTicket = () => {
    if (!ticketData.title || !ticketData.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Support Ticket Created",
      description: "Your support ticket has been submitted successfully",
    });

    setTicketData({ title: '', description: '' });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <div className="flex space-x-4">
          <Button
            onClick={() => setActiveView('create')}
            variant={activeView === 'create' ? 'default' : 'outline'}
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Ticket</span>
          </Button>
          <Button
            onClick={() => setActiveView('history')}
            variant={activeView === 'history' ? 'default' : 'outline'}
            className="flex items-center space-x-2"
          >
            <Eye className="w-4 h-4" />
            <span>Ticket History</span>
          </Button>
        </div>
      </div>

      {/* Create Ticket Tab */}
      {activeView === 'create' && (
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Create Support Ticket</h3>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="title">Ticket Title</Label>
              <Input
                id="title"
                value={ticketData.title}
                onChange={(e) => setTicketData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Brief description of your issue"
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                value={ticketData.description}
                onChange={(e) => setTicketData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Please provide detailed information about your issue..."
                className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Be as specific as possible to help us resolve your issue faster
              </p>
            </div>

            <Button onClick={handleSubmitTicket} className="w-full">
              <Send className="w-4 h-4 mr-2" />
              Submit Support Ticket
            </Button>
          </div>

          {/* Common Issues */}
          <div className="mt-8 pt-6 border-t">
            <h4 className="font-semibold mb-4">Common Issues</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium mb-2">Withdrawal Issues</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Withdrawal requests taking longer than expected</li>
                  <li>• Bank details verification required</li>
                  <li>• Minimum withdrawal amount not met</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium mb-2">Account Issues</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• KYC document upload problems</li>
                  <li>• Password reset requests</li>
                  <li>• Profile information updates</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium mb-2">Referral Issues</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Referral links not working</li>
                  <li>• Commission not credited</li>
                  <li>• Team tree display problems</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium mb-2">Technical Issues</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Website loading problems</li>
                  <li>• Mobile app issues</li>
                  <li>• Transaction history errors</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ticket History Tab */}
      {activeView === 'history' && (
        <div className="space-y-6">
          <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Support Ticket History</h3>
            
            <div className="space-y-4">
              {ticketHistory.map((ticket) => (
                <div key={ticket.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <h4 className="font-semibold text-lg">{ticket.title}</h4>
                      <span className="text-sm text-gray-500">#{ticket.id}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2 md:mt-0">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium mb-2">Your Message:</h5>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                        {ticket.description}
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium mb-2">Support Response:</h5>
                      <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
                        {ticket.response}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                    <span className="text-sm text-gray-500">Created: {ticket.date}</span>
                    <Button size="sm" variant="outline">
                      <HelpCircle className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Support Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
              <h4 className="font-semibold mb-2">Total Tickets</h4>
              <p className="text-3xl font-bold text-blue-600">{ticketHistory.length}</p>
            </div>
            <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
              <h4 className="font-semibold mb-2">Resolved</h4>
              <p className="text-3xl font-bold text-green-600">
                {ticketHistory.filter(t => t.status === 'Resolved').length}
              </p>
            </div>
            <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
              <h4 className="font-semibold mb-2">Open</h4>
              <p className="text-3xl font-bold text-orange-600">
                {ticketHistory.filter(t => t.status === 'Open').length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportTab;
