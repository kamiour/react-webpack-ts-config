const path = require('path');

module.exports = () => ({
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
});
