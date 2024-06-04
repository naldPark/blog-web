// Plugins
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Fonts from 'unplugin-fonts/vite';
import Layouts from 'vite-plugin-vue-layouts';
import Vue from '@vitejs/plugin-vue';
import VueRouter from 'unplugin-vue-router/vite';
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import * as path from 'path';

// Utilities
import { defineConfig } from 'vite';
export default defineConfig({
  plugins: [
    // VueRouter({
    //   dts: 'src/typed-router.d.ts',
    // }),
    // Layouts(),
    // AutoImport({
    //   imports: [
    //     'vue',
    //     {
    //       'vue-router/auto': ['useRoute', 'useRouter'],
    //     }
    //   ],
    //   dts: 'src/auto-imports.d.ts',
    //   eslintrc: {
    //     enabled: true,
    //   },
    //   vueTemplate: true,
    // }),
    // Components({
    //   dts: 'src/components.d.ts',
    // }),
    Vue({
      template: { transformAssetUrls },
    }),
    Vuetify({
      autoImport: true,
    }),
    // Fonts({
    //   google: {
    //     families: [{
    //       name: 'Roboto',
    //       styles: 'wght@100;300;400;500;700;900',
    //     }],
    //   },
    // }),
  ],
  define: { 'process.env': {} },
  root: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://nald.me/backend',
        rewrite: (path) => path.replace(/^\/api/, ''),
        changeOrigin: true,
        secure: false,
      },
      '/chatEndPoint': {
        target: 'http://localhost:8100/',
        changeOrigin: true,
        secure: false,
      },
      '/nodeterm': {
        target: 'https://nald.me/nodeterm',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
