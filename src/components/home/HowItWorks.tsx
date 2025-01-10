import React from 'react';
import { UserPlus, BookOpen, PenTool, Award } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: 'سجل حساب جديد',
    description: 'أنشئ حسابك مجاناً في ثواني',
  },
  {
    icon: BookOpen,
    title: 'اختر المادة',
    description: 'اختر المادة التي تريد اختبار نفسك فيها',
  },
  {
    icon: PenTool,
    title: 'حل الاختبارات',
    description: 'أجب على الأسئلة وتعلم من أخطائك',
  },
  {
    icon: Award,
    title: 'تابع تقدمك',
    description: 'راقب مستوى تقدمك وحسن أداءك',
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl font-arabic">
            كيف تعمل المنصة؟
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 font-arabic">
            خطوات بسيطة تفصلك عن بدء رحلتك التعليمية
          </p>
        </div>

        <div className="mt-20">
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-0.5 bg-gray-200 dark:bg-dark-300 transform -translate-y-1/2" />

            <div className="relative grid gap-12 lg:grid-cols-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="relative text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-500 ring-8 ring-white dark:ring-dark-100 mb-8 mx-auto relative z-10">
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 font-arabic">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 font-arabic">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};