const { getWebpackProdConfig } = require('@ducks-tinder-client/config');

module.exports = (env) =>
  getWebpackProdConfig({
    name: 'rootApp',
    envPath: env.envPath,
    remotes: {
      policyApp:
        'policyApp@https://localhost:3000/remote/policy/remoteEntry.js',
      chatApp: 'chatApp@https://localhost:3000/remote/chat/remoteEntry.js',
    },
    packagePath: './package.json',
    mediaPublicPath: '../../public',
    jsOutputPath: 'js',
  });
