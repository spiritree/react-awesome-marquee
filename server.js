const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const env = process.env.NODE_ENV
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.dev.config.js')
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
  app.use(express.static('dll'))
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      quiet: true, 
      stats: {
        colors: true,
        timings: true
      }
    })
  )
  app.use(webpackHotMiddleware(compiler))
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
