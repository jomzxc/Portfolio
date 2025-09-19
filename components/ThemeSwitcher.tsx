import React from 'react';
import { useTheme, Theme } from '../contexts/ThemeContext';

const themes: Theme[] = ['matrix', 'cyber', 'synthwave', 'solar'];

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <button
      onClick={cycleTheme}
      className="text-text-main hover:text-primary-focus hover:text-glow px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
      aria-label={`Current theme: ${theme}. Click to change.`}
    >
      [theme: {theme}]
    </button>
  );
};

export default ThemeSwitcher;
