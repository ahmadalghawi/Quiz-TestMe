import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';

const topicSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  nameAr: z.string().min(1, 'Arabic name is required'),
  quizTime: z.string().min(1, 'Quiz time is required'),
});

type TopicFormData = z.infer<typeof topicSchema>;

interface TopicFormProps {
  initialData?: Partial<TopicFormData>;
  onSubmit: (data: TopicFormData) => void;
  onCancel: () => void;
}

const quizTimeOptions = [
  { value: '1800', label: '30:00' },
  { value: '3600', label: '1:00:00' },
  { value: '5400', label: '1:30:00' },
  { value: '7200', label: '2:00:00' },
];

export const TopicForm: React.FC<TopicFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TopicFormData>({
    resolver: zodResolver(topicSchema),
    defaultValues: initialData,
  });

  const handleFormSubmit = (data: TopicFormData) => {
    onSubmit({
      ...data,
      quizTime: data.quizTime,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-dark-200 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-dark-300">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {initialData ? 'Edit Topic' : 'Add Topic'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name (English)
            </label>
            <input
              {...register('name')}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-dark-300 bg-white dark:bg-dark-100 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name (Arabic)
            </label>
            <input
              {...register('nameAr')}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-dark-300 bg-white dark:bg-dark-100 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 font-arabic"
              dir="rtl"
            />
            {errors.nameAr && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.nameAr.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Quiz Time
            </label>
            <select
              {...register('quizTime')}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-dark-300 bg-white dark:bg-dark-100 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select quiz time</option>
              {quizTimeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.quizTime && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.quizTime.message}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 dark:border-dark-300 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {initialData ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};