import React from 'react';
import { useThemeClasses } from '../../../hooks/use-theme-classes';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    padding?: 'sm' | 'md' | 'lg';
    hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    padding = 'md',
    hover = false
}) => {
    const themeClasses = useThemeClasses();
    const paddingClasses = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
    };

    return (
        <div className={`
            ${themeClasses.card} rounded-2xl shadow-lg border ${themeClasses.border}
            ${paddingClasses[padding]}
            ${hover ? 'hover:shadow-xl transition-shadow duration-200' : ''}
            ${className}
        `}>
            {children}
        </div>
    );
};