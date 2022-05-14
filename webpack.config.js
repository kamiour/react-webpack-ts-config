const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function getConfigName(environment) {
  return environment === 'development' ? 'webpack.config.dev' : 'webpack.config.prod';
}

const modeConfiguration = (env) => require(`./build-utils/${getConfigName(env)}`)(env);

module.exports = () => {
  const env = process.env.NODE_ENV;
  console.log(`mode is: ${env}`);

  return merge(
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
    modeConfiguration(env)
  );
};
