import { getWebpackProdConfig } from '@ducks-tinder-client/config';

export default (env) =>
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
