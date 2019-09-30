const express = require('express')
const path = require('path')
const fs = require('fs')
const https = require('https')
const gzipStatic = require('connect-gzip-static')

var app = express()

// view engine setup

const staticPath = path.join(__dirname, './dist')
app.use('/', gzipStatic(staticPath))
app.use('/*', gzipStatic(staticPath))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// Yes, SSL is required
var credentials = {
  key:  fs.readFileSync(path.resolve(__dirname, 'privkey.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem')),
}

var httpServer = express()
httpServer.get('/*', function (req, res) {
  res.redirect('https://' + req.hostname + ':7663' + req.url)
})
httpServer.listen(7664)

var httpsServer = https.createServer(credentials, app)

/**
* Listen on provided port, on all network interfaces.
*/
httpsServer.listen('7663', '0.0.0.0', function () {
  console.log('Express running. Visit https://::7664')
})

require('./server/main.js')(httpsServer)