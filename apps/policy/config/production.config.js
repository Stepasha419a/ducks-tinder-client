const { getWebpackProdConfig } = require('@ducks-tinder-client/config');

module.exports = (env) =>
  getWebpackProdConfig({
    name: 'policyApp',
    envPath: env.envPath,
    exposes: {
      './Policy': './src/app/policy.ts',
    },
    packagePath: './package.json',
    mediaPublicPath: '../../public',
    jsOutputPath: 'remote/policy',
  });
