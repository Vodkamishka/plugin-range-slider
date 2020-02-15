const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
  },
  mode: 'production',
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          name: '[name].pug',
          pretty: true,
          self: true,
        },
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        use: [
          {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: './favicons'
          },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 70,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: './src/index.pug',
    }),
    new CopyWebpackPlugin([
      {from: './src/favicons', to: './favicons' },
    ]),
  ],
};