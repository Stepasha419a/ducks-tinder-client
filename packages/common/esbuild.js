import * as esbuild from 'esbuild';
import { nodeExternalsPlugin } from 'esbuild-node-externals';

import packageData from './package.json' with { type: 'json' };

const build = (format) =>
  esbuild.build({
    entryPoints: ['./src/index.ts'],
    outdir: `dist/${format}`,
    bundle: true,
    minify: true,
    treeShaking: true,
    platform: 'browser',
    format,
    target: 'esnext',
    plugins: [nodeExternalsPlugin()],
    external: [].concat(
      Object.keys(packageData.dependencies),
      Object.keys(packageData.peerDependencies)
    ),
  });

build('cjs')
  .then(async () => {
    globalThis.console.log('CJS Build complete');
  })
  .catch(() => globalThis.process.exit(1));

build('esm')
  .then(async () => {
    globalThis.console.log('ESM Build complete');
  })
  .catch(() => globalThis.process.exit(1));
