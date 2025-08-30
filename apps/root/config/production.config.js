import { getWebpackProdConfig } from '@ducks-tinder-client/config';

export default (env) =>
  getWebpackProdConfig({
    name: 'rootApp',
    envPath: env.envPath,
    remotes: {
      policyApp: `promise new Promise(resolve => {
        const rootPath = window._env_.VAR_ROOT_PATH ?? ''
        const optionalTrailingSlash = rootPath.endsWith('/') ? '' : '/'
        const rootPathTrailingSlash = rootPath + optionalTrailingSlash
        const url = rootPathTrailingSlash + 'remote/policy/remoteEntry.js';
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => {
          const proxy = {
            get: (request) => window.policyApp.get(request),
            init: (arg) => {
              try {
                return window.policyApp.init(arg);
              } catch (e) {
                console.error("policyApp already initialized");
              }
            }
          };
          resolve(proxy);
        };
        document.head.appendChild(script);
      })`,
      chatApp: `promise new Promise(resolve => {
        const rootPath = window._env_.VAR_ROOT_PATH ?? ''
        const optionalTrailingSlash = rootPath.endsWith('/') ? '' : '/'
        const rootPathTrailingSlash = rootPath + optionalTrailingSlash
        const url = rootPathTrailingSlash + 'remote/chat/remoteEntry.js';
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => {
          const proxy = {
            get: (request) => window.chatApp.get(request),
            init: (arg) => {
              try {
                return window.chatApp.init(arg);
              } catch (e) {
                console.error("chatApp already initialized");
              }
            }
          };
          resolve(proxy);
        };
        document.head.appendChild(script);
      })`,
    },
    packagePath: './package.json',
    mediaPublicPath: '../../public',
    jsOutputPath: 'js',
  });
