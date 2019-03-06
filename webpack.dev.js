const { entry, commonPlugins, resolve } = require('./webpack.common');

const path = require("path");
const buildPath = path.resolve(__dirname, 'dist');
const WebpackShellPlugin = require('webpack-shell-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = false;

module.exports = {
  entry,
  output: {
    path: buildPath,
    publicPath: '/',
  },
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    ...commonPlugins
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use:{
            loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: [
                      "transform-custom-element-classes",
                      "@babel/plugin-proposal-class-properties",
                    ]
                },
            },
        exclude: /node_modules/
      },
      {
        test: /\.(ts|tsx)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  resolve,
}
