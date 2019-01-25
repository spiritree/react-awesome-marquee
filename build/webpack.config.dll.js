const path = require('path')
const webpack = require('webpack')
const OUTPUT_PATH = path.resolve('dist/lib')

module.exports = {
  devtool: 'source-map',
  entry: {
    dll: ['react', 'react-dom']
  },
  output: {
    path: OUTPUT_PATH,
    hashDigestLength: 8,
    filename: '[name]-[hash].js',
    library: 'lib_[name]',
    libraryTarget: 'var'
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DllPlugin({
      path: path.resolve(OUTPUT_PATH, '[name]-manifest.json'),
      name: '[name]-[hash]'
    })
  ]
}
