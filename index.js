'use strict';

const koa = require('koa');
const settings = require('./api/conf/app.settings');

let app = koa();
let http = require('http');

require('./api/conf/app.bootstrap')(app);
require('./api/conf/app.routes')(app);

let server = http.createServer(app.callback());

function startServer() {
  
  server.listen(settings.port, function() {

    console.log('Surfify Server started on port:', settings.port);

  });
  
}


if (require.main === module) {
  startServer();
} else {
  module.exports = startServer();
}
