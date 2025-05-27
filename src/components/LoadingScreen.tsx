
import { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setScale(prev => prev === 1 ? 1.2 : 1);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
      <div className="text-center">
        <div 
          className="mb-8 transition-transform duration-800 ease-in-out"
          style={{ transform: `scale(${scale})` }}
        >
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            AA
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">AlkalineAmrit</h1>
        <p className="text-gray-600 text-lg">Making water alkaline...</p>
        <div className="mt-8">
          <div className="w-48 h-1 bg-gray-200 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-green-500 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
