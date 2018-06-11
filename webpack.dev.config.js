const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HappyPack = require('happypack')

const PUBLIC_PATH = '/'
module.exports = {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?reload=true&path=/__webpack_hmr',
    './examples/index.js',
    './dll/vendor.dll.js'
  ],
  output: {
    path: '/',
    publicPath: PUBLIC_PATH,
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  context: __dirname,
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: ['happypack/loader'],
        include: [
          path.resolve(__dirname, 'examples'),
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'lib')
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]_[hash:base64:5]'
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)(\?|$)/,
        include: path.resolve(__dirname, 'examples'),
        use: ['url-loader?limit=8192&name=assets/[name].[ext]']
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        PUBLIC_URL: PUBLIC_PATH
      })
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./dll/vendor-manifest.json')
    }),
    new HappyPack({
      loaders: ['babel-loader']
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.ejs', 
      inject: true,
      templateParameters: {
        dll: "<script src='/vendor.dll.js'></script>",
        manifest: ''
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.css', '.scss']
  }
}
