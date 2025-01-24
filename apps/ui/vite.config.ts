import { peerDependencies } from './package.json';

import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';
import dts from 'vite-plugin-dts';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: '/',
    publicDir: 'public',
    logLevel: 'warn',
    define: {
      'process.env': env,
    },

    plugins: [
      react({ include: '**/*.tsx' }),
      checker({
        typescript: true,
        eslint: {
          // for example, lint .ts and .tsx
          lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
        },
      }),
      dts({ rollupTypes: true, exclude: ['**/*.stories.tsx'] }),
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
        '@widgets': path.resolve(__dirname, './src/widgets/index'),
        '@widgets/*': path.resolve(__dirname, './src/widgets'),
        '@hooks': path.resolve(__dirname, './src/shared/lib/hooks'),
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

    build: {
      sourcemap: true,
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'ducksTinderClientUi',
        formats: ['es', 'cjs', 'umd', 'iife'],
        fileName: (format) => `index.${format}.js`,
      },
      rollupOptions: {
        external: [
          ...Object.keys(peerDependencies),
          'react/jsx-runtime',
          'react-toastify/dist/ReactToastify.css',
        ],
      },
    },
  };
});
