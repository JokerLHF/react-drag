const webpack = require('webpack');
const commonConfig = require('./webpack.common.js');
const { merge } = require('webpack-merge');

const devConfig = {
  devtool: '#cheap-module-eval-source-map',

  mode: 'development',

  devServer: {
    host: '0.0.0.0',
    port: 3001,
    hot: true
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
}

module.exports = merge(commonConfig, devConfig)