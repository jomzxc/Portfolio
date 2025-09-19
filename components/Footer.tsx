import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 py-8 mt-24 border-t border-primary/10 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-text-muted font-mono text-sm">
          Jommel Rowin S. Sabater &copy; {currentYear}
        </p>
      </div>
    </footer>
  );
};

export default Footer;