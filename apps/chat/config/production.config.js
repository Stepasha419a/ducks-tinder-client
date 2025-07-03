import { getWebpackProdConfig } from '@ducks-tinder-client/config';

export default (env) =>
  getWebpackProdConfig({
    name: 'chatApp',
    envPath: env.envPath,
    exposes: {
      './ActiveChat': './src/app/activeChat.ts',
      './IndexChat': './src/app/indexChat.ts',
      './chat': './src/app/chat.ts',
    },
    packagePath: './package.json',
    mediaPublicPath: '../../public',
    jsOutputPath: 'remote/chat',
  });
