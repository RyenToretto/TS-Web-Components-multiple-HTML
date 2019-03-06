const WebpackShellPlugin = require('webpack-shell-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
  entry: {
    main: "./src/index.tsx"
  },
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new WebpackShellPlugin({
        onBuildEnd:[
          'cp ./node_modules/\@webcomponents/custom-elements/src/native-shim.js ./dist',
          'cp ./node_modules/\@webcomponents/custom-elements/custom-elements.min.js ./dist',
          'cp ./src/index.html ./dist'
        ]
    })
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
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.tsx',
      '.ts'
    ]
  }
}
