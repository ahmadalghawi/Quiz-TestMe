import React from 'react';
import { BookOpen, Clock, BarChart2, Layout, Shield, Users } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'محتوى تعليمي متنوع',
    description: 'اختبارات في مختلف المواد الدراسية تناسب جميع المستويات',
  },
  {
    icon: Clock,
    title: 'تعلم في أي وقت',
    description: 'منصة متاحة على مدار الساعة لتناسب جدولك الدراسي',
  },
  {
    icon: BarChart2,
    title: 'تتبع تقدمك',
    description: 'إحصائيات وتقارير مفصلة لمتابعة مستوى تقدمك',
  },
  {
    icon: Layout,
    title: 'واجهة سهلة الاستخدام',
    description: 'تصميم عصري وبسيط يسهل التنقل والاستخدام',
  },
  {
    icon: Shield,
    title: 'محتوى موثوق',
    description: 'محتوى معد من قبل خبراء في المجال التعليمي',
  },
  {
    icon: Users,
    title: 'مجتمع تعليمي',
    description: 'تواصل مع طلاب آخرين وشارك تجربتك التعليمية',
  },
];

export const Features: React.FC = () => {
  return (
    <div className="py-24 bg-gray-50 dark:bg-dark-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl font-arabic">
            لماذا تختار منصتنا؟
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400 font-arabic">
            نقدم لك تجربة تعليمية متكاملة تساعدك على تحقيق أهدافك
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="relative group bg-white dark:bg-dark-200 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary-500 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div>
                    <span className="rounded-lg inline-flex p-3 bg-primary-50 dark:bg-primary-900/30 text-primary-500 ring-4 ring-white dark:ring-dark-200">
                      <Icon className="h-6 w-6" />
                    </span>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white font-arabic">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-base text-gray-500 dark:text-gray-400 font-arabic">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};