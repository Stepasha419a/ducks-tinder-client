import { withoutVitePlugins } from '@storybook/builder-vite';
import type { StorybookConfig } from '@storybook/react-vite';
import * as path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  core: {
    builder: '@storybook/builder-vite',
  },
  framework: '@storybook/react-vite',
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async (config) => {
    return {
      ...config,
      resolve: {
        alias: {
          '@app': path.resolve('./src/app'),
          '@pages': path.resolve('./src/pages'),
          '@pages/*': path.resolve('./src/pages'),
          '@widgets': path.resolve('./src/widgets/index'),
          '@widgets/*': path.resolve('./src/widgets'),
          '@hooks': path.resolve('./src/shared/lib/hooks'),
          '@features': path.resolve('./src/features'),
          '@entities': path.resolve('./src/entities'),
          '@shared/constants': path.resolve('./src/shared/lib/constants'),
          '@shared/helpers': path.resolve('./src/shared/lib/helpers'),
          '@shared': path.resolve('./src/shared'),
        },
      },
      plugins: await withoutVitePlugins(config.plugins, ['node-externals']),
    };
  },
};
export default config;
