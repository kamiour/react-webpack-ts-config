import * as path from 'path';
import { WebpackConfiguration } from 'webpack-dev-server';

const config: WebpackConfiguration = {
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '../dev'),
    filename: '[name].[hash].bundle.js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },
  devServer: {
    static: path.join(__dirname, '../dev'),
    port: 3030,
  },
  module: {
    rules: [
      {
        test: /\.sa?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};

export default config;
