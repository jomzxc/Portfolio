import React, { useEffect, useState } from 'react';

interface PCMockupProps {
  url: string;
  title: string;
  onClose: () => void;
}

const PCMockup: React.FC<PCMockupProps> = ({ url, title, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleVisitLink = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fadeIn">
      {/* Modal Container */}
      <div className="relative w-[95vw] h-[90vh] max-w-7xl animate-scaleIn">
        {/* PC Monitor Frame */}
        <div className="relative w-full h-full bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-2xl border-8 border-gray-700 flex flex-col">
          {/* Monitor Top Bar */}
          <div className="relative bg-gradient-to-b from-gray-700 to-gray-800 rounded-t-xl px-4 py-2 flex items-center justify-between border-b-2 border-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer transition-colors" onClick={onClose}></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 text-center">
              <span className="text-gray-300 text-sm font-mono truncate block px-4">{title}</span>
            </div>
            <div className="w-16"></div>
          </div>

          {/* Screen Content Area */}
          <div className="relative flex-1 bg-white rounded-b-xl overflow-hidden">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-gray-600 font-mono">Loading demo...</p>
                </div>
              </div>
            )}
            <iframe
              src={url}
              className="w-full h-full border-0"
              title={title}
              onLoad={handleIframeLoad}
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
            />
          </div>

          {/* Monitor Stand */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-2 bg-gray-700 rounded-b-lg"></div>
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-48 h-2 bg-gray-800 rounded-full"></div>
        </div>

        {/* Action Buttons */}
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-4">
          <button
            onClick={handleVisitLink}
            className="bg-primary text-bg-main px-6 py-3 rounded-lg font-mono hover:bg-primary-focus transition-all hover:scale-105 shadow-lg hover:shadow-primary/50"
          >
            [visit_live_site]
          </button>
          <button
            onClick={onClose}
            className="bg-gray-700 text-white px-6 py-3 rounded-lg font-mono hover:bg-gray-600 transition-all hover:scale-105 shadow-lg"
          >
            [close]
          </button>
        </div>

        {/* Close button (X) in top-right corner */}
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-10 h-10 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl transition-all hover:scale-110 shadow-lg z-10"
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default PCMockup;
