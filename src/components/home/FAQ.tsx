import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'هل المنصة مجانية؟',
    answer: 'نعم، المنصة مجانية بالكامل لجميع الطلاب.',
  },
  {
    question: 'كيف يمكنني البدء؟',
    answer: 'يمكنك البدء بإنشاء حساب جديد ثم اختيار المادة التي تريد اختبار نفسك فيها.',
  },
  {
    question: 'هل يمكنني استخدام المنصة على الهاتف المحمول؟',
    answer: 'نعم، المنصة متوافقة مع جميع الأجهزة وتعمل بشكل جيد على الهواتف المحمولة.',
  },
  {
    question: 'كيف يمكنني تتبع تقدمي؟',
    answer: 'يمكنك مراجعة إحصائيات أدائك وتقدمك من خلال لوحة التحكم الخاصة بك.',
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="py-24 bg-gray-50 dark:bg-dark-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl font-arabic">
            الأسئلة الشائعة
          </h2>
          <p className="mt-4 text-xl text-gray-500 dark:text-gray-400 font-arabic">
            إجابات على الأسئلة الأكثر شيوعاً
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-dark-200 rounded-lg shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-right focus:outline-none"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900 dark:text-white font-arabic">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-500 dark:text-gray-400 font-arabic">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};