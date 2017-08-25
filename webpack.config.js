const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { NODE_ENV } = process.env;
const SOURCE_PATH = path.join(__dirname, './src');
const PUBLIC_PATH = '/';
const MINIFY_OPTIONS = (NODE_ENV === 'production') ? { minimize: true } : {};

module.exports = () => {
  const plugins = [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new webpack.optimize.UglifyJsPlugin(MINIFY_OPTIONS),
    new webpack.HotModuleReplacementPlugin(),
  ];

  return {
    context: SOURCE_PATH,
    entry: {
      main: './index.js',
      vendor: ['react'],
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
      publicPath: PUBLIC_PATH,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
          ],
        },
      ],
    },
    plugins,

    devServer: {
      contentBase: './src',
      port: 9000,
      hot: true,
    },
  };
};
