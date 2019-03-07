const path = require('path');
const { entry, commonPlugins, resolve } = require('./webpack.common');

const buildPath = path.resolve(__dirname, 'dist');

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
    ...commonPlugins,
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              {
                debug: true,
                useBuiltIns: 'entry',
              },
            ],
            plugins: [
              'transform-custom-element-classes',
              '@babel/plugin-proposal-class-properties',
              ['module:fast-async', {
                env: {
                  log: false,
                },
                compiler: {
                  promises: true,
                  generators: false,
                },
                runtimePattern: null,
                useRuntimeModule: false,
              }],
            ],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  resolve,
};
