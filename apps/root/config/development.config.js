const { getWebpackDevConfig } = require('@ducks-tinder-client/config');

module.exports = (env) =>
  getWebpackDevConfig({
    name: 'rootApp',
    port: 3001,
    envPath: env.envPath,
    remotes: {
      policyApp: 'policyApp@http://localhost:3002/remoteEntry.js',
      chatApp: 'chatApp@http://localhost:3003/remoteEntry.js',
    },
    packagePath: './package.json',
    mediaPublicPath: '../../public',
    eslintConfigPath: './eslint.config.mjs',
  });
