import React from 'react';
import { Trophy, ArrowLeft, Check, X } from 'lucide-react';
import { Question } from '../types';
import { DifficultyIndicator } from './DifficultyIndicator';
import { Logo } from './Logo';

interface QuizResultsProps {
  questions: Question[];
  answers: Record<string, string>;
  onRetry: () => void;
  onBack: () => void;
}

export const QuizResults: React.FC<QuizResultsProps> = ({
  questions,
  answers,
  onRetry,
  onBack,
}) => {
  const correctAnswers = questions.filter(
    (q) => answers[q.id] === q.correctOptionId
  ).length;

  const percentage = Math.round((correctAnswers / questions.length) * 100);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen quiz-background">
      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 nav-blur shadow-lg z-50">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Logo variant="light" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto pt-24 px-4 pb-32">
        {/* Results Header */}
        <div className="glass-morphism rounded-2xl p-8 text-center mb-8 floating">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 p-6 rounded-full">
              <Trophy className="h-16 w-16 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">نتائج الاختبار</h2>
          <div className="text-2xl font-arabic">
            <span className={`font-bold ${getScoreColor(percentage)}`}>{correctAnswers}</span>
            <span className="text-white/80"> من </span>
            <span className="text-white">{questions.length}</span>
            <span className="text-white/80"> صحيحة </span>
            <span className={`font-bold ${getScoreColor(percentage)}`}>({percentage}%)</span>
          </div>
        </div>

        {/* Questions Review */}
        <div className="space-y-6">
          {questions.map((question, index) => {
            const isCorrect = answers[question.id] === question.correctOptionId;
            const isAnswered = answers[question.id] !== undefined;
            const selectedOption = question.options.find(
              (opt) => opt.id === answers[question.id]
            );
            const correctOption = question.options.find(
              (opt) => opt.id === question.correctOptionId
            );

            return (
              <div key={question.id} className="glass-morphism rounded-2xl overflow-hidden shimmer">
                {/* Question Header */}
                <div className="bg-white/10 p-4 flex items-center justify-between">
                  <span className="text-white font-arabic">السؤال {index + 1}</span>
                  <div className="flex items-center space-x-3">
                    <div className={`h-3 w-3 rounded-full ${
                      isCorrect ? 'bg-green-400' : isAnswered ? 'bg-red-400' : 'bg-gray-400'
                    }`} />
                    <DifficultyIndicator difficulty={question.difficulty} />
                  </div>
                </div>

                {/* Question Content */}
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-xl font-arabic text-white text-center leading-relaxed">
                        {question.textAr}
                      </p>
                    </div>

                    {/* Answer Section */}
                    <div className="bg-white/5 rounded-xl p-6 space-y-4">
                      {isAnswered ? (
                        <>
                          <div className="space-y-3">
                            <p className="text-white/80 font-medium font-arabic">إجابتك:</p>
                            <div className={`p-4 rounded-xl ${
                              isCorrect ? 'bg-green-400/10 border border-green-400/20' : 'bg-red-400/10 border border-red-400/20'
                            }`}>
                              <div className="flex items-center justify-between">
                                <span className="font-arabic text-white">
                                  {selectedOption?.textAr}
                                </span>
                                {isCorrect ? (
                                  <Check className="h-6 w-6 text-green-400" />
                                ) : (
                                  <X className="h-6 w-6 text-red-400" />
                                )}
                              </div>
                            </div>
                          </div>

                          {!isCorrect && (
                            <div className="space-y-3">
                              <p className="text-white/80 font-medium font-arabic">الإجابة الصحيحة:</p>
                              <div className="p-4 rounded-xl bg-green-400/10 border border-green-400/20">
                                <span className="font-arabic text-white">
                                  {correctOption?.textAr}
                                </span>
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="p-4 rounded-xl bg-white/10">
                          <span className="text-white/60 font-arabic">لم تتم الإجابة</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons - Fixed at bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#1a365d] to-transparent py-8 z-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex justify-center space-x-4">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 px-8 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all duration-300 active:transform active:scale-95"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="font-arabic">العودة إلى المواضيع</span>
              </button>
              <button
                onClick={onRetry}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:opacity-90 transition-all duration-300 active:transform active:scale-95 font-arabic"
              >
                حاول مرة أخرى
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};