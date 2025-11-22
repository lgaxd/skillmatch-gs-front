import { useTheme } from '../contexts/theme-context';

export const useThemeClasses = () => {
  const { isDark } = useTheme();

  return {
    // Classes comuns
    background: isDark ? 'bg-gray-900' : 'bg-gray-50',
    card: isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800',
    border: isDark ? 'border-gray-700' : 'border-gray-200',
    text: {
      primary: isDark ? 'text-white' : 'text-gray-800',
      secondary: isDark ? 'text-gray-300' : 'text-gray-600',
      muted: isDark ? 'text-gray-400' : 'text-gray-500'
    },
    button: {
      primary: isDark 
        ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
        : 'bg-indigo-600 hover:bg-indigo-700 text-white',
      secondary: isDark
        ? 'bg-gray-700 hover:bg-gray-600 text-white'
        : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
    }
  };
};