import * as path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      assets: `${path.resolve(__dirname, './src/assets/')}`,
      components: `${path.resolve(__dirname, './src/components/')}`,
      hooks: `${path.resolve(__dirname, './src/hooks')}`,
      pages: path.resolve(__dirname, './src/pages'),
      types: `${path.resolve(__dirname, './src/types')}`,
      router: `${path.resolve(__dirname, './src/router')}`,
      store: `${path.resolve(__dirname, './src/store')}`,
    },
  },
});
