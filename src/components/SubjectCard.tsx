import React from 'react';
import { Subject } from '../types';

interface SubjectCardProps {
  subject: Subject;
  onClick: (subject: Subject) => void;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({ subject, onClick }) => {
  return (
    <div
      onClick={() => onClick(subject)}
      className="group relative overflow-hidden rounded-xl bg-white dark:bg-dark-200 shadow-lg transition-all duration-300 hover:scale-102 hover:shadow-xl dark:shadow-dark-300/30 cursor-pointer card-hover"
    >
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={subject.imageUrl}
          alt={subject.name}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">
          {subject.name}
        </h3>
        <h4 className="mt-2 text-lg text-gray-600 dark:text-gray-400 font-arabic">
          {subject.nameAr}
        </h4>
      </div>
    </div>
  );
};