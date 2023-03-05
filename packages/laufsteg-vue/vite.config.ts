import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig } from 'vite';

const resultingFileName = 'index';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      laufsteg: resolve(__dirname, '../laufsteg/index.ts'),
    },
  },
  publicDir: false,
  build: {
    lib: {
      entry: resolve(__dirname, 'index.ts'),
      name: resultingFileName,
      fileName: (format) => `${resultingFileName}.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'laufsteg'],
      output: {
        globals: {
          vue: 'Vue',
          laufsteg: 'Laufsteg',
        },
      },
    },
  },
});
