import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LoginFormData } from '../types/auth';
import { ThemeToggle } from '../components/ThemeToggle';
import { Logo } from '../components/Logo';
import { Loader2 } from 'lucide-react';


const loginSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صالح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
});

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, error: authError } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      const { user } = await login(data.email, data.password);
      navigate(user.role === 'admin' ? '/admin' : '/quiz');
    } catch (error: any) {
      setError('root', {
        message: error.response?.data?.message || 'فشل تسجيل الدخول',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Link to="/"><Logo size="lg" /></Link>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white font-arabic">
            تسجيل الدخول
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 font-arabic">
            للدخول كمسؤول: admin@example.com / admin123
            <br />
            للدخول كطالب: student@example.com / student123
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 font-arabic text-right mb-1"
              >
                البريد الإلكتروني
              </label>
              <input
                {...register('email')}
                id="email"
                type="email"
                disabled={isLoading}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-dark-300 bg-white dark:bg-dark-200 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm disabled:opacity-50 text-right"
                placeholder="example@domain.com"
                dir="ltr"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 font-arabic text-right">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 font-arabic text-right mb-1"
              >
                كلمة المرور
              </label>
              <input
                {...register('password')}
                id="password"
                type="password"
                disabled={isLoading}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-dark-300 bg-white dark:bg-dark-200 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm disabled:opacity-50 text-right"
                placeholder="********"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 font-arabic text-right">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {(errors.root || authError) && (
            <p className="text-sm text-red-600 dark:text-red-400 text-center font-arabic">
              {errors.root?.message || authError}
            </p>
          )}

          <div className="space-y-4">
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white gradient-bg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <span className="font-arabic">تسجيل الدخول</span>
              )}
            </button>

            <p className="text-center text-sm font-arabic">
              <span className="text-gray-600 dark:text-gray-400">
                ليس لديك حساب؟{' '}
              </span>
              <Link
                to="/register"
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                سجل الآن
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};