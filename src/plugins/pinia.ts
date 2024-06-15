import { createPinia } from 'pinia';
import type { App } from 'vue';
import piniaPersist from 'pinia-plugin-persist';

export const pinia = createPinia();

pinia.use(piniaPersist);

// piniaPersist: 새로고침할때 store에서 사라지는 것 방지하기 위해 localstorage에 저장하는 기능

export function piniaPlugins(app: App) {
  app.use(pinia);
}

export default pinia;
