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

type MessageSchema = typeof ko // json 파일 타입화?해서 messages타입 지정해줌
const i18n = createI18n<[MessageSchema], 'ko' | 'en'>({
  legacy: false,
  globalInjection: true,
  locale: getLocale(),
  warnHtmlInMessage: 'off',
  fallbackLocale: "ko",
  messages,
  silentTranslationWarn: true, // 필요한 옵션
});

export default i18n;
