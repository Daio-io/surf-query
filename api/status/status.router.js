'use strict'
const router = require('koa-router')();
const statusHandlers = require('./status.handlers');

router.get('/status', statusHandlers.getStatus);

module.exports = router;