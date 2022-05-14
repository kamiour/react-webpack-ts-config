const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function getConfigName(env) {
  return env === 'development' ? 'webpack.config.dev' : 'webpack.config.prod';
}

const modeConfiguration = (env) => require(`./build-utils/${getConfigName(env)}`)(env);

module.exports = ({ mode } = { mode: 'production' }) => {
  console.log(`mode is: ${mode}`);

  return merge(
    {
      mode,
      entry: './src/index.jsx',
      devServer: {
        hot: true,
        open: true,
        port: '3030',
      },
      output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js',
        assetModuleFilename: 'images/[hash][ext][query]',
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
          },
          {
            test: /\.(png|jpe?g|gif|svg|ico)$/,
            exclude: /node_modules/,
            use: ['url-loader', 'file-loader'],
          },
        ],
      },
      resolve: {
        extensions: ['.js', '.jsx'],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './public/index.html',
        }),
        new webpack.HotModuleReplacementPlugin(),
      ],
    },
    modeConfiguration(mode)
  );
};
