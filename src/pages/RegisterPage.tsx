import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { Logo } from '../components/Logo';
import { ThemeToggle } from '../components/ThemeToggle';
import { PhoneInput } from '../components/PhoneInput';
import { countries, Country } from '../utils/countries';

const registerSchema = z.object({
  name: z.string().min(2, 'الاسم يجب أن يكون أكثر من حرفين'),
  email: z.string().email('البريد الإلكتروني غير صالح'),
  phone: z.string().min(1, 'رقم الهاتف مطلوب'),
  password: z
    .string()
    .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'كلمة المرور يجب أن تحتوي على حرف كبير وحرف صغير ورقم على الأقل'
    ),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'يجب الموافقة على الشروط والأحكام',
  }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerUser, error: authError } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      acceptTerms: false,
    },
  });

  const phone = watch('phone');

  const validatePhone = (phone: string, country: Country) => {
    try {
      const phoneNumber = parsePhoneNumber(phone, country.code);
      return phoneNumber && isValidPhoneNumber(phoneNumber.number);
    } catch {
      return false;
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    console.log("data",data);
    if (!validatePhone(data.phone, selectedCountry)) {
      setError('phone', {
        message: 'رقم الهاتف غير صالح',
      });
      return;
    }

    try {
      setIsLoading(true);
      const fullPhone = `${selectedCountry.dialCode}${data.phone}`;
      await registerUser({
        ...data,
        phone: fullPhone,
      });
      navigate('/login');
    } catch (error: any) {
      setError('root', {
        message: error.response?.data?.message || 'حدث خطأ أثناء التسجيل',
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
           <Link to="/"> <Logo size="lg" /> </Link>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white font-arabic">
            إنشاء حساب جديد
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 font-arabic">
            لديك حساب بالفعل؟{' '}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              تسجيل الدخول
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 font-arabic text-right mb-1"
              >
                الاسم
              </label>
              <input
                {...register('name')}
                id="name"
                type="text"
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-dark-300 bg-white dark:bg-dark-200 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm disabled:opacity-50 text-right font-arabic"
                placeholder="أدخل اسمك الكامل"
                disabled={isLoading}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 font-arabic text-right">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Phone Input */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 font-arabic text-right mb-1"
              >
                رقم الجوال
              </label>
              <PhoneInput
                value={phone || ''}
                country={selectedCountry}
                onChange={(value) => setValue('phone', value)}
                onCountryChange={setSelectedCountry}
                error={errors.phone?.message}
              />
            </div>

            {/* Email Input */}
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
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-dark-300 bg-white dark:bg-dark-200 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm disabled:opacity-50 text-right"
                placeholder="example@domain.com"
                dir="ltr"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 font-arabic text-right">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input */}
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
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 dark:border-dark-300 bg-white dark:bg-dark-200 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm disabled:opacity-50 text-right"
                placeholder="********"
                disabled={isLoading}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 font-arabic text-right">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center justify-end">
              <input
                {...register('acceptTerms')}
                id="acceptTerms"
                type="checkbox"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded cursor-pointer"
                disabled={isLoading}
              />
              <label
                htmlFor="acceptTerms"
                className="mr-2 block text-sm text-gray-900 dark:text-gray-100 font-arabic"
              >
                أوافق على جميع الشروط والأحكام
              </label>
            </div>
            {errors.acceptTerms && (
              <p className="text-sm text-red-600 dark:text-red-400 font-arabic text-right">
                {errors.acceptTerms.message}
              </p>
            )}
          </div>

          {(errors.root || authError) && (
            <p className="text-sm text-red-600 dark:text-red-400 text-center font-arabic">
              {errors.root?.message || authError}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white gradient-bg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-300 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <span className="font-arabic">إنشاء حساب</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};