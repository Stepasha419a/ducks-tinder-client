import * as esbuild from 'esbuild';
import { nodeExternalsPlugin } from 'esbuild-node-externals';

await esbuild.build({
  entryPoints: ['./src/index.ts'],
  outfile: 'dist/cjs/index.js',
  bundle: true,
  minify: true,
  treeShaking: true,
  platform: 'node',
  format: 'cjs',
  target: 'esnext',
  plugins: [nodeExternalsPlugin()],
});

await esbuild.build({
  entryPoints: ['./src/index.ts'],
  outfile: 'dist/esm/index.js',
  bundle: true,
  minify: true,
  treeShaking: true,
  platform: 'node',
  format: 'esm',
  target: 'esnext',
  plugins: [nodeExternalsPlugin()],
});
