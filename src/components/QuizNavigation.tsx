import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

interface QuizNavigationProps {
  canGoPrevious: boolean;
  isLastQuestion: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onFinish: () => void;
}

export const QuizNavigation: React.FC<QuizNavigationProps> = ({
  canGoPrevious,
  isLastQuestion,
  onPrevious,
  onNext,
  onFinish,
}) => {
  return (
    <div className="flex justify-between">
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={`flex items-center space-x-2 rounded-lg px-4 py-2 ${
          canGoPrevious
            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            : 'cursor-not-allowed bg-gray-50 text-gray-400'
        }`}
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Previous</span>
      </button>
      {isLastQuestion ? (
        <button
          onClick={onFinish}
          className="flex items-center space-x-2 rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          <span>Finish Quiz</span>
          <CheckCircle className="h-5 w-5" />
        </button>
      ) : (
        <button
          onClick={onNext}
          className="flex items-center space-x-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          <span>Next</span>
          <ArrowRight className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};