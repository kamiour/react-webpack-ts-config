import * as webpack from 'webpack';
import { merge } from 'webpack-merge';
import webpackDevConfig from './build-utils/webpack.config.dev';
import webpackProdConfig from './build-utils/webpack.config.prod';
const HtmlWebpackPlugin = require('html-webpack-plugin');

function getConfig(environment: 'development' | 'production'): webpack.Configuration {
  return environment === 'development' ? webpackDevConfig : webpackProdConfig;
}

const env = process.env.NODE_ENV as 'development' | 'production';

const config: webpack.Configuration = merge(
  {
    mode: env,
    entry: './src/index.tsx',
    output: {
      assetModuleFilename: 'images/[name][hash][ext][query]',
    },
    devServer: {
      compress: true,
      open: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(ts|tsx)?$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(png|jpe?g|gif|svg|ico)$/,
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new webpack.HotModuleReplacementPlugin(),
    ],
  },
  getConfig(env)
) as webpack.Configuration;

export default config;
