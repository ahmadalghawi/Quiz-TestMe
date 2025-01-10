import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Question } from '../../types';

interface QuestionListProps {
  questions: Question[];
  onEditQuestion: (question: Question) => void;
  onDeleteQuestion: (id: string) => void;
}

export const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  onEditQuestion,
  onDeleteQuestion,
}) => {
  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <div
          key={question.id}
          className="p-4 rounded-lg border border-gray-200 dark:border-dark-300 hover:border-blue-200 dark:hover:border-blue-800"
        >
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <p className="text-sm text-gray-900 dark:text-gray-100">
                {question.text}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-arabic mt-1">
                {question.textAr}
              </p>
            </div>
            <div className="flex space-x-2 ml-4">
              <button
                onClick={() => onEditQuestion(question)}
                className="text-gray-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-400"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete this question?')) {
                    onDeleteQuestion(question.id);
                  }
                }}
                className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {question.options.map((option) => (
              <div
                key={option.id}
                className={`text-sm p-2 rounded ${
                  option.id === question.correctOptionId
                    ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : 'bg-gray-50 dark:bg-dark-300 text-gray-700 dark:text-gray-300'
                }`}
              >
                {option.text}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};