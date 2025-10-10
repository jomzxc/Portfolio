import React, { useState, useEffect, useRef } from 'react';
import ThemeSwitcher from './ThemeSwitcher';

interface NavbarProps {
  onTriggerDuck: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onTriggerDuck }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoClicks, setLogoClicks] = useState(0);
  const logoClickTimeout = useRef<number | null>(null);
  const [isBlogPage, setIsBlogPage] = useState(window.location.pathname === '/blog');

  useEffect(() => {
    const checkPath = () => setIsBlogPage(window.location.pathname === '/blog');

    // Listen for custom navigation events
    const handleNav = () => {
      setTimeout(checkPath, 0);
    };

    window.addEventListener('popstate', checkPath);
    window.addEventListener('pushstate', handleNav);

    checkPath(); // Check on initial render

    return () => {
      window.removeEventListener('popstate', checkPath);
      window.removeEventListener('pushstate', handleNav);
    };
  }, []);

  const mainNavLinks = [
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
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Custom navigation handler to prevent full page reloads
  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (href.startsWith('#') && !isBlogPage) {
      setIsOpen(false);
      return; // Allow default anchor link behavior on the main page
    }

    e.preventDefault();
    if (window.location.pathname !== href) {
      window.history.pushState({}, '', href);
      // Dispatch events so other components can react to navigation
      window.dispatchEvent(new PopStateEvent('popstate'));
      window.dispatchEvent(new Event('pushstate'));
    }
    setIsOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (logoClickTimeout.current) clearTimeout(logoClickTimeout.current);

    const newClickCount = logoClicks + 1;
    if (newClickCount >= 5) {
      onTriggerDuck();
      setLogoClicks(0);
    } else {
      setLogoClicks(newClickCount);
      logoClickTimeout.current = window.setTimeout(() => setLogoClicks(0), 2000);
    }

    handleNavClick(e, '/');
  };

  return (
      <>
        <header className="fixed top-0 left-0 right-0 z-50 bg-bg-main/50 backdrop-blur-lg border-b border-primary/10 shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex-shrink-0">
                <a href="/" onClick={handleLogoClick} className="font-mono text-lg font-bold text-primary hover:text-glow transition-all duration-300">
                  <span className="text-text-muted">$</span> cd /home/
                </a>
              </div>
              <div className="hidden md:flex items-center space-x-2 font-mono">
                {!isBlogPage && mainNavLinks.map((link) => (
                    <a key={link.href} href={link.href} className="text-text-main hover:text-primary-focus hover:text-glow px-3 py-2 rounded-md text-sm font-medium transition-all duration-300">
                      [{link.label}]
                    </a>
                ))}
                <a href="/blog" onClick={(e) => handleNavClick(e, '/blog')} className="text-text-main hover:text-primary-focus hover:text-glow px-3 py-2 rounded-md text-sm font-medium transition-all duration-300">
                  [blog]
                </a>
                <ThemeSwitcher />
              </div>
              <div className="md:hidden flex items-center">
                <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-text-main hover:text-primary-focus focus:outline-none">
                  <span className="sr-only">Open main menu</span>
                  <div className="w-6 h-6 flex flex-col justify-around">
                    <span className={`block w-full h-0.5 bg-current transform transition duration-300 ${isOpen ? 'rotate-45 translate-y-[5px]' : ''}`}></span>
                    <span className={`block w-full h-0.5 bg-current transition duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-full h-0.5 bg-current transform transition duration-300 ${isOpen ? '-rotate-45 -translate-y-[5px]' : ''}`}></span>
                  </div>
                </button>
              </div>
            </div>
          </nav>
        </header>

        <div className={`fixed inset-0 z-40 bg-bg-main/95 backdrop-blur-xl md:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6 font-mono text-xl">
            {!isBlogPage && mainNavLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)} className="text-text-main hover:text-primary-focus hover:text-glow px-3 py-2 rounded-md font-medium">
                  [{link.label}]
                </a>
            ))}
            <a href="/blog" onClick={(e) => handleNavClick(e, '/blog')} className="text-text-main hover:text-primary-focus hover:text-glow px-3 py-2 rounded-md font-medium">
              [blog]
            </a>
            <div className="pt-4"><ThemeSwitcher /></div>
          </div>
        </div>
      </>
  );
};

export default Navbar;
