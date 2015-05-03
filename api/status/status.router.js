'use strict'
var router = require('koa-router')();
var statusHandlers = require('./status.handlers');

router.get('/status', statusHandlers.getStatus);

module.exports = router;