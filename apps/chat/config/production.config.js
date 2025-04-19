const { getWebpackProdConfig } = require('@ducks-tinder-client/config');

module.exports = (env) =>
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
