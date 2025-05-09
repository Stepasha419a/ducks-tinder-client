import * as esbuild from 'esbuild';
import { nodeExternalsPlugin } from 'esbuild-node-externals';

const build = (format) =>
  esbuild.build({
    entryPoints: ['./src/index.ts'],
    outdir: `dist/${format}`,
    bundle: true,
    minify: true,
    treeShaking: true,
    platform: 'node',
    format,
    target: 'esnext',
    plugins: [nodeExternalsPlugin()],
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
