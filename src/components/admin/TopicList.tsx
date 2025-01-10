import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Topic } from '../../types';

interface TopicListProps {
  topics: Topic[];
  selectedTopic: Topic | null;
  onSelectTopic: (topic: Topic) => void;
  onEditTopic: (topic: Topic) => void;
  onDeleteTopic: (id: string) => void;
}

export const TopicList: React.FC<TopicListProps> = ({
  topics,
  selectedTopic,
  onSelectTopic,
  onEditTopic,
  onDeleteTopic,
}) => {
  return (
    <div className="space-y-2">
      {topics.map((topic) => (
        <div
          key={topic.id}
          onClick={() => onSelectTopic(topic)}
          className={`p-3 rounded-lg cursor-pointer flex justify-between items-center ${
            selectedTopic?.id === topic.id
              ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800'
              : 'hover:bg-gray-50 dark:hover:bg-dark-300'
          }`}
        >
          <span className="text-gray-900 dark:text-gray-100">{topic.name}</span>
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEditTopic(topic);
              }}
              className="text-gray-400 hover:text-blue-500 dark:text-gray-500 dark:hover:text-blue-400"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (confirm('Are you sure you want to delete this topic?')) {
                  onDeleteTopic(topic.id);
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