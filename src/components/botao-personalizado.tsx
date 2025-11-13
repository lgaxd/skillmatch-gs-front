import React from 'react';

interface BotaoPersonalizadoProps {
  texto: string;
  onClick: () => void;
  className?: string;
}

const BotaoPersonalizado: React.FC<BotaoPersonalizadoProps> = ({ texto, onClick, className = '' }) => {
  const defaultClasses = `
    w-full sm:w-auto
    px-8 py-3
    text-lg font-semibold
    text-white
    bg-indigo-600
    border border-transparent
    rounded-xl
    shadow-lg
    hover:bg-indigo-700
    hover:shadow-xl
    active:bg-indigo-800
    transition duration-300 ease-in-out
    focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50
    cursor-pointer
    transform hover:scale-[1.01]
  `;

  const finalClasses = `${defaultClasses} ${className}`.trim();

  return (
    <button
      onClick={onClick}
      className={finalClasses}
      aria-label={texto}
    >
      {texto}
    </button>
  );
};

export default BotaoPersonalizado;