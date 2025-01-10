import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X, Plus, Trash2 } from 'lucide-react';

const questionSchema = z.object({
  text: z.string().min(1, 'Question text is required'),
  textAr: z.string().min(1, 'Arabic question text is required'),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  options: z.array(z.object({
    id: z.string(),
    text: z.string().min(1, 'Option text is required'),
    textAr: z.string().min(1, 'Arabic option text is required'),
  })).min(2, 'At least 2 options are required'),
  correctOptionId: z.string().min(1, 'Please select the correct answer'),
});

type QuestionFormData = z.infer<typeof questionSchema>;

interface QuestionFormProps {
  initialData?: any;
  onSubmit: (data: QuestionFormData) => void;
  onCancel: () => void;
}

export const QuestionForm: React.FC<QuestionFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  const defaultValues = initialData
    ? {
        ...initialData,
        correctOptionId: initialData.correctOptionId,
        options: initialData.options.map((opt: any) => ({
          id: opt.id,
          text: opt.text,
          textAr: opt.textAr,
        })),
      }
    : {
        options: [
          { id: '1', text: '', textAr: '' },
          { id: '2', text: '', textAr: '' },
        ],
      };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
    defaultValues,
  });

  const options = watch('options');

  const addOption = () => {
    setValue('options', [
      ...options,
      { id: (options.length + 1).toString(), text: '', textAr: '' },
    ]);
  };

  const removeOption = (index: number) => {
    setValue('options', options.filter((_, i) => i !== index));
  };

  const handleFormSubmit = (data: QuestionFormData) => {
    // Ensure the form data has the correct structure before submitting
    const formattedData = {
      ...data,
      correctOptionId: data.correctOptionId,
      options: data.options.map((opt, index) => ({
        ...opt,
        id: (index + 1).toString(),
      })),
    };
    onSubmit(formattedData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-dark-200 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-dark-300 sticky top-0 bg-white dark:bg-dark-200">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {initialData ? 'Edit Question' : 'Add Question'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Question (English)
              </label>
              <textarea
                {...register('text')}
                rows={4}
                className="mt-1 block w-full rounded-lg border-gray-300 dark:border-dark-300 bg-white dark:bg-dark-100 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3"
                placeholder="Enter question text (supports mathematical equations and symbols)"
              />
              {errors.text && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.text.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Question (Arabic)
              </label>
              <textarea
                {...register('textAr')}
                rows={4}
                className="mt-1 block w-full rounded-lg border-gray-300 dark:border-dark-300 bg-white dark:bg-dark-100 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3 font-arabic"
                dir="rtl"
                placeholder="أدخل نص السؤال (يدعم المعادلات الرياضية والرموز)"
              />
              {errors.textAr && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.textAr.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Difficulty
            </label>
            <select
              {...register('difficulty')}
              className="mt-1 block w-full rounded-lg border-gray-300 dark:border-dark-300 bg-white dark:bg-dark-100 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3"
            >
              <option value="">Select difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            {errors.difficulty && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.difficulty.message}</p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Options
              </label>
              <button
                type="button"
                onClick={addOption}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Option
              </button>
            </div>
            <div className="space-y-6">
              {options.map((_, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="flex-1">
                    <input
                      {...register(`options.${index}.text`)}
                      placeholder="Option text (English)"
                      className="block w-full rounded-lg border-gray-300 dark:border-dark-300 bg-white dark:bg-dark-100 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3"
                    />
                    <input
                      type="hidden"
                      {...register(`options.${index}.id`)}
                      value={(index + 1).toString()}
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      {...register(`options.${index}.textAr`)}
                      placeholder="نص الخيار (عربي)"
                      className="block w-full rounded-lg border-gray-300 dark:border-dark-300 bg-white dark:bg-dark-100 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3 font-arabic"
                      dir="rtl"
                    />
                  </div>
                  {index >= 2 && (
                    <button
                      type="button"
                      onClick={() => removeOption(index)}
                      className="mt-3 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {errors.options && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.options.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Correct Answer
            </label>
            <select
              {...register('correctOptionId')}
              className="mt-1 block w-full rounded-lg border-gray-300 dark:border-dark-300 bg-white dark:bg-dark-100 text-gray-900 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3"
            >
              <option value="">Select correct answer</option>
              {options.map((option, index) => (
                <option key={index} value={(index + 1).toString()}>
                  {option.text || `Option ${index + 1}`}
                </option>
              ))}
            </select>
            {errors.correctOptionId && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                {errors.correctOptionId.message}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-dark-300">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-300 dark:border-dark-300 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {initialData ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};