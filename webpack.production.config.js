const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const PUBLIC_PATH = '/'

module.exports = {
  mode: 'production',
  entry: ['babel-polyfill', path.resolve(__dirname, 'examples', 'index')],
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: PUBLIC_PATH,
    filename: 'dist/[name].[hash:8].js',
    chunkFilename: 'dist/[name].[hash:8].chunk.js'
  },
  context: __dirname,
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: path.resolve(__dirname, 'examples'),
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[local]_[hash:base64:8]'
              }
            },
            'postcss-loader'
          ]
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[local]_[hash:base64:8]'
              }
            },
            'postcss-loader',
            'less-loader'
          ]
        }),
        include: path.resolve(__dirname, 'examples')
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'less-loader']
        }),
        include: path.resolve(__dirname, 'node_modules')
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[local]_[hash:base64:8]'
              }
            },
            'postcss-loader',
            'sass-loader'
          ]
        })
      },
      {
        test: /\.(eot|woff|svg|ttf|woff2|appcache|mp3|mp4|pdf)(\?|$)/,
        include: path.resolve(__dirname, 'examples'),
        use: ['file-loader?name=dist/assets/[name].[ext]']
      },
      {
        test: /\.(png|jpg|gif)$/,
        include: path.resolve(__dirname, 'examples'),
        use: ['url-loader?limit=8192&name=dist/assets/[name].[ext]']
      },
    ]
  },
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          drop_console: true
        }
      }
    }),
    new ExtractTextPlugin({
      filename: 'dist/[name].[hash:8].css',
      allChunks: true 
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.ejs',
      templateParameters: {
        dll: ''
      },
      hash: false,
      inject: true
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.css', '.scss']
  }
}
