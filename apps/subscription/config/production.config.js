import { getWebpackProdConfig } from '@ducks-tinder-client/config';

export default (env) =>
  getWebpackProdConfig({
    name: 'subscriptionApp',
    envPath: env.envPath,
    exposes: {},
    packagePath: './package.json',
    staticPath: './public',
    jsOutputPath: 'remote/chat',
  });
