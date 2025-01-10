import React from 'react';
import { Topic } from '../types';
import { ChevronRight } from 'lucide-react';

interface TopicListProps {
  topics: Topic[];
  onSelect: (topicId: string) => void;
}

export const TopicList: React.FC<TopicListProps> = ({ topics, onSelect }) => {
  return (
    <div className="space-y-4">
      {topics.map((topic) => (
        <div
          key={topic.id}
          onClick={() => onSelect(topic.id)}
          className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md hover:bg-gray-50 cursor-pointer transition-colors"
        >
          <div>
            <h3 className="text-lg font-medium text-gray-900">{topic.name}</h3>
            <p className="mt-1 text-gray-600 font-arabic">{topic.nameAr}</p>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </div>
      ))}
    </div>
  );
};