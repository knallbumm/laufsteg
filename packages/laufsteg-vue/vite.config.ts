import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      fahrsteg: resolve(__dirname, '../packages/fahrsteg/index.ts'),
    },
  },
});
