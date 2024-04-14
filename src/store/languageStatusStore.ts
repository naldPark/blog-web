import { defineStore } from 'pinia';
import i18n from '@/i18n/i18n';

export const useLanguageStatusStore = defineStore('language-status', {
    state: () => ({
        language: 'ko',
    }),

    actions: {
        // 언어 설정
        saveLanguage(lang: string) {
            // 지원되는 언어인지 확인합니다.
            if (lang === 'ko' || lang === 'en') {
                localStorage.setItem('language', lang);
                this.language = lang;
                // i18n.global.locale에 언어 값을 명시적으로 캐스팅하여 할당합니다.
                i18n.global.locale = lang as 'ko' | 'en';
            } else {
                console.warn('지원되지 않는 언어:', lang);
            }
        },

        // 언어 로드
        loadLanguage() {
            const lang = localStorage.getItem('language');
            if (lang === 'ko' || lang === 'en') {
                this.language = lang;
            } else {
                const browserLanguage = navigator.language;
                // 브라우저 언어를 기반으로 언어를 결정합니다.
                this.language = browserLanguage.startsWith('ko') ? 'ko' : 'en';
            }
            // i18n.global.locale에 언어 값을 명시적으로 캐스팅하여 할당합니다.
            i18n.global.locale = this.language as 'ko' | 'en';
        },
    },
});
