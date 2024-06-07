import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify, type ThemeDefinition } from 'vuetify'
import type { App } from 'vue';

const myTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#ffb800',
    btnPrimary: '#d69100',
    secondary: '#fcd97c',
    error: '#c24c4f',
    warning: '#6ed7f5',
    background: '#33363b',
  }
}


const vuetify = createVuetify({
  theme: {
    defaultTheme: 'myTheme',
    variations: {
      colors: ['primary', 'secondary'],
      lighten: 1,
      darken: 2,
    },
    themes: {
      myTheme
    }
  },
});


export function registerPlugins(app: App) {
  app.use(vuetify);
}

export default vuetify;
