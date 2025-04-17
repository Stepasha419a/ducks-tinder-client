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
    },
    packagePath: './package.json',
    mediaPublicPath: '../../public',
  });
