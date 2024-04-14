import { registerPlugins } from './plugins';
import App from './App.vue';
import { createApp } from 'vue';
import i18n from './i18n/i18n';
import { createPinia } from 'pinia';
import router from './router';

// Pinia 인스턴스를 생성
const pinia = createPinia();

// 앱 생성
const app = createApp(App);

// 플러그인 등록
app.use(i18n);

// 플러그인 등록
registerPlugins(app);

app.use(pinia);
app.use(router);

// 애플리케이션을 마운트
app.mount('#app');
