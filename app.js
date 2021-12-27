const express = require('express');
const {createServer} = require('http');

const port = process.env.PORT || '3443';

const expressApp = express()
const httpApp = createServer(expressApp);

require('./server/routes')(expressApp)
require('./server/main.js')(httpApp)

httpApp.listen(port, '0.0.0.0')