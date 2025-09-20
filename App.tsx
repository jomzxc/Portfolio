import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import AnimatedGrid from './components/AnimatedGrid';
import CustomCursor from './components/CustomCursor';
import Footer from './components/Footer';
import { ThemeProvider } from './contexts/ThemeContext';
import RubberDuck from './components/RubberDuck';
import WaterEffect from './components/WaterEffect';

const AppContent: React.FC = () => {
  const [duckVisible, setDuckVisible] = useState(false);
  const [waterVisible, setWaterVisible] = useState(false);

  const handleTriggerDuck = () => {
    setDuckVisible(true);
    setWaterVisible(true);
  };

  const handleDuckClose = () => {
    setDuckVisible(false); // Duck unmounts, water starts settling
    setTimeout(() => {
      setWaterVisible(false); // Water unmounts after settling
    }, 3000); // This duration should match the transition duration in WaterEffect
  };


  return (
    <>
      <div className="relative min-h-screen font-sans overflow-x-hidden">
        <CustomCursor />
        <AnimatedGrid />
        <div className="relative z-10">
          <Navbar onTriggerDuck={handleTriggerDuck} />
          <Landing />
          <main>
            <About />
            <TechStack />
            <Projects />
            <Certificates />
            <Timeline />
            <Contact />
          </main>
          <Footer />
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