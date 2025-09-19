import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';

const Navbar: React.FC = () => {
  const navLinks = [
    { href: '#about', label: 'about' },
    { href: '#tech-stack', label: 'tech-stack' },
    { href: '#projects', label: 'projects' },
    { href: '#certificates', label: 'certificates' },
    { href: '#timeline', label: 'timeline' },
    { href: '#contact', label: 'contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-main/50 backdrop-blur-lg border-b border-primary/10 shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="#" className="font-mono text-lg font-bold text-primary hover:text-glow transition-all duration-300">
              <span className="text-text-muted">$</span> cd /home/
            </a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2 font-mono">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="text-text-main hover:text-primary-focus hover:text-glow px-3 py-2 rounded-md text-sm font-medium transition-all duration-300">
                  [{link.label}]
                </a>
              ))}
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;