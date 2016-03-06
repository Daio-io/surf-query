'use strict';

const koa = require('koa');
const settings = require('./api/conf/app.settings');

const app = koa();
const http = require('http');

require('./api/conf/app.bootstrap')(app);
require('./api/conf/app.routes')(app);

const server = http.createServer(app.callback());

function startServer() {
  
  server.listen(settings.port, () => {

    console.log('Surf-Query Server started on port:', settings.port);

  });
  
}

if (require.main === module) {
  startServer();
} else {
  module.exports = startServer();
}
