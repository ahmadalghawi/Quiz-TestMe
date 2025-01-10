import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const subjects = [
  {
    name: 'الفيزياء',
    image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa',
    description: 'اختبر فهمك للقوانين الفيزيائية والظواهر الطبيعية',
  },
  {
    name: 'الرياضيات',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904',
    description: 'تحدى نفسك في حل المسائل الرياضية والمعادلات',
  },
  {
    name: 'الكيمياء',
    image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6',
    description: 'اكتشف عالم التفاعلات الكيميائية والعناصر',
  },
];

export const Subjects: React.FC = () => {
  return (
    <div className="py-24 bg-gray-50 dark:bg-dark-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl font-arabic">
            المواد الدراسية
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 font-arabic">
            اختر من مجموعة متنوعة من المواد واختبر معرفتك
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject, index) => (
              <div
                key={index}
                className="relative group bg-white dark:bg-dark-200 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={subject.image}
                    alt={subject.name}
                    className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 font-arabic">
                    {subject.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4 font-arabic">
                    {subject.description}
                  </p>
                  <Link
                    to="/login"
                    className="inline-flex items-center text-primary-500 hover:text-primary-600 font-arabic"
                  >
                    ابدأ الاختبار
                    <ArrowLeft className="h-4 w-4 mr-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};