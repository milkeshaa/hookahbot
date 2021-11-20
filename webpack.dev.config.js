
require('dotenv').config({ path: '.env.dev' });
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: process.env.APP_ENV,
  entry: {
    bot: './src/index.js',
  },
  externalsPresets: { 
    node: true 
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [
    nodeExternals()
  ],
  output: {
    publicPath: '/',
    filename: '[name].js',
    path: path.resolve(__dirname, process.env.BUILD_PATH),
    clean: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'env.API_TOKEN': JSON.stringify(process.env.API_TOKEN),
      'env.APP_ENV': JSON.stringify(process.env.APP_ENV),
      'env.DB_USERNAME': JSON.stringify(process.env.DB_USERNAME),
      'env.DB_PASSWORD': JSON.stringify(process.env.DB_PASSWORD),
      'env.DB_NAME': JSON.stringify(process.env.DB_NAME),
      'env.DB_HOST': JSON.stringify(process.env.DB_HOST),
      'env.DB_PORT': JSON.stringify(process.env.DB_PORT),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
            presets: [
              '@babel/preset-env',
            ],
            plugins: [
              "@babel/transform-runtime",
            ]
        }
      }
    ]
  }
};