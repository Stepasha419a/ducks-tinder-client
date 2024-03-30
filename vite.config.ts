import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/',
  publicDir: 'public',

  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@app': path.resolve(__dirname, './src/application'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@widgets': path.resolve(__dirname, './src/widgets/index'),
      '@hooks': path.resolve(__dirname, './src/shared/lib/hooks'),
      '@hocs': path.resolve(__dirname, './src/shared/lib/hocs'),
      '@features': path.resolve(__dirname, './src/features'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@shared/constants': path.resolve(
        __dirname,
        './src/shared/lib/constants'
      ),
      '@shared/helpers': path.resolve(__dirname, './src/shared/lib/helpers'),
      '@shared': path.resolve(__dirname, './src/shared'),
    },
  },
});
