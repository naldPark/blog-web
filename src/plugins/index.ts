import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import type { App } from 'vue';

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: {
        colors: {
          primary: '#FFB800',
          secondary: '#fcd97c',
          error: '#c24c4f',
          warning: '#6ed7f5',
          background: '#FFFFFF',
        },
      },
      dark: {
        colors: {
          primary: '#FFB800',
          btnPrimary: '#d69100',
          secondary: '#fcd97c',
          error: '#c24c4f',
          warning: '#6ed7f5',
          background: '#33363b',
        },
      },
    }
  },
});


export function registerPlugins(app: App) {
  app.use(vuetify);
}

export default vuetify;
