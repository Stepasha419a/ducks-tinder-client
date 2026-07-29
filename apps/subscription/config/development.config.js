import { getWebpackDevConfig } from '@ducks-tinder-client/config';

export default (env) =>
  getWebpackDevConfig({
    name: 'subscriptionApp',
    port: 3004,
    envPath: env.envPath,
    exposes: {},
    packagePath: './package.json',
    eslintConfigPath: './eslint.config.mjs',
    staticPath: 'public',
  });
