import React, { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { countries, Country } from '../utils/countries';

interface PhoneInputProps {
  value: string;
  country: Country;
  onChange: (value: string) => void;
  onCountryChange: (country: Country) => void;
  error?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  country,
  onChange,
  onCountryChange,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div className="flex">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 border border-r-0 rounded-l-lg border-gray-300 dark:border-dark-300 bg-white dark:bg-dark-200 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-dark-300 transition-colors"
        >
          <span className="text-xl">{country.flag}</span>
          <span className="text-sm font-medium">{country.dialCode}</span>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </button>
        <input
          type="tel"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 rounded-r-lg border border-gray-300 dark:border-dark-300 bg-white dark:bg-dark-200 text-gray-900 dark:text-gray-100 focus:ring-primary-500 focus:border-primary-500"
          placeholder="5XXXXXXXX"
          dir="ltr"
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-dark-200 rounded-lg border border-gray-200 dark:border-dark-300 shadow-lg max-h-60 overflow-auto">
          {countries.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => {
                onCountryChange(c);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-dark-300 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{c.flag}</span>
                <span className="text-sm">{c.nameAr}</span>
                <span className="text-sm text-gray-500">{c.dialCode}</span>
              </div>
              {c.code === country.code && (
                <Check className="h-4 w-4 text-primary-500" />
              )}
            </button>
          ))}
        </div>
      )}

      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};