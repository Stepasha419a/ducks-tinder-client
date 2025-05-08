/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import * as path from 'path';
import type { Configuration } from 'webpack';
import type { ModuleFederationOptions } from 'utils';
import { getSharedDepsConfig } from 'utils';

const HtmlWebPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

interface Options {
  envPath: string;
  remotes?: Record<string, string>;
  exposes?: Record<string, string>;
  name: string;
  packagePath: string;
  mediaPublicPath: string;
  jsOutputPath: string;
  withBundleAnalyzer?: boolean;
}

type Config = Configuration;

export function getWebpackProdConfig(options: Options): Config {
  const envPath = options.envPath || '.env';
  const isRoot = options.remotes && !options.exposes;

  const moduleFederationOptions: ModuleFederationOptions = {
    name: options.name,
    filename: 'remoteEntry.js',
    exposes: options.exposes,
    remotes: options.remotes,
    shared: getSharedDepsConfig(options.packagePath),
  };
  if (!isRoot) {
    moduleFederationOptions.runtime = false;
  }

  const optimization: Configuration['optimization'] = {
    moduleIds: 'deterministic',
    minimize: true,
    minimizer: [new TerserPlugin()],
  };
  if (isRoot) {
    optimization.splitChunks = {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    };
    optimization.runtimeChunk = 'multiple';
  }

  const plugins: Configuration['plugins'] = [
    new HtmlWebPlugin({
      template: './index.html',
    }),
    new FaviconsWebpackPlugin({
      logo: path.join(options.mediaPublicPath, 'favicon.png'),
      manifest: path.join(options.mediaPublicPath, 'manifest.json'),
    }),
    new ModuleFederationPlugin(moduleFederationOptions),
    new Dotenv({
      path: envPath,
    }),
  ];
  if (options.withBundleAnalyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return {
    target: 'web',
    stats: 'errors-warnings',
    mode: 'production',
    devtool: 'inline-source-map',
    entry: './src/index.ts',
    output: {
      filename: `${options.jsOutputPath}/[name].bundle.js`,
      chunkFilename: `${options.jsOutputPath}/[name].chunk.js`,
      path: path.resolve('./dist'),
      assetModuleFilename: 'media/[name].[hash][ext]',
      publicPath: '/',
      clean: true,
    },
    cache: {
      type: 'memory',
      cacheUnaffected: true,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      plugins: [new TsconfigPathsPlugin()],
    },
    module: {
      rules: [
        {
          test: /\.(sass|less|scss|css)$/i,
          exclude: /\.module\.scss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.module\.(sass|less|scss|css)$/i,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[name]__[local]--[hash:base64:5]',
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/images/[name].[hash][ext]',
          },
        },
        {
          test: /\.(ttf|woff|woff2|eot|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/fonts/[name][ext]',
          },
        },
        {
          test: /.tsx?$/i,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              configFile: './.babelrc',
            },
          },
          exclude: /node_modules/,
        },
      ],
    },
    plugins,
    optimization,
    watchOptions: {
      ignored: /node_modules/,
    },
  };
}
