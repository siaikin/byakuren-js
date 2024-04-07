import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import VueDevTools from 'vite-plugin-vue-devtools';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), VueDevTools()],
  build: {
    lib: {
      entry: fileURLToPath(new URL('./lib/index.ts', import.meta.url)),
      name: 'ByakurenJs',
      fileName: 'byakuren-js'
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
