import i18n from '@/i18n/i18n';
import type { App } from 'vue';

export const globalConfigPlugins = (app: App) => {
  /** i18n전역 세팅 */
  app.config.globalProperties.$t = i18n.global.t;
};
