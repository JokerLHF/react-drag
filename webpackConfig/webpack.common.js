const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {

  target: 'web',

  entry: {
    main: path.resolve(__dirname, '../src/index.tsx'),
  },

  output: {
    filename: 'drag.js',
    path: path.resolve(__dirname, '../dist')
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              "presets": ["@babel/preset-env", ["@babel/preset-react", {
                "runtime": "automatic"
              }]]
            }
          },
          'ts-loader',
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],

  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html')
    }),
    new CleanWebpackPlugin(),
  ],
}