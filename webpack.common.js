const WebpackShellPlugin = require('webpack-shell-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entry = {
    index: './src/index.tsx',
    about: './src/about.tsx'
};

const commonPlugins = [
    new WebpackShellPlugin({
        onBuildEnd:[
            'cp ./node_modules/\@webcomponents/custom-elements/src/native-shim.js ./dist',
            'cp ./node_modules/\@webcomponents/custom-elements/custom-elements.min.js ./dist',
        ]
    }),
    new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: true,
        chunks: ['index'],
        filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
        template: './src/about.html',
        inject: true,
        chunks: ['about'],
        filename: 'about.html',
    })
];

const resolve = {
    extensions: [
        '.js',
        '.jsx',
        '.tsx',
        '.ts'
    ]
};

module.exports = {
    entry,
    commonPlugins,
    resolve
};