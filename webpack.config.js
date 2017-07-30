var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    main: './main.js',
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  externals: [
    'aws-sdk',
    'axios',
    'lodash',
    'pg-native'
  ],
  target: 'node',
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      include: __dirname,
      exclude: /node_modules/,
    }]
  }
};
