const fs = require('fs');
const http = require('http');
const path = require('path');
const gzipStatic = require('connect-gzip-static');

exports = module.exports = function (app) {
  const staticPath = `${process.cwd()}/dist`;

  app.use('/', gzipStatic(staticPath));
  app.use('/*', gzipStatic(staticPath));
}