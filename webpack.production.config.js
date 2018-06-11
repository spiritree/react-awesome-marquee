const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: ['babel-polyfill', path.resolve(__dirname, 'src', 'index')],
  output: {
    path: path.resolve(__dirname, 'lib'),
    publicPath: '/lib/',
    filename: 'index.js',
    library: 'react-awesome-marquee',
    libraryTarget: 'umd'
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom'
    }
  },
  context: __dirname,
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          drop_console: true
        }
      }
    })
  ],
  resolve: {
    extensions: ['.js']
  }
}
