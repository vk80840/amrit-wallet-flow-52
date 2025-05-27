
import { useState } from 'react';
import { Search, Users, TrendingUp, Eye, ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const TeamTreeViewer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState(new Set(['GB00001']));

  // Mock hierarchical data - will be from database
  const teamData = {
    'GB00001': {
      id: 'GB00001',
      name: 'John Doe',
      email: 'john@example.com',
      level: 0,
      totalBV: 125000,
      personalBV: 5000,
      leftBV: 60000,
      rightBV: 60000,
      directReferrals: 4,
      totalTeam: 25,
      children: {
        left: ['GB00002', 'GB00003'],
        right: ['GB00004', 'GB00005']
      }
    },
    'GB00002': {
      id: 'GB00002',
      name: 'Jane Smith',
      email: 'jane@example.com',
      level: 1,
      totalBV: 35000,
      personalBV: 3000,
      leftBV: 16000,
      rightBV: 16000,
      directReferrals: 2,
      totalTeam: 8,
      children: {
        left: ['GB00006', 'GB00007'],
        right: ['GB00008']
      }
    },
    'GB00003': {
      id: 'GB00003',
      name: 'Bob Wilson',
      email: 'bob@example.com',
      level: 1,
      totalBV: 25000,
      personalBV: 2500,
      leftBV: 11250,
      rightBV: 11250,
      directReferrals: 3,
      totalTeam: 6,
      children: {
        left: ['GB00009'],
        right: ['GB00010', 'GB00011']
      }
    },
    'GB00004': {
      id: 'GB00004',
      name: 'Alice Brown',
      email: 'alice@example.com',
      level: 1,
      totalBV: 40000,
      personalBV: 4000,
      leftBV: 18000,
      rightBV: 18000,
      directReferrals: 2,
      totalTeam: 12,
      children: {
        left: ['GB00012'],
        right: ['GB00013']
      }
    },
    'GB00005': {
      id: 'GB00005',
      name: 'Charlie Davis',
      email: 'charlie@example.com',
      level: 1,
      totalBV: 20000,
      personalBV: 2000,
      leftBV: 9000,
      rightBV: 9000,
      directReferrals: 1,
      totalTeam: 4,
      children: {
        left: ['GB00014'],
        right: []
      }
    }
  };

  const handleSearch = () => {
    console.log('Searching for user:', searchTerm);
    // In real implementation, this would search the database
    const foundUser = Object.values(teamData).find(user => 
      user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (foundUser) {
      setSelectedUser(foundUser);
      setExpandedNodes(new Set([foundUser.id]));
    } else {
      alert('User not found');
    }
  };

  const toggleNode = (nodeId) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const formatNumber = (num) => {
    if (num >= 100000) return `${(num / 100000).toFixed(1)}L`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const renderTreeNode = (userId, side = null, depth = 0) => {
    const user = teamData[userId];
    if (!user) return null;

    const isExpanded = expandedNodes.has(userId);
    const hasChildren = user.children && (user.children.left.length > 0 || user.children.right.length > 0);

    return (
      <div key={userId} className={`ml-${depth * 4}`}>
        <div
          className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors mb-2 ${
            selectedUser?.id === userId ? 'bg-blue-50 border-blue-300' : 'bg-white hover:bg-gray-50'
          }`}
          onClick={() => setSelectedUser(user)}
        >
          <div className="flex items-center space-x-2 flex-1">
            {hasChildren && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleNode(userId);
                }}
                className="p-1 rounded hover:bg-gray-200"
              >
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            )}
            
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
              {user.name.charAt(0)}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold">{user.name}</h4>
                {side && (
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    side === 'left' ? 'bg-purple-100 text-purple-800' : 'bg-orange-100 text-orange-800'
                  }`}>
                    {side}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">{user.id} | {user.email}</p>
              <p className="text-xs text-gray-500">
                Total BV: {formatNumber(user.totalBV)} | Team: {user.totalTeam} | Level: {user.level}
              </p>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-medium">L: {formatNumber(user.leftBV)}</p>
              <p className="text-sm font-medium">R: {formatNumber(user.rightBV)}</p>
            </div>
          </div>
        </div>

        {isExpanded && hasChildren && (
          <div className="ml-6 space-y-2">
            {user.children.left.map(childId => renderTreeNode(childId, 'left', depth + 1))}
            {user.children.right.map(childId => renderTreeNode(childId, 'right', depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Team Tree Viewer</h1>

      {/* Search Section */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Search User</h2>
        
        <div className="flex space-x-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Enter User ID, Name, or Email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button onClick={handleSearch}>
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tree View */}
        <div className="lg:col-span-2 bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Referral Tree</h2>
          
          <div className="max-h-96 overflow-y-auto">
            {renderTreeNode('GB00001')}
          </div>
        </div>

        {/* User Details */}
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">User Details</h2>
          
          {selectedUser ? (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-2">
                  {selectedUser.name.charAt(0)}
                </div>
                <h3 className="font-bold text-lg">{selectedUser.name}</h3>
                <p className="text-gray-600">{selectedUser.id}</p>
                <p className="text-sm text-gray-500">{selectedUser.email}</p>
              </div>

              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-600">Total BV</span>
                    <span className="font-bold text-blue-800">{formatNumber(selectedUser.totalBV)}</span>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-green-600">Personal BV</span>
                    <span className="font-bold text-green-800">{formatNumber(selectedUser.personalBV)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="text-center">
                      <span className="text-xs text-purple-600">Left BV</span>
                      <p className="font-bold text-purple-800">{formatNumber(selectedUser.leftBV)}</p>
                    </div>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <div className="text-center">
                      <span className="text-xs text-orange-600">Right BV</span>
                      <p className="font-bold text-orange-800">{formatNumber(selectedUser.rightBV)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Direct Referrals</span>
                    <span className="font-bold text-gray-800">{selectedUser.directReferrals}</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Team</span>
                    <span className="font-bold text-gray-800">{selectedUser.totalTeam}</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Level</span>
                    <span className="font-bold text-gray-800">{selectedUser.level}</span>
                  </div>
                </div>
              </div>

              <Button className="w-full" variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                View Full Profile
              </Button>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Select a user from the tree to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Level-wise Statistics */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Level-wise Team Statistics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[1, 2, 3, 4, 5].map((level) => (
            <div key={level} className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-4 rounded-xl">
              <h3 className="text-lg font-semibold">Level {level}</h3>
              <p className="text-2xl font-bold">{Math.floor(Math.random() * 50) + 10}</p>
              <p className="text-sm opacity-80">Members</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamTreeViewer;
