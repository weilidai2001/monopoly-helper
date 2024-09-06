const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'Monopoly Helper 123', // Add this line
      inject: true,
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    hot: true,
    open: true,
  },
  mode: 'development',
  devtool: 'inline-source-map',
};