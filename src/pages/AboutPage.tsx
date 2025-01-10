import React from 'react';
import { Navbar } from '../components/home/Navbar';
import { Footer } from '../components/home/Footer';
import { GraduationCap, Target, Users, Award } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-100">
      <Navbar />
      
      {/* Hero Section */}
      <div className="pt-24 pb-16 bg-gradient-to-b from-primary-600 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-6 font-arabic">
            من نحن
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto font-arabic">
            منصة اختبرني هي منصة تعليمية رائدة تهدف إلى تطوير المهارات الأكاديمية للطلاب من خلال اختبارات تفاعلية وتجربة تعلم فريدة
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-dark-200 rounded-xl p-8 shadow-lg">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-6">
                <Target className="h-8 w-8 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-arabic">رؤيتنا</h2>
              <p className="text-gray-600 dark:text-gray-300 font-arabic">
                أن نكون المنصة التعليمية الرائدة في العالم العربي، نساهم في تطوير التعليم وتحسين مخرجاته
              </p>
            </div>

            <div className="bg-white dark:bg-dark-200 rounded-xl p-8 shadow-lg">
              <div className="flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-6">
                <GraduationCap className="h-8 w-8 text-primary-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-arabic">رسالتنا</h2>
              <p className="text-gray-600 dark:text-gray-300 font-arabic">
                توفير بيئة تعليمية تفاعلية تساعد الطلاب على تحقيق أهدافهم الأكاديمية وتطوير مهاراتهم
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="py-16 bg-gray-50 dark:bg-dark-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12 font-arabic">
            قيمنا
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-dark-300 rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <Users className="h-6 w-6 text-primary-600" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white font-arabic">التعاون</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 font-arabic">
                نؤمن بأهمية العمل الجماعي وتبادل الخبرات بين الطلاب والمعلمين
              </p>
            </div>

            <div className="bg-white dark:bg-dark-300 rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <Award className="h-6 w-6 text-primary-600" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white font-arabic">التميز</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 font-arabic">
                نسعى دائماً لتقديم أفضل تجربة تعليمية ممكنة لطلابنا
              </p>
            </div>

            <div className="bg-white dark:bg-dark-300 rounded-xl p-6 shadow-lg">
              <div className="flex items-center space-x-4 mb-4">
                <Target className="h-6 w-6 text-primary-600" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white font-arabic">الابتكار</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 font-arabic">
                نواكب التطور التكنولوجي ونبتكر حلولاً تعليمية جديدة
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};