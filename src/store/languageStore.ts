import { defineStore } from 'pinia';
import { ref } from 'vue'; // Import ref from vue for reactive state
import i18n from '@/i18n/i18n'; // Import i18n configuration
import { useI18n } from 'vue-i18n';
import { LOCAL_STORAGE_KEYS } from '@/types/enum';

export type LanguageType = 'ko' | 'en';

export const useLanguageStore = defineStore('language', () => {
  // State definition
  const language = ref<LanguageType>('ko');
  const { locale, t } = useI18n();

  // Actions definition
  const saveLanguage = (lang: LanguageType) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.LANGUAGE, lang);
    language.value = lang;
    locale.value = lang as 'ko' | 'en';
  };

  const loadLanguage = () => {
    const lang = localStorage.getItem(LOCAL_STORAGE_KEYS.LANGUAGE);
    if (lang) {
      language.value = lang as LanguageType;
    } else {
      const browserLanguage = navigator.language;
      // Decide language based on the browser language
      language.value = browserLanguage.startsWith('ko') ? 'ko' : 'en';
    }
    // Explicitly cast the locale to the supported languages
    locale.value = language.value;
  };

  return {
    language,
    saveLanguage,
    loadLanguage,
  };
});
