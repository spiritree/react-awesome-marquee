const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.config.base.js')
const path = require('path')
const BUILD_OUTPUT_DIR = path.resolve('dist')
const { name: vendorFileName } = require(path.resolve(
  `${BUILD_OUTPUT_DIR}/lib/dll-manifest.json`
))
const PUBLIC_PATH = '/'

module.exports = merge(baseConfig, {
  devtool: 'cheap-module-source-map',
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?reload=true&path=/__webpack_hmr',
    path.resolve('examples/index.js'),
    path.resolve(`dist/lib/${vendorFileName}.js`)
  ],
  output: {
    path: '/',
    pathinfo: true,
    publicPath: PUBLIC_PATH,
    filename: '[name].js',
    hotUpdateChunkFilename: '[hash].hot-update.js'
  },
  watchOptions: {
    ignored: /node_modules/,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      inject: true,
      templateParameters: {
        dll: `<script src='/lib/${vendorFileName}.js'></script>`,
        manifest: ''
      }
    })
  ],
  performance: {
    hints: false
  }
})
