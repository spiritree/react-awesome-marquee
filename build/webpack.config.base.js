const path = require('path')
const webpack = require('webpack')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
const {
  BUILD_OUTPUT_DIR = path.resolve('dist'),
  PUBLIC_PATH = '/',
  NODE_ENV = 'development'
} = process.env

const devMode = NODE_ENV === 'development'

const baseConfig = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  resolve: {
    modules: [
      path.resolve('src'),
      path.resolve('examples'),
      path.resolve('node_modules')
    ]
  },
  module: {
    strictExportPresence: true,
    noParse: /\.min\.js/,
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        },
        include: [
          path.resolve('examples'),
          path.resolve('src'),
          path.resolve('lib')
        ]
      },
      {
        test: /\.styl$/,
        use: [
          ExtractCssChunks.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: false,
              importLoaders: 1,
              localIdentName: '[local]_[hash:base64:4]'
            }
          },
          'postcss-loader',
          {
            loader: 'stylus-loader',
            options: {
              includePaths: path.resolve('examples'),
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)(\?|$)/,
        include: path.resolve(__dirname, 'examples'),
        use: ['url-loader?limit=8192&name=assets/[name].[ext]']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        PUBLIC_URL: PUBLIC_PATH
      })
    }),
    new webpack.DllReferencePlugin({
      name: 'lib_dll',
      manifest: require(`${BUILD_OUTPUT_DIR}/lib/dll-manifest.json`)
    }),
    new ExtractCssChunks({
      filename: devMode ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: devMode ? '[name].css' : '[name].[contenthash].css',
      hot: devMode
    })
  ],
}

module.exports = baseConfig
