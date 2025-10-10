import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AnimatedGrid from './components/AnimatedGrid';
import CustomCursor from './components/CustomCursor';
import { ThemeProvider } from './contexts/ThemeContext';
import RubberDuck from './components/RubberDuck';
import WaterEffect from './components/WaterEffect';
import Portfolio from './components/Portfolio';
import Blog from './components/Blog';

const AppContent: React.FC = () => {
  const [duckVisible, setDuckVisible] = useState(false);
  const [waterVisible, setWaterVisible] = useState(false);
  const [page, setPage] = useState(window.location.pathname);

  // This effect listens for browser navigation events (back/forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      setPage(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleTriggerDuck = () => {
    setDuckVisible(true);
    setWaterVisible(true);
  };

  const handleDuckClose = () => {
    setDuckVisible(false);
    setTimeout(() => {
      setWaterVisible(false);
    }, 3000);
  };

  // Simple router to render the correct page component
  const renderPage = () => {
    switch (page) {
      case '/blog':
        return <Blog />;
      default:
        return <Portfolio />;
    }
  };

  return (
      <>
        <div className="relative min-h-screen font-sans overflow-x-hidden">
          <CustomCursor />
          <AnimatedGrid />
          <div className="relative z-10">
            <Navbar onTriggerDuck={handleTriggerDuck} />
            {renderPage()}
          </div>
        </div>
        {waterVisible && <WaterEffect isSettling={!duckVisible} />}
        {duckVisible && <RubberDuck onClose={handleDuckClose} />}
      </>
  );
};

const App: React.FC = () => {
  return (
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
  );
};

export default App;
