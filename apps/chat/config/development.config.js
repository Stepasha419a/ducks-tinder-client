import { getWebpackDevConfig } from '@ducks-tinder-client/config';

export default (env) =>
  getWebpackDevConfig({
    name: 'chatApp',
    port: 3003,
    envPath: env.envPath,
    exposes: {
      './ActiveChat': './src/app/activeChat.ts',
      './IndexChat': './src/app/indexChat.ts',
      './chat': './src/app/chat.ts',
      './hocs': './src/app/hocs.ts',
      './hooks': './src/app/hooks.ts',
      './models': './src/app/models.ts',
    },
    packagePath: './package.json',
    eslintConfigPath: './eslint.config.mjs',
    staticPath: 'public',
  });
