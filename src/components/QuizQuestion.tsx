import React, { useState } from 'react';
import { Question } from '../types';
import { X, SkipForward } from 'lucide-react';
import { QuizTimer } from './QuizTimer';
import { useQuizStore } from '../store/quizStore';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';

interface QuizQuestionProps {
  question: Question;
  selectedAnswer?: string;
  onAnswer: (optionId: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  currentQuestionNumber: number;
  totalQuestions: number;
  timeRemaining: number;
  canNavigatePrevious: boolean;
  onFinish: () => void;
  onExit: () => void;
  onTimeExpired: () => void;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  selectedAnswer,
  onAnswer,
  onNext,
  onPrevious,
  currentQuestionNumber,
  totalQuestions,
  timeRemaining,
  canNavigatePrevious,
  onFinish,
  onExit,
  onTimeExpired,
}) => {
  const [showExitDialog, setShowExitDialog] = useState(false);
  const { selectedSubject, selectedTopicId, quizState } = useQuizStore();
  
  const currentTopic = selectedSubject?.topics.find(topic => topic.id === selectedTopicId);
  const questions = currentTopic?.questions || [];

  const difficultyColors = {
    easy: 'bg-green-400 dark:bg-green-500',
    medium: 'bg-yellow-400 dark:bg-yellow-500',
    hard: 'bg-red-400 dark:bg-red-500',
  };

  const isLastQuestion = currentQuestionNumber === totalQuestions;

  const handleAnswerSelect = (optionId: string) => {
    onAnswer(optionId);
  };

  const navigateToQuestion = (questionNumber: number) => {
    const diff = questionNumber - currentQuestionNumber;
    if (diff > 0) {
      for (let i = 0; i < diff; i++) onNext();
    } else if (diff < 0) {
      for (let i = 0; i < Math.abs(diff); i++) onPrevious();
    }
  };

  return (
    <div className="min-h-screen quiz-background dark:bg-dark-100">
      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 nav-blur shadow-lg z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Logo variant="light" />
          <div className="flex items-center space-x-4">
            <div className="text-white font-arabic text-lg">
              <span className="opacity-75">{selectedSubject?.nameAr}</span>
              <span className="mx-2 opacity-50">|</span>
              <span>{currentTopic?.nameAr}</span>
            </div>
            <ThemeToggle />
            <button
              onClick={() => setShowExitDialog(true)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {showExitDialog && (
        <div className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="glass-morphism rounded-2xl p-8 max-w-sm w-full mx-4 text-white dark:text-gray-100 shimmer">
            <h3 className="text-xl font-bold mb-4">
              Are you sure you want to exit?
            </h3>
            <p className="text-white/80 dark:text-gray-300 mb-8">
              Your progress will not be saved.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowExitDialog(false)}
                className="px-6 py-2.5 rounded-xl bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
              >
                Continue
              </button>
              <button
                onClick={onExit}
                className="px-6 py-2.5 rounded-xl bg-red-500/80 hover:bg-red-500 transition-colors"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto pt-24 px-4 pb-8 relative z-10">
        {/* Quiz Header */}
        <div className="glass-morphism rounded-2xl p-4 mb-6 flex items-center justify-between text-white dark:text-gray-100 glow">
          <div className="flex items-center space-x-4">
            <div className="bg-white/10 dark:bg-white/5 px-6 py-2.5 rounded-xl">
              <span className="font-arabic text-lg">السؤال {currentQuestionNumber}/{totalQuestions}</span>
            </div>
            <QuizTimer onTimeExpired={onTimeExpired} />
          </div>
          <div className={`h-4 w-4 rounded-full ${difficultyColors[question.difficulty]} animate-pulse shadow-lg`} />
        </div>

        {/* Question Card */}
        <div className="glass-morphism rounded-2xl p-6 md:p-8 mb-8 floating shimmer">
          <p className="text-xl md:text-2xl text-center font-arabic leading-relaxed text-white dark:text-gray-100">
            {question.textAr}
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswerSelect(option.id)}
              className={`
                option-card p-6 rounded-xl text-center font-arabic text-xl
                transition-all duration-300 transform hover:scale-102
                ${selectedAnswer === option.id 
                  ? 'selected text-white dark:text-gray-100' 
                  : 'text-gray-900 dark:text-gray-800 hover:shadow-lg'}
              `}
            >
              {option.textAr}
            </button>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="glass-morphism rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={onPrevious}
              disabled={!canNavigatePrevious}
              className={`
                px-8 py-3 rounded-xl font-medium transition-all duration-300
                ${canNavigatePrevious
                  ? 'bg-white/10 dark:bg-white/5 text-white dark:text-gray-100 hover:bg-white/20 dark:hover:bg-white/10'
                  : 'bg-white/5 dark:bg-white/5 text-white/40 dark:text-gray-400 cursor-not-allowed'}
              `}
            >
              Previous
            </button>

            <button
              onClick={onNext}
              className={`
                px-8 py-3 rounded-xl font-medium transition-all duration-300
                ${!selectedAnswer && !isLastQuestion
                  ? 'bg-white/10 dark:bg-white/5 text-white dark:text-gray-100 hover:bg-white/20 dark:hover:bg-white/10'
                  : 'bg-white/5 dark:bg-white/5 text-white/40 dark:text-gray-400 cursor-not-allowed'}
              `}
            >
              Skip
              <SkipForward className="h-4 w-4 ml-2 inline-block" />
            </button>

            {isLastQuestion ? (
              <button
                onClick={onFinish}
                disabled={!selectedAnswer}
                className={`
                  px-8 py-3 rounded-xl font-medium transition-all duration-300
                  ${selectedAnswer
                    ? 'bg-gradient-to-r from-green-400 to-green-500 text-white dark:text-gray-100 hover:opacity-90'
                    : 'bg-green-500/30 text-white/60 dark:text-gray-400 cursor-not-allowed'}
                `}
              >
                Finish Quiz
              </button>
            ) : (
              <button
                onClick={onNext}
                disabled={!selectedAnswer}
                className={`
                  px-8 py-3 rounded-xl font-medium transition-all duration-300
                  ${selectedAnswer
                    ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white dark:text-gray-100 hover:opacity-90'
                    : 'bg-blue-500/30 text-white/60 dark:text-gray-400 cursor-not-allowed'}
                `}
              >
                Next
              </button>
            )}
          </div>

          {/* Question Pills */}
          <div className="border-t border-white/10 dark:border-white/5 pt-6">
            <div className="flex gap-2 overflow-x-auto py-2">
              {Array.from({ length: totalQuestions }, (_, i) => {
                const questionNumber = i + 1;
                const currentQuestion = questions[i];
                const isAnswered = currentQuestion && quizState.answers[currentQuestion.id] !== undefined;
                const isCurrent = questionNumber === currentQuestionNumber;
                
                return (
                  <button
                    key={i}
                    onClick={() => navigateToQuestion(questionNumber)}
                    className={`
                      relative min-w-[2.5rem] h-10 rounded-xl font-medium 
                      transition-all duration-300 hover:scale-105
                      ${isCurrent
                        ? 'bg-white dark:bg-white text-[#1a365d] dark:text-dark-100'
                        : 'bg-white/10 dark:bg-white/5 text-white dark:text-gray-100 hover:bg-white/20 dark:hover:bg-white/10'}
                      ${isAnswered ? 'ring-2 ring-blue-400 dark:ring-blue-500' : ''}
                    `}
                  >
                    <span className="relative z-10">{questionNumber}</span>
                    {isAnswered && (
                      <span 
                        className="absolute inset-0 bg-blue-400 dark:bg-blue-500 opacity-10 rounded-xl"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};