const express = require('express')
const path = require('path')
const fs = require('fs')
const http = require('http')
const https = require('https')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.engine('.html', require('ejs').renderFile)

app.use(express.static(path.join(__dirname, 'public')))

/**
* Get port from environment and store in Express.
*/
app.set('port', process.env.PORT || '3443')

require('./routes')(app)

// Yes, SSL is required
var credentials = {
  key:        fs.readFileSync('server.key'),
  cert:       fs.readFileSync('server.crt'),
  passphrase: 'ChickenNumber1',
}

var httpServer = express()
httpServer.get('/*', function (req, res) {
  res.redirect('https://' + req.hostname + ':' + app.get('port') + req.url)
})
httpServer.listen(3000)

var httpsServer = https.createServer(credentials, app)

/**
* Listen on provided port, on all network interfaces.
*/
httpsServer.listen(app.get('port'), function () {
  console.log('Express running. Visit https://localhost:' + app.get('port') +
  ' in Firefox/Chrome (note the HTTPS; there is no HTTP -> HTTPS redirect!)')
})

require('./server/main.js')(httpsServer)