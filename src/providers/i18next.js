import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import kz from '../locales/kz/translation.json';
import en from '../locales/en/translation.json';
import ru from '../locales/ru/translation.json';

export const locales = ['ru', 'kz', 'en'];

export const capitalizedLocales = locales.map(
  (locale) => locale[0].toUpperCase() + locale.slice(1),
);
export const upperCaseLocales = locales.map((locale) => locale.toUpperCase());

export const resources = {
  ru: { translation: ru },
  kz: { translation: kz },
  en: { translation: en },
};

i18next
  .use(new LanguageDetector(null, { lookupLocalStorage: 'locale' }))
  .use(initReactI18next)
  .init(
    {
      resources,
      // debug: !!process.env.DEV_STAGE,
      load: 'languageOnly',
      ns: ['translation'],
      defaultNS: 'translation',
      fallbackNS: 'translation',
      fallbackLng: 'ru',
      lng: localStorage.getItem('locale') || 'ru',
      nsSeparator: ':::',
      pluralSeparator: '___',
      contextSeparator: '___',
      whitelist: ['ru', 'kz', 'en'],
      // saveMissing: true,
      partialBundledLanguages: true,
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    },
    (err) => {
      if (err) return console.error('Error i18next: ', err);
    },
  )
  .catch(console.error);

export default i18next;
