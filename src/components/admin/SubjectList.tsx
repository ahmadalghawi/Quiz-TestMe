import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Subject } from '../../types';

interface SubjectListProps {
  subjects: Subject[];
  selectedSubject: Subject | null;
  onSelectSubject: (subject: Subject) => void;
  onEditSubject: (subject: Subject) => void;
  onDeleteSubject: (id: string) => void;
}

export const SubjectList: React.FC<SubjectListProps> = ({
  subjects,
  selectedSubject,
  onSelectSubject,
  onEditSubject,
  onDeleteSubject,
}) => {
  return (
    <div className="space-y-2">
      {subjects.map((subject) => (
        <div
          key={subject.id}
          onClick={() => onSelectSubject(subject)}
          className={`p-3 rounded-lg cursor-pointer flex justify-between items-center ${
            selectedSubject?.id === subject.id
              ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800'
              : 'hover:bg-gray-50 dark:hover:bg-dark-300'
          }`}
        >
          <span className="text-gray-900 dark:text-gray-100">{subject.name}</span>
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEditSubject(subject);
              }}
              className="text-gray-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-400"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (confirm('Are you sure you want to delete this subject?')) {
                  onDeleteSubject(subject.id);
                }
              }}
              className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};