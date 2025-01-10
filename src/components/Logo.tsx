import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  asLink?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  variant = 'dark',
  size = 'md',
  asLink = false
}) => {
  const sizes = {
    sm: {
      container: 'h-8 w-8',
      icon: 'h-5 w-5',
      text: 'text-xl',
    },
    md: {
      container: 'h-10 w-10',
      icon: 'h-6 w-6',
      text: 'text-2xl',
    },
    lg: {
      container: 'h-12 w-12',
      icon: 'h-7 w-7',
      text: 'text-3xl',
    },
  };

  const LogoContent = () => (
    <div className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
      <div className={`${sizes[size].container} rounded-full bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center`}>
        <GraduationCap className={`${sizes[size].icon} text-white`} />
      </div>
      <h1 
        className={`${sizes[size].text} font-bold ${variant === 'light' ? 'text-white' : 'text-gray-900 dark:text-white'} font-arabic`}
        style={{ fontFamily: 'Noto Kufi Arabic, Noto Sans Arabic, sans-serif' }}
      >
        اختبرني
      </h1>
    </div>
  );

  return asLink ? (
    <Link to="/">
      <LogoContent />
    </Link>
  ) : (
    <LogoContent />
  );
};