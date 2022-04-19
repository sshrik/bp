import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import koKR from 'i18n/ko_KR/translation';

i18next.use(initReactI18next).init({
  resources: {
    'ko-KR': {
      translation: koKR,
    },
  },
  supportedLngs: ['ko-KR'],
  fallbackLng: 'ko-KR',
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
