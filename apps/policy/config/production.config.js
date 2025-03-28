const path = require('path');
const HtmlWebPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const Dotenv = require('dotenv-webpack');
/* const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin; */

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

var sharedPackage = require('../package.json');

var sharedDepsConfig = Object.entries(sharedPackage.dependencies).reduce(
  function (res, entry) {
    var dependency = entry[0];
    var version = entry[1];

    res[dependency] = {
      requiredVersion: version,
      singleton: true,
    };

    return res;
  },
  {}
);

module.exports = (env) => {
  const envPath = env.envPath || '.env';

  return {
    target: 'web',
    stats: 'errors-warnings',
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './src/index.ts',
    output: {
      filename: 'js/[name].bundle.js',
      chunkFilename: 'js/[name].chunk.js',
      path: path.resolve(__dirname, '..', 'dist'),
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
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
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
    plugins: [
      new HtmlWebPlugin({
        template: './index.html',
      }),
      new FaviconsWebpackPlugin({
        logo: '../../public/favicon.png',
        manifest: '../../public/manifest.json',
      }),
      new Dotenv({
        path: envPath,
      }),
      new ModuleFederationPlugin({
        name: 'policyApp',
        filename: 'remoteEntry.js',
        exposes: {
          './Policy': './src/app/policy.ts',
        },
        shared: sharedDepsConfig,
      }),
      //new BundleAnalyzerPlugin(),
    ],
    optimization: {
      moduleIds: 'deterministic',
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
    watchOptions: {
      ignored: /node_modules/,
    },
  };
};
