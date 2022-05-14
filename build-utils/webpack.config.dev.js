module.exports = () => ({
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.sa?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
});
