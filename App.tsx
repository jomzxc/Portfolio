import React from 'react';
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

const AppContent: React.FC = () => {
  return (
    <div className="relative min-h-screen font-sans overflow-x-hidden">
      <CustomCursor />
      <AnimatedGrid />
      <div className="relative z-10">
        <Navbar />
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