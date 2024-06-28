// Plugins
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Layouts from 'vite-plugin-vue-layouts';
import Vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import VueRouter from 'unplugin-vue-router/vite';
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import sassDts from 'vite-plugin-sass-dts';
import { fileURLToPath } from 'node:url';
import path from 'path';

// Utilities
import { defineConfig } from 'vite';
export default defineConfig({
  plugins: [
    VueRouter({
      dts: 'src/typed-router.d.ts',
    }),
    Layouts(),
    vueJsx(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
      vueTemplate: true,
      ignore: ['useCookies', 'useStorage'],
    }),
    Components({
      dts: 'src/components.d.ts',
    }),
    Vue({
      template: { transformAssetUrls },
    }),
    Vuetify({
      autoImport: true,
    }),
    sassDts({
      enabledMode: ['development', 'production'],
      global: {
        generate: false,
        outputFilePath: path.resolve(__dirname, './src/style.d.ts'),
      },
      sourceDir: path.resolve(__dirname, './src'),
      outputDir: path.resolve(__dirname, './dist'),
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        importer(url: string, prev: string) {
          if (url.startsWith('~')) {
            // node_modules에서 가져오는 경우
            return {
              file: path.resolve(__dirname, 'node_modules', url.slice(1)),
            };
          } else if (url.startsWith('@/')) {
            // 절대 경로로 가져오는 경우
            return { file: path.resolve(__dirname, 'src', url.slice(2)) };
          } else {
            // 상대 경로로 가져오는 경우
            return { file: path.resolve(path.dirname(prev), url) };
          }
        },
      },
    },
  },
  define: {
    'process.env': {},
    global: 'globalThis', // to find variable on socktjs global
  },
  root: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 8082,
    proxy: {
      '/api': {
        target: 'https://nald.me/backend',
        // target: 'http://localhost:8000',
        rewrite: (path) => path.replace(/^\/api/, ''),
        changeOrigin: true,
        secure: false,
      },
      '/chatEndPoint': {
        target: 'http://nald.me:30913',
        // target: 'http://localhost:8100/',
        changeOrigin: true,
        secure: false,
      },
      '/nodeterm': {
        // target: 'ws://localhost:8088',
        target: 'ws://nald.me:30554',
        changeOrigin: true,
        secure: false,
      },
    },
    hmr: {
      protocol: 'ws',
    },
  },
});
