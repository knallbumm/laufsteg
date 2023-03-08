import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      // skip /dist resolution for hmr
      laufsteg: resolve(__dirname, '../packages/laufsteg/index.ts'),
    },
  },
});
