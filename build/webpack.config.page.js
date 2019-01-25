const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const baseConfig = require('./webpack.config.base.js')
const BUILD_OUTPUT_DIR = path.resolve('dist')
const { name: vendorFileName } = require(path.resolve(
  `${BUILD_OUTPUT_DIR}/lib/dll-manifest.json`
))

module.exports = merge(baseConfig, {
  mode: 'production',
  entry: [path.resolve('examples/index.js')],
  output: {
    pathinfo: true,
    filename: '[name].js',
  },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new CleanWebpackPlugin([`${BUILD_OUTPUT_DIR}`], {
      root: path.resolve(BUILD_OUTPUT_DIR, '..'),
      exclude:  ['lib'],
    }),
    new ExtractTextPlugin({
      filename: 'dist/[name].[hash:8].css',
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      templateParameters: {
        dll: `<script src='/lib/${vendorFileName}.js'></script>`,
        manifest: ''
      },
      hash: false,
      inject: true
    })
  ],
  performance: {
    hints: false
  }
})
