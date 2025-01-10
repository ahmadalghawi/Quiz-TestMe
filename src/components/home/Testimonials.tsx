import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    content: 'ساعدتني المنصة في تحسين مستواي في الفيزياء بشكل كبير',
    author: 'أحمد محمد',
    role: 'طالب ثانوي',
    rating: 5,
  },
  {
    content: 'أسلوب تعليمي ممتع وفعال، أنصح به جميع الطلاب',
    author: 'سارة أحمد',
    role: 'طالبة جامعية',
    rating: 5,
  },
  {
    content: 'منصة رائعة ساعدتني في التحضير للاختبارات',
    author: 'عمر خالد',
    role: 'طالب ثانوي',
    rating: 4,
  },
];

export const Testimonials: React.FC = () => {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl font-arabic">
            ماذا يقول طلابنا؟
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 font-arabic">
            آراء حقيقية من طلاب استفادوا من منصتنا
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-dark-200 rounded-lg shadow-lg p-8 transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 font-arabic">
                  {testimonial.content}
                </p>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white font-arabic">
                    {testimonial.author}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-arabic">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};