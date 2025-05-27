
import { useState } from 'react';
import { Bell, Calendar, Eye, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AnnouncementsTab = () => {
  const [filter, setFilter] = useState('all');

  // Mock announcements data
  const announcements = [
    {
      id: 1,
      title: 'New Product Launch - Alkaline Water Filter Pro Max',
      content: 'We are excited to announce the launch of our latest product, the Alkaline Water Filter Pro Max. This advanced filtration system offers superior performance with 9-stage purification and enhanced alkaline minerals.',
      type: 'product',
      priority: 'high',
      date: '2024-01-22',
      read: false,
      author: 'Product Team'
    },
    {
      id: 2,
      title: 'Maintenance Notice - Website Downtime',
      content: 'Our website will undergo scheduled maintenance on January 25th from 2:00 AM to 4:00 AM IST. During this time, the platform may be temporarily unavailable. We apologize for any inconvenience.',
      type: 'maintenance',
      priority: 'medium',
      date: '2024-01-20',
      read: true,
      author: 'Technical Team'
    },
    {
      id: 3,
      title: 'Updated Commission Structure',
      content: 'Effective February 1st, 2024, we are implementing an enhanced commission structure that provides better rewards for our top performers. Level 1 commission increases from 15% to 18%.',
      type: 'policy',
      priority: 'high',
      date: '2024-01-18',
      read: false,
      author: 'Management'
    },
    {
      id: 4,
      title: 'KYC Verification Reminder',
      content: 'Please ensure your KYC documents are up to date. Incomplete KYC may result in withdrawal delays. Our support team is available to assist with any documentation issues.',
      type: 'reminder',
      priority: 'medium',
      date: '2024-01-15',
      read: true,
      author: 'Compliance Team'
    },
    {
      id: 5,
      title: 'Holiday Schedule - January 26th',
      content: 'In observance of Republic Day, our offices will be closed on January 26th. Customer support will resume normal operations on January 27th.',
      type: 'holiday',
      priority: 'low',
      date: '2024-01-14',
      read: true,
      author: 'HR Team'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'product': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'maintenance': return <AlertCircle className="w-5 h-5 text-orange-600" />;
      case 'policy': return <Info className="w-5 h-5 text-blue-600" />;
      case 'reminder': return <Bell className="w-5 h-5 text-yellow-600" />;
      case 'holiday': return <Calendar className="w-5 h-5 text-purple-600" />;
      default: return <Info className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'product': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      case 'policy': return 'bg-blue-100 text-blue-800';
      case 'reminder': return 'bg-yellow-100 text-yellow-800';
      case 'holiday': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAnnouncements = announcements.filter(announcement => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !announcement.read;
    return announcement.type === filter;
  });

  const unreadCount = announcements.filter(a => !a.read).length;

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className="space-y-4 sm:space-y-6">
        {/* Header with Statistics */}
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-3 sm:p-6 w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0">
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2">Announcements</h2>
              <p className="text-sm sm:text-base text-gray-600">Stay updated with the latest news and updates</p>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="bg-blue-50 px-2 sm:px-4 py-1 sm:py-2 rounded-lg">
                <span className="text-xs sm:text-sm text-gray-600">Total: </span>
                <span className="font-bold text-blue-600">{announcements.length}</span>
              </div>
              <div className="bg-red-50 px-2 sm:px-4 py-1 sm:py-2 rounded-lg">
                <span className="text-xs sm:text-sm text-gray-600">Unread: </span>
                <span className="font-bold text-red-600">{unreadCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-3 sm:p-6 w-full">
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => setFilter('all')}
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              className="text-xs sm:text-sm"
            >
              All
            </Button>
            <Button
              onClick={() => setFilter('unread')}
              variant={filter === 'unread' ? 'default' : 'outline'}
              size="sm"
              className="relative text-xs sm:text-sm"
            >
              Unread
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>
            <Button
              onClick={() => setFilter('product')}
              variant={filter === 'product' ? 'default' : 'outline'}
              size="sm"
              className="text-xs sm:text-sm"
            >
              Products
            </Button>
            <Button
              onClick={() => setFilter('policy')}
              variant={filter === 'policy' ? 'default' : 'outline'}
              size="sm"
              className="text-xs sm:text-sm"
            >
              Policies
            </Button>
            <Button
              onClick={() => setFilter('maintenance')}
              variant={filter === 'maintenance' ? 'default' : 'outline'}
              size="sm"
              className="text-xs sm:text-sm"
            >
              Maintenance
            </Button>
          </div>
        </div>

        {/* Announcements List */}
        <div className="space-y-3 sm:space-y-4">
          {filteredAnnouncements.map((announcement) => (
            <div 
              key={announcement.id} 
              className={`bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-3 sm:p-6 w-full ${
                !announcement.read ? 'border-l-4 border-l-blue-500' : ''
              }`}
            >
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {getTypeIcon(announcement.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 sm:mb-3">
                    <div className="flex items-start space-x-2 mb-2 md:mb-0">
                      <h3 className="text-sm sm:text-lg font-semibold text-gray-800 line-clamp-2">
                        {announcement.title}
                      </h3>
                      {!announcement.read && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></span>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-1 sm:space-x-2 flex-wrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(announcement.type)}`}>
                        {announcement.type}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(announcement.priority)}`}>
                        {announcement.priority}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed line-clamp-3">
                    {announcement.content}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm text-gray-500 space-y-2 sm:space-y-0">
                    <div className="flex items-center space-x-2 sm:space-x-4">
                      <span>By {announcement.author}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{announcement.date}</span>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="self-start sm:self-auto">
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      <span className="text-xs sm:text-sm">Read More</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAnnouncements.length === 0 && (
          <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-8 sm:p-12 w-full">
            <div className="text-center">
              <Bell className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-600 mb-2">No Announcements Found</h3>
              <p className="text-sm sm:text-base text-gray-500">
                {filter === 'unread' 
                  ? "You're all caught up! No unread announcements."
                  : `No announcements found for the selected filter: ${filter}`}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementsTab;
