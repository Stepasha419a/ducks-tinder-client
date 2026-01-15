/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import * as path from 'path';
import type { ModuleFederationOptions } from 'utils';
import { getSharedDepsConfig } from 'utils';
import type { Configuration } from 'webpack';

const HtmlWebPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

interface Options {
  envPath: string;
  port: number;
  remotes?: Record<string, string>;
  exposes?: Record<string, string>;
  name: string;
  packagePath: string;
  mediaPublicPath: string;
  eslintConfigPath: string;
}

type Config = Configuration & { devServer: object };

export function getWebpackDevConfig(options: Options): Config {
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
    usedExports: true,
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
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
  }

  const publicPath = isRoot ? '/' : 'auto';

  return {
    target: 'web',
    stats: 'errors-warnings',
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './src/index.ts',
    output: {
      filename: `js/[name].[hash].bundle.js`,
      chunkFilename: `js/[name].[hash].chunk.js`,
      path: path.resolve(process.cwd(), 'dist'),
      assetModuleFilename: 'media/[name].[hash][ext]',
      publicPath: publicPath,
      clean: true,
    },
    cache: {
      type: 'memory',
      cacheUnaffected: true,
    },
    devServer: {
      static: {
        directory: path.resolve(process.cwd(), 'dist'),
      },
      compress: true,
      port: options.port,
      hot: true,
      historyApiFallback: true,
      devMiddleware: {
        writeToDisk: true,
      },
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
            },
          },
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new HtmlWebPlugin({
        template: './index.html',
      }),
      new FaviconsWebpackPlugin({
        logo: path.join(options.mediaPublicPath, 'favicon.png'),
        manifest: path.join(options.mediaPublicPath, 'manifest.json'),
      }),
      new ReactRefreshWebpackPlugin({
        overlay: false,
      }),
      new ModuleFederationPlugin(moduleFederationOptions),
      new ForkTsCheckerWebpackPlugin(),
      new EslintWebpackPlugin({
        context: '../',
        emitWarning: true,
        failOnError: false,
        extensions: ['ts', 'tsx'],
        overrideConfigFile: options.eslintConfigPath,
      }),
      new Dotenv({
        path: envPath,
      }),
      new CopyPlugin({
        patterns: [{ from: './env-config.js', to: './js/env-config.js' }],
      }),
    ],
    optimization,
    watchOptions: {
      ignored: /node_modules/,
    },
  };
}
