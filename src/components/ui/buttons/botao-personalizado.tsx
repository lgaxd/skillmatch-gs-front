import React from 'react';
import { useThemeClasses } from '../../../hooks/use-theme-classes';

interface BotaoPersonalizadoProps {
  texto: string;
  onClick: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
}

const BotaoPersonalizado: React.FC<BotaoPersonalizadoProps> = ({ 
  texto, 
  onClick, 
  className = '',
  variant = 'primary',
  disabled = false
}) => {
  const themeClasses = useThemeClasses();
  
  const getVariantClasses = () => {
    switch (variant) {
      case 'secondary':
        return `${themeClasses.button.secondary} border border-gray-300 dark:border-gray-600`;
      case 'outline':
        return `bg-transparent border border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-900`;
      default:
        return `bg-indigo-600 hover:bg-indigo-700 text-white`;
    }
  };

  const baseClasses = `
    w-full sm:w-auto
    px-8 py-3
    text-lg font-semibold
    border border-transparent
    rounded-xl
    shadow-lg
    hover:shadow-xl
    active:scale-95
    transition duration-300 ease-in-out
    focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50
    cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
  `;

  const finalClasses = `${baseClasses} ${getVariantClasses()} ${className}`.trim();

  return (
    <button
      onClick={onClick}
      className={finalClasses}
      disabled={disabled}
      aria-label={texto}
    >
      {texto}
    </button>
  );
};

export default BotaoPersonalizado;