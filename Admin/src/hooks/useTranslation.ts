import { useState, useEffect } from 'react';

// Define the supported languages (English, Hindi, Gujarati)
export type Language = 'en' | 'hi' | 'gu';

// Define translation data structure
export interface TranslationData {
  [key: string]: any;
}

// Import translations
import enTranslations from '../locales/en/translation.json';
import hiTranslations from '../locales/hi/translation.json';
import guTranslations from '../locales/gu/translation.json';

const translations: Record<Language, TranslationData> = {
  en: enTranslations,
  hi: hiTranslations,
  gu: guTranslations,
};

// Helper function to get nested values from an object using a dot-notation path
const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((prev, curr) => {
    return prev ? prev[curr] : null;
  }, obj);
};

export const useTranslation = () => {
  // Get language from localStorage or default to English
  const getSavedLanguage = (): Language => {
    const savedLanguage = (localStorage.getItem('language') || localStorage.getItem('preferredLanguage')) as Language;
    if (savedLanguage === 'en' || savedLanguage === 'hi' || savedLanguage === 'gu') {
      return savedLanguage;
    }
    return 'en';
  };

  const [language, setLanguageState] = useState<Language>(getSavedLanguage());

  // Set language and save to localStorage
  const setLanguage = (newLanguage: Language) => {
    localStorage.setItem('language', newLanguage);
    localStorage.setItem('preferredLanguage', newLanguage);
    localStorage.setItem('selectedLanguage', newLanguage);
    setLanguageState(newLanguage);
    window.dispatchEvent(new Event('languageChange'));
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const currentLanguage = getSavedLanguage();
      if (currentLanguage !== language) {
        setLanguageState(currentLanguage);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('languageChange', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('languageChange', handleStorageChange);
    };
  }, [language]);

  const t = (key: string): string => {
    const translation = getNestedValue(translations[language], key);
    
    if (translation === null || translation === undefined) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    
    if (typeof translation === 'object') {
      return JSON.stringify(translation);
    }
    
    return translation;
  };

  return { language, setLanguage, t };
};