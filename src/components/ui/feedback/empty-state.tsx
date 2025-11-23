import React from 'react';

interface EmptyStateProps {
    icon?: string;
    title: string;
    description: string;
    action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    icon = '📝',
    title,
    description,
    action
}) => {
    return (
        <div className="text-center py-12">
            <div className="text-6xl mb-4">{icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
            {action}
        </div>
    );
};