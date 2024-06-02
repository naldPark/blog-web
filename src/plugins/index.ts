import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import type { App } from 'vue';

const myTheme = {
  dark: true,
  colors: {
    primary: '#FFB800',
    btnPrimary: '#d69100',
    secondary: '#fcd97c',
    error: '#c24c4f',
    warning: '#6ed7f5',
    background: '#33363b',
  },
}


const vuetify = createVuetify({
  theme: {
    defaultTheme: 'myTheme',
    themes: {
      myTheme
    }
  },
});


export function registerPlugins(app: App) {
  app.use(vuetify);
}

export default vuetify;
