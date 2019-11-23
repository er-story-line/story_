const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const paths = require('./paths')
const modules = require('./modules')

module.exports = {
  output: {
    path: path.join(__dirname, 'dist/'),
    publicPath: '/',
    filename: '[name]-[hash].bundle.js',
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'initial',
    },
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules]
      .concat(modules.additionalModulePaths || [])
      .concat(path.resolve(__dirname)),
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '../../theme.config$': path.join(__dirname, 'src/theming/theme.config'),
    },
  },
  performance: {
    maxEntrypointSize: 2 * 1024 * 1024, // 2Mb
    maxAssetSize: 2 * 1024 * 1024, // 2Mb
  },
  module: {
    rules: [
      {
        exclude: /(node_modules|bower_components)/,
        test: /\.jsx$/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env', '@babel/react'] },
      },
      {
        exclude: /(node_modules|bower_components)/,
        test: /\.js$/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
      {
        test: /\.(scss|css|less)$/,
        use: [
          {
            loader: 'style-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'less-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.(woff2|woff|ttf|eot|svg|png|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
  },
}
