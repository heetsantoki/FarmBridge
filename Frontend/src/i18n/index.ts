import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import hiTranslations from './locales/hi.json';
import guTranslations from './locales/gu.json';

// Detect or fallback language
const getInitialLang = (): string => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('preferredLanguage') || localStorage.getItem('language') || localStorage.getItem('selectedLanguage');
    if (saved && ['en', 'hi', 'gu'].includes(saved)) {
      return saved;
    }
  }
  return 'en';
};

const initialLanguage = getInitialLang();

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      hi: { translation: hiTranslations },
      gu: { translation: guTranslations },
    },
    lng: initialLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
