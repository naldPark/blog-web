// Plugins
import Vue from '@vitejs/plugin-vue';
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import * as path from 'path';

// Utilities
import { defineConfig } from 'vite';
export default defineConfig({
  plugins: [
    Vue({
      template: { transformAssetUrls },
    }),
    Vuetify({
      autoImport: true,
    }),
  ],
  define: { 'process.env': {} },
  root: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
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
        target: 'https://nald.me/chatEndPoint',
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
