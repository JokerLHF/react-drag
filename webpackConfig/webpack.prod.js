const commonConfig = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const path = require('path');

const prodCongig = {

  mode: 'production',

  devtool: 'cheap-module-source-map',

}

module.exports = merge(commonConfig, prodCongig);