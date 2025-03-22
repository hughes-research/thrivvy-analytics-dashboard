'use client';

import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for user's preferred color scheme on component mount
  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('thrivvy-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('thrivvy-theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('thrivvy-theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-colors ${
        isDarkMode 
          ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700' 
          : 'bg-gray-200 text-indigo-700 hover:bg-gray-300'
      } ${className}`}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};
