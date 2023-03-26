import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // skip /dist resolution for hmr
      'laufsteg-react': resolve(
        __dirname,
        '../../packages/laufsteg-react/index.ts'
      ),
    },
  },
});
