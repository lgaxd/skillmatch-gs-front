import React from 'react';

interface BotaoLoadingProps {
  texto: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export const BotaoLoading: React.FC<BotaoLoadingProps> = ({
  texto,
  loading = false,
  disabled = false,
  className = ''
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={`
        w-full px-6 py-3 text-white bg-indigo-600 rounded-xl
        font-semibold transition-all duration-300
        hover:bg-indigo-700 disabled:bg-gray-400
        disabled:cursor-not-allowed transform hover:scale-[1.02]
        ${className}
      `}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          <span>Carregando...</span>
        </div>
      ) : (
        texto
      )}
    </button>
  );
};