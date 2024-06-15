import { piniaPlugins } from './plugins/pinia';
import App from './App.vue';
import { createApp } from 'vue';
import i18n from './i18n/i18n';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';
import { vuetifyPlugins } from './plugins/vuetify';
import router from './router';
import '@/styles/settings.scss';
import 'xterm/css/xterm.css';

// 앱 생성
const app = createApp(App);

// 플러그인 등록
app.use(i18n);

app.use(router);

// 플러그인 등록
piniaPlugins(app);
vuetifyPlugins(app);

// 애플리케이션을 마운트
app.mount('#app');
