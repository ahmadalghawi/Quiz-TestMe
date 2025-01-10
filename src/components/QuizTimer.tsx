import React, { useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useQuizStore } from '../store/quizStore';

interface QuizTimerProps {
  onTimeExpired: () => void;
}

export const QuizTimer: React.FC<QuizTimerProps> = ({ onTimeExpired }) => {
  const { timeRemaining, updateTimer } = useQuizStore();

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeRemaining > 0) {
        updateTimer();
      } else {
        clearInterval(timer);
        onTimeExpired();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, updateTimer, onTimeExpired]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center space-x-2 bg-[#1B2A3B] px-4 py-2 rounded-lg">
      <Clock className="h-4 w-4" />
      <span className="font-mono">{formatTime(timeRemaining)}</span>
    </div>
  );
};