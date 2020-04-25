const path = require('path');

module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
  rules: [
    {
      test: /\.js$/,
      enforce: 'pre',
      exclude: /node_modules/,
      loader: 'eslint-loader',
    },
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
       loader: 'babel-loader',
       options: {
        presets: ['@babel/preset-env']
       }
      }
    },
    {
      test: /\.css$/,
      use: ['style-loader','css-loader']
    },
    {
      test: /\.(jpg|png|svg|ttf|woff|eot)$/,
      loader: 'url-loader',
      options: {
       name: 'img/[name].[ext]',
      },
    }
  ],
 }
};
