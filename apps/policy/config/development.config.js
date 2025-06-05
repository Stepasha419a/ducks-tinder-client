import { getWebpackDevConfig } from '@ducks-tinder-client/config';

export default (env) =>
  getWebpackDevConfig({
    name: 'policyApp',
    port: 3002,
    envPath: env.envPath,
    exposes: {
      './Policy': './src/app/policy.ts',
    },
    packagePath: './package.json',
    mediaPublicPath: '../../public',
    eslintConfigPath: './eslint.config.mjs',
  });
