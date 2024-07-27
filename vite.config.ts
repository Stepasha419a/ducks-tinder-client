import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import path from 'path';

export default defineConfig({
  base: '/',
  publicDir: 'public',
  logLevel: 'warn',

  plugins: [
    react({ include: '**/*.tsx' }),
    checker({
      typescript: true,
      eslint: {
        // for example, lint .ts and .tsx
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
    }),
  ],
  preview: {
    port: 3000,
  },
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src/app'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@pages/*': path.resolve(__dirname, './src/pages'),
      '@widgets': path.resolve(__dirname, './src/widgets'),
      '@widgets/*': path.resolve(__dirname, './src/widgets'),
      '@hooks': path.resolve(__dirname, './src/shared/lib/hooks'),
      '@features': path.resolve(__dirname, './src/features'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@shared/assets': path.resolve(__dirname, './src/shared/ui/assets'),
      '@shared/constants': path.resolve(
        __dirname,
        './src/shared/lib/constants'
      ),
      '@shared/helpers': path.resolve(__dirname, './src/shared/lib/helpers'),
      '@shared': path.resolve(__dirname, './src/shared'),
    },
  },
});
