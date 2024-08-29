import { piniaPlugins } from './plugins/pinia';
import App from './App.vue';
import { createApp } from 'vue';
import i18n from './i18n/i18n';
import { vuetifyPlugins } from './plugins/vuetify';
import router from './router';
import '@/styles/settings.scss';
import 'xterm/css/xterm.css';
import { globalConfigPlugins } from './plugins/global';
import { VueQueryPlugin } from 'vue-query';

// 앱 생성
const app = createApp(App, {
  suspense: false, // Suspense 비활성화
});

app.use(i18n);
app.use(router);

// 플러그인 등록
piniaPlugins(app);
vuetifyPlugins(app);
globalConfigPlugins(app);
app.use(VueQueryPlugin);

// 애플리케이션을 마운트
app.mount('#app');
