import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Brain, Target } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative pt-20 pb-32 overflow-hidden">
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block font-arabic">اختبر معلوماتك</span>
              <span className="block text-primary-500 font-arabic">وطور مهاراتك</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl font-arabic">
              منصة تعليمية متكاملة تساعدك على تقييم مستواك في مختلف المواد الدراسية من خلال اختبارات تفاعلية وتمارين متنوعة
            </p>
            <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
              <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                <Link
                  to="/register"
                  className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 md:py-4 md:text-lg md:px-10"
                >
                  ابدأ الآن مجاناً
                </Link>
                <Link
                  to="/about"
                  className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 md:py-4 md:text-lg md:px-10"
                >
                  اعرف المزيد
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-dark-200 rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
              <div className="flex justify-center mb-4">
                <GraduationCap className="h-10 w-10 text-primary-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">+1000</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-arabic">طالب مسجل</div>
            </div>
            <div className="bg-white dark:bg-dark-200 rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
              <div className="flex justify-center mb-4">
                <Brain className="h-10 w-10 text-primary-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">+500</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-arabic">اختبار متنوع</div>
            </div>
            <div className="bg-white dark:bg-dark-200 rounded-lg shadow-lg p-6 text-center transform hover:scale-105 transition-transform">
              <div className="flex justify-center mb-4">
                <Target className="h-10 w-10 text-primary-500" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">%95</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-arabic">نسبة الرضا</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};