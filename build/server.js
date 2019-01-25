const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const env = process.env.NODE_ENV
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config.dev.js')
const app = express()
const DIST_DIR = webpackConfig.output.path
const PORT = 8899

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

if (env === 'production') {
  app.use(express.static('build'))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
  })
} else {
  const compiler = webpack(webpackConfig)

  const options = {
    disableHostCheck: true,
    contentBase: './dist',
    watchContentBase: true,
    publicPath: webpackConfig.output.publicPath,
    compress: true,
    hot: true,
    host: '0.0.0.0',
    overlay: {
      warnings: true,
      errors: true
    },
    historyApiFallback: true,
    stats: {
      all: false,
      assets: true,
      builtAt: true,
      colors: true,
      performance: true,
      modules: true,
      maxModules: 0,
      errors: true,
      warnings: true,
      moduleTrace: true,
      errorDetails: true,
      timings: true,
      hash: true
    }
  }

  app.use(express.static('dll'))
  app.use(webpackDevMiddleware(compiler, options))
  app.use(webpackHotMiddleware(compiler))

  app.get('/lib/:name', (req, res, next) => {
    let options = {
      root: path.resolve(__dirname, '../dist/lib'),
      dotfiles: 'deny'
    }

    res.sendFile(req.params.name, options, err => {
      if (err) {
        next(err)
      }
    })
  })

  app.get('*', (req, res, next) => {
    const filename = path.join(DIST_DIR, 'index.html')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })

}

app.listen(PORT, () => {
  console.dir(`http://localhost:${PORT}`)
})
