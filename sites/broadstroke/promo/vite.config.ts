import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: __dirname,
  base: '/promo',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../../../common'),
      '@/': path.resolve(__dirname, '../../../common') + '/',
      'prop-types': path.resolve(__dirname, 'node_modules/prop-types'),
    },
    dedupe: ['react', 'react-dom', 'prop-types'],
  },
  server: {
    host: true,
    port: 3000,
    hmr: {
      overlay: false,
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
