import { defineStore } from 'pinia';
import { ref } from 'vue'; // Import ref from vue for reactive state
import i18n from '@/i18n/i18n'; // Import i18n configuration

export const useLanguageStatusStore = defineStore('language-status', () => {
  // State definition
  const language = ref('ko');

  // Actions definition
  const saveLanguage = (lang: string) => {
    // Check if the language is supported
    if (lang === 'ko' || lang === 'en') {
      localStorage.setItem('language', lang);
      language.value = lang;
      // Explicitly cast the locale to the supported languages
      i18n.global.locale = lang as 'ko' | 'en';
    } else {
      console.warn('지원되지 않는 언어:', lang);
    }
  };

  const loadLanguage = () => {
    const lang = localStorage.getItem('language');
    if (lang === 'ko' || lang === 'en') {
      language.value = lang;
    } else {
      const browserLanguage = navigator.language;
      // Decide language based on the browser language
      language.value = browserLanguage.startsWith('ko') ? 'ko' : 'en';
    }
    // Explicitly cast the locale to the supported languages
    i18n.global.locale = language.value as 'ko' | 'en';
  };

  return {
    language,
    saveLanguage,
    loadLanguage,
  };
});
