import React from 'react';

interface DifficultyIndicatorProps {
  difficulty: 'easy' | 'medium' | 'hard';
}

export const DifficultyIndicator: React.FC<DifficultyIndicatorProps> = ({ difficulty }) => {
  const colors = {
    easy: 'bg-green-500',
    medium: 'bg-yellow-500',
    hard: 'bg-red-500',
  };

  return (
    <div className="flex items-center space-x-2">
      <div className={`h-3 w-3 rounded-full ${colors[difficulty]}`} />
      <span className="text-sm capitalize text-gray-600">{difficulty}</span>
    </div>
  );
};