import { getWebpackProdConfig } from '@ducks-tinder-client/config';

export default (env) =>
  getWebpackProdConfig({
    name: 'rootApp',
    envPath: env.envPath,
    remotes: {
      policyApp: 'policyApp@https://localhost/remote/policy/remoteEntry.js',
      chatApp: 'chatApp@https://localhost/remote/chat/remoteEntry.js',
    },
    packagePath: './package.json',
    mediaPublicPath: '../../public',
    jsOutputPath: 'js',
  });
