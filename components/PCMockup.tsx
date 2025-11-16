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
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-main/95 backdrop-blur-md animate-fadeIn overflow-y-auto"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-6xl my-auto animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal-style Window */}
        <div className="relative w-full bg-bg-card backdrop-blur-md border-2 border-primary/30 rounded-lg shadow-2xl shadow-primary/20 flex flex-col overflow-hidden">
          {/* Terminal Header */}
          <div className="relative bg-accent border-b-2 border-primary/30 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-primary/60 hover:bg-primary cursor-pointer transition-colors" onClick={onClose}></div>
                <div className="w-3 h-3 rounded-full border border-primary/40"></div>
                <div className="w-3 h-3 rounded-full border border-primary/40"></div>
              </div>
              <span className="text-primary font-mono text-sm">$</span>
              <span className="text-text-main font-mono text-sm">demo --url=</span>
              <span className="text-primary-focus font-mono text-sm truncate">{title}</span>
            </div>
            <button
              onClick={onClose}
              className="text-text-muted hover:text-primary transition-colors font-mono text-lg leading-none"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Screen Content Area */}
          <div className="relative bg-bg-main" style={{ height: 'calc(80vh - 8rem)' }}>
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-bg-main z-10">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-primary font-mono text-sm">[loading_demo...]</p>
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

          {/* Terminal Footer / Action Bar */}
          <div className="relative bg-accent border-t-2 border-primary/30 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-text-muted font-mono text-xs">
              <span className="text-primary">◆</span>
              <span>Live Demo</span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleVisitLink}
                className="text-primary hover:text-primary-focus font-mono text-sm transition-colors hover:text-glow"
              >
                [open_in_new_tab]
              </button>
              <span className="text-primary/30">|</span>
              <button
                onClick={onClose}
                className="text-text-muted hover:text-primary font-mono text-sm transition-colors"
              >
                [close]
              </button>
            </div>
          </div>
        </div>

        {/* Corner decorations matching the portfolio style */}
        <div className="absolute -top-2 -left-2 w-12 h-12 border-l-2 border-t-2 border-primary/40 opacity-50 pointer-events-none"></div>
        <div className="absolute -bottom-2 -right-2 w-12 h-12 border-r-2 border-b-2 border-primary/40 opacity-50 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default PCMockup;
