import * as esbuild from 'esbuild';
import { nodeExternalsPlugin } from 'esbuild-node-externals';
import { sassPlugin } from 'esbuild-sass-plugin';

import packageData from './package.json' with { type: "json" };

const build = (format) =>
  esbuild.build({
    entryPoints: ['./src/index.ts'],
    outdir: `dist/${format}`,
    bundle: true,
    minify: true,
    treeShaking: true,
    format,
    target: 'esnext',
    platform: 'browser',
    plugins: [
      nodeExternalsPlugin(),
      sassPlugin({
        filter: /\.module\.scss$/,
        type: 'local-css',
      }),
      sassPlugin({
        filter: /\.scss$/,
        type: 'css',
      }),
    ],
    loader: {
      '.png': 'dataurl',
    },
    external: [].concat(
      Object.keys(packageData.dependencies),
      Object.keys(packageData.peerDependencies)
    ),
  });

build('cjs')
  .then(async () => {
    console.log('CJS Build complete');
  })
  .catch(() => process.exit(1));

build('esm')
  .then(async () => {
    console.log('ESM Build complete');
  })
  .catch(() => process.exit(1));
