const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackCommon = require('./config/webpack.common');

module.exports = {
  ...webpackCommon,
  entry: './src/App.tsx',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, './dist')
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: path.resolve(__dirname, './dist'),
    port: 9000,
    devMiddleware: {
      index: 'index.html',
      writeToDisk: true
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Введите все буквы, за заданное время!',
      template: './src/index.hbs'
    }),
    new CleanWebpackPlugin()
  ]
};