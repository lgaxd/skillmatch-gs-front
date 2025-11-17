import React from 'react';

interface PasswordStrengthProps {
  password: string;
}

export const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const getStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    return strength;
  };

  const strength = getStrength(password);
  const strengthLabels = ['Muito fraca', 'Fraca', 'Média', 'Forte', 'Muito forte'];
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];

  if (!password) return null;

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm text-gray-600">Força da senha:</span>
        <span className="text-sm font-medium text-gray-700">
          {strengthLabels[strength]}
        </span>
      </div>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded-full transition-colors ${
              index <= strength ? strengthColors[strength] : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
};