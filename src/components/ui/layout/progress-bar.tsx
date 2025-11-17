import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'indigo';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showLabel = true,
  size = 'md',
  color = 'indigo'
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    indigo: 'bg-indigo-500'
  };

  return (
    <div>
      {showLabel && (
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>{label || `${Math.round(percentage)}%`}</span>
          <span>{max}</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]}`}>
        <div
          className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};