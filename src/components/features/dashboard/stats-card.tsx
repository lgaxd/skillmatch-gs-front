import React from 'react';

interface StatsCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon?: string;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    className?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
    title,
    value,
    subtitle,
    icon,
    trend,
    className = ''
}) => {
    return (
        <div className={`bg-white rounded-xl p-6 shadow-lg ${className}`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
                    {subtitle && (
                        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
                    )}
                </div>
                {icon && (
                    <div className="text-3xl opacity-80">
                        {icon}
                    </div>
                )}
            </div>
            {trend && (
                <div className={`flex items-center mt-3 text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'
                    }`}>
                    <span>{trend.isPositive ? '↗' : '↘'}</span>
                    <span className="ml-1">{trend.value}%</span>
                </div>
            )}
        </div>
    );
};