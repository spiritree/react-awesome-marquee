const path = require('path')
const merge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const baseConfig = require('./webpack.config.base.js')
const BUILD_OUTPUT_DIR = path.resolve('lib')

module.exports = merge(baseConfig, {
  mode: 'production',
  entry: [path.resolve('src/index.js')],
  resolve: {
    modules: [path.resolve('src')]
  },
  output: {
    path: path.resolve('lib'),
    publicPath: '/lib/',
    filename: 'index.js',
    library: 'react-awesome-marquee',
    libraryTarget: 'umd'
  },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new CleanWebpackPlugin([`${BUILD_OUTPUT_DIR}`], {
      root: path.resolve(BUILD_OUTPUT_DIR, '..'),
    })
  ],
  performance: {
    hints: false
  }
})
