import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // skip /dist resolution for hmr
      laufsteg: resolve(__dirname, '../laufsteg/index.ts'),
    },
  },
});
