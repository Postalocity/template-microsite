import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';

export default defineConfig({
  plugins: [react()],
  root: __dirname,
  base: '/commercial-printing',
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, '../../../common') },
      { find: '@/', replacement: path.resolve(__dirname, '../../../common') + '/' },
      { find: '@microsite/types', replacement: path.resolve(__dirname, '../../../packages/types/src') },
      { find: '@microsite/validation', replacement: path.resolve(__dirname, '../../../packages/validation/src') },
      { find: '@microsite/engine', replacement: path.resolve(__dirname, '../../../packages/engine/src') },
      // Fix resolution for packages only declared in generated site's package.json (pulled by common/ UI components via alias from outside site tree)
      { find: new RegExp('^@radix-ui/(.*)$'), replacement: path.resolve(__dirname, 'node_modules/@radix-ui/$1') },
      { find: 'class-variance-authority', replacement: path.resolve(__dirname, 'node_modules/class-variance-authority') },
      { find: 'clsx', replacement: path.resolve(__dirname, 'node_modules/clsx') },
      { find: 'tailwind-merge', replacement: path.resolve(__dirname, 'node_modules/tailwind-merge') },
    ],
    dedupe: ['react', 'react-dom'],
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
