import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { LOCAL_STORAGE_KEYS } from '@/types/enum';

/** 언어 타입 */
export type LanguageType = 'ko' | 'en';

export const useLanguageStore = defineStore('language', () => {
  const language = ref<LanguageType>('ko');
  const { locale, t } = useI18n();

  const saveLanguage = (lang: LanguageType) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.LANGUAGE, lang);
    language.value = lang;
    locale.value = lang;
  };

  const getOppositeLanguage = (currentLang: LanguageType): LanguageType => {
    return currentLang === 'ko' ? 'en' : 'ko';
  };

  const loadLanguage = () => {
    const lang: LanguageType =
      /** 사용자가 세팅한 언어 */
      localStorage.getItem(LOCAL_STORAGE_KEYS.LANGUAGE) ||
      /** 사용자의 브라우저 언어  */
      navigator.language.startsWith('ko')
        ? 'ko'
        : 'en';
    language.value = lang;
    locale.value = lang;
  };

  return {
    language,
    saveLanguage,
    getOppositeLanguage,
    loadLanguage,
  };
});
