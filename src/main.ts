import { registerPlugins } from './plugins';
import App from './App.vue';
import { createApp } from 'vue';
import i18n from './i18n/i18n';
import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';
import router from './router';
import '@/styles/settings.scss';

// 앱 생성
const app = createApp(App);

// 플러그인 등록
app.use(i18n);

// 플러그인 등록
registerPlugins(app);

app.use(createPinia().use(piniaPersist));
app.use(router);

// 애플리케이션을 마운트
app.mount('#app');
