'use strict';

var koa = require('koa');
var app = koa();
var settings = require('./api/conf/app.settings');
var http = require('http');

require('./api/conf/app.bootstrap')(app);
require('./api/conf/app.routes')(app);

var server = http.createServer(app.callback());

server.listen(settings.port, function() {
    
   console.log('Surfify Server started on port:', settings.port);
    
});