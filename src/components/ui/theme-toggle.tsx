import React from 'react';
import { useTheme } from '../../contexts/theme-context';

export const ThemeToggle: React.FC = () => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        cursor-pointer relative inline-flex h-8 w-14 items-center rounded-full 
        transition-colors duration-300 ease-in-out
        ${isDark ? 'bg-indigo-600' : 'bg-gray-300'}
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
        focus:ring-offset-background
      `}
      aria-label={`Mudar para tema ${isDark ? 'claro' : 'escuro'}`}
    >
      <span
        className={`
          inline-block h-6 w-6 transform rounded-full bg-white shadow-lg 
          transition-transform duration-300 ease-in-out
          ${isDark ? 'translate-x-7' : 'translate-x-1'}
        `}
      >
        <span className="flex h-full w-full items-center justify-center">
          {isDark ? (
            <span className="text-gray-900 text-sm">🌙</span>
          ) : (
            <span className="text-yellow-500 text-sm">☀️</span>
          )}
        </span>
      </span>
    </button>
  );
};