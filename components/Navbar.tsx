import React, { useState, useEffect, useRef } from 'react';
import ThemeSwitcher from './ThemeSwitcher';

interface NavbarProps {
  onTriggerDuck: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onTriggerDuck }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const logoClickTimeout = useRef<number | null>(null);

  const navLinks = [
    { href: '#about', label: 'about' },
    { href: '#tech-stack', label: 'tech-stack' },
    { href: '#projects', label: 'projects' },
    { href: '#certificates', label: 'certificates' },
    { href: '#timeline', label: 'timeline' },
    { href: '#contact', label: 'contact' },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogoClick = () => {
    if (logoClickTimeout.current) {
      clearTimeout(logoClickTimeout.current);
    }

    const newClickCount = logoClicks + 1;
    if (newClickCount >= 5) {
      onTriggerDuck();
      setLogoClicks(0);
    } else {
      setLogoClicks(newClickCount);
      logoClickTimeout.current = window.setTimeout(() => {
        setLogoClicks(0);
      }, 2000);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-bg-main/50 backdrop-blur-lg border-b border-primary/10 shadow-lg">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <a href="#" onClick={handleLogoClick} className="font-mono text-lg font-bold text-primary hover:text-glow transition-all duration-300">
                <span className="text-text-muted">$</span> cd /home/
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-2 font-mono">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-text-main hover:text-primary-focus hover:text-glow px-3 py-2 rounded-md text-sm font-medium transition-all duration-300">
                  [{link.label}]
                </a>
              ))}
              <ThemeSwitcher />
            </div>
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-text-main hover:text-primary-focus focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                <div className="w-6 h-6 flex flex-col justify-around">
                  <span className={`block w-full h-0.5 bg-current transform transition duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-[5px]' : ''}`}></span>
                  <span className={`block w-full h-0.5 bg-current transition duration-300 ease-in-out ${isOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block w-full h-0.5 bg-current transform transition duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-[5px]' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-bg-main/95 backdrop-blur-xl md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        id="mobile-menu"
      >
        <div className="flex flex-col items-center justify-center h-full text-center space-y-6 font-mono text-xl">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={toggleMenu}
              className="text-text-main hover:text-primary-focus hover:text-glow px-3 py-2 rounded-md font-medium transition-all duration-300"
            >
              [{link.label}]
            </a>
          ))}
          <div className="pt-4">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;