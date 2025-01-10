import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-dark-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Logo />
            <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-md font-arabic">
              منصة تعليمية متكاملة تهدف إلى مساعدة الطلاب في تحسين مستواهم الدراسي من خلال اختبارات تفاعلية
            </p>
            <div className="mt-6 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase font-arabic">
              روابط سريعة
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/about" className="text-base text-gray-500 hover:text-gray-900 dark:hover:text-white font-arabic">
                  عن المنصة
                </Link>
              </li>
              <li>
                <Link to="/subjects" className="text-base text-gray-500 hover:text-gray-900 dark:hover:text-white font-arabic">
                  المواد الدراسية
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-base text-gray-500 hover:text-gray-900 dark:hover:text-white font-arabic">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase font-arabic">
              الدعم
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/faq" className="text-base text-gray-500 hover:text-gray-900 dark:hover:text-white font-arabic">
                  الأسئلة الشائعة
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-base text-gray-500 hover:text-gray-900 dark:hover:text-white font-arabic">
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-base text-gray-500 hover:text-gray-900 dark:hover:text-white font-arabic">
                  شروط الاستخدام
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-dark-300 pt-8 text-center">
          <p className="text-base text-gray-400 font-arabic">
            © {new Date().getFullYear()} اختبرني. جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
};