import { createI18n } from 'vue-i18n';
import en from './en';
import ko from './ko';

// 번역 데이터 설정
const messages = {
  en: { ...en },
  ko: { ...ko },
};

export const availableLanguages = [
  { name: 'KO', code: 'ko' },
  { name: 'EN', code: 'en' },
];

// 로케일을 결정하는 함수
export const getLocale = () => {
  const lang = localStorage.getItem('language');
  return lang ? lang : 'ko';
};


const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getLocale(),
  fallbackLocale: "ko",
  messages,
  silentTranslationWarn: true, // 필요한 옵션
});

export default i18n;
