import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // skip /dist resolution for hmr
      laufsteg: resolve(__dirname, '../../packages/laufsteg/index.ts'),
      'laufsteg-vue': resolve(
        __dirname,
        '../../packages/laufsteg-vue/index.ts'
      ),
    },
  },
});
