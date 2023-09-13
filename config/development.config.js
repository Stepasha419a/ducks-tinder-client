const path = require('path');
const HtmlWebPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  target: 'web',
  stats: 'errors-warnings',
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/index.tsx',
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
  devServer: {
    static: {
      directory: path.resolve(__dirname, '..', 'dist'),
    },
    compress: true,
    port: 3000,
    hot: true,
    historyApiFallback: true,
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
      template: './public/index.html',
    }),
    new FaviconsWebpackPlugin({
      logo: './public/favicon.ico',
      manifest: './public/manifest.json',
    }),
    new ReactRefreshWebpackPlugin({
      overlay: false,
    }),
    new ForkTsCheckerWebpackPlugin(),
    new EslintWebpackPlugin({
      context: '../',
      emitWarning: true,
      failOnError: false,
      extensions: ['ts', 'tsx'],
      overrideConfigFile: './.eslintrc.js',
    }),
  ],
  optimization: {
    usedExports: true,
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  watchOptions: {
    ignored: /node_modules/,
  },
};
