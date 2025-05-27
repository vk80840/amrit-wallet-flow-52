
import { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, User, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TreeViewTab = () => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [selectedNode, setSelectedNode] = useState<any>(null);

  // Mock tree data structure
  const treeData = {
    id: 'GB00001',
    name: 'You',
    level: 0,
    children: [
      {
        id: 'GB00002',
        name: 'John Doe',
        level: 1,
        side: 'left',
        children: [
          {
            id: 'GB00004',
            name: 'Alice Brown',
            level: 2,
            side: 'left',
            children: []
          },
          {
            id: 'GB00005',
            name: 'Bob Wilson',
            level: 2,
            side: 'right',
            children: []
          }
        ]
      },
      {
        id: 'GB00003',
        name: 'Jane Smith',
        level: 1,
        side: 'right',
        children: [
          {
            id: 'GB00006',
            name: 'Carol Davis',
            level: 2,
            side: 'left',
            children: []
          }
        ]
      }
    ]
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  const handleReset = () => {
    setZoomLevel(100);
    setSelectedNode(null);
  };

  const renderNode = (node: any, depth = 0) => {
    const isRoot = depth === 0;
    const isSelected = selectedNode?.id === node.id;

    return (
      <div key={node.id} className="flex flex-col items-center">
        <div
          onClick={() => setSelectedNode(node)}
          className={`relative bg-white border-2 rounded-lg p-3 m-2 cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl ${
            isSelected ? 'border-blue-500 bg-blue-50' : 
            isRoot ? 'border-green-500 bg-green-50' : 'border-gray-300'
          }`}
          style={{ minWidth: '120px' }}
        >
          <div className="flex flex-col items-center space-y-2">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
              isRoot ? 'bg-green-500' : 'bg-blue-500'
            }`}>
              {node.name.charAt(0)}
            </div>
            <div className="text-center">
              <p className="font-semibold text-sm">{node.name}</p>
              <p className="text-xs text-gray-500">{node.id}</p>
              {!isRoot && (
                <p className="text-xs font-medium text-blue-600">Level {node.level}</p>
              )}
            </div>
          </div>
          
          {/* Connection lines */}
          {!isRoot && (
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-gray-400"></div>
          )}
        </div>

        {/* Children */}
        {node.children && node.children.length > 0 && (
          <div className="flex justify-center space-x-8 mt-4">
            {node.children.map((child: any) => (
              <div key={child.id} className="relative">
                {/* Horizontal connection line */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-4 bg-gray-400"></div>
                {renderNode(child, depth + 1)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Team Tree View</h2>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button onClick={handleZoomOut} size="sm" variant="outline">
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium">{zoomLevel}%</span>
              <Button onClick={handleZoomIn} size="sm" variant="outline">
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
            <Button onClick={handleReset} size="sm" variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {/* Tree Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Levels</p>
                <p className="font-bold text-blue-600">10</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Total Members</p>
                <p className="font-bold text-green-600">156</p>
              </div>
            </div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Left Team</p>
                <p className="font-bold text-purple-600">78</p>
              </div>
            </div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Right Team</p>
                <p className="font-bold text-orange-600">78</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tree Visualization */}
      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
        <div 
          className="overflow-auto" 
          style={{ 
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center',
            minHeight: '400px'
          }}
        >
          <div className="flex justify-center pt-8">
            {renderNode(treeData)}
          </div>
        </div>
      </div>

      {/* Selected Node Details */}
      {selectedNode && (
        <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">User Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">User ID:</span>
                  <span className="font-semibold">{selectedNode.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-semibold">{selectedNode.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Level:</span>
                  <span className="font-semibold">{selectedNode.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Side:</span>
                  <span className="font-semibold capitalize">{selectedNode.side || 'Root'}</span>
                </div>
              </div>
            </div>
            <div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-semibold text-green-600">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Join Date:</span>
                  <span className="font-semibold">2024-01-15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Purchase:</span>
                  <span className="font-semibold">₹5,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Direct Team:</span>
                  <span className="font-semibold">{selectedNode.children?.length || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreeViewTab;
