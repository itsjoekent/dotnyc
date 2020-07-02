const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    home: './src/css/home.css',
    layout: './src/css/layout.css',
    main: './src/css/main.css',
    post: './src/css/post.css',
    copy: './src/js/copy.js',
  },
  output: {
    path: path.resolve(__dirname, 'www/dist/'),
    filename: '[name].js',
  },
  mode: process.env.PRODUCTION ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};
