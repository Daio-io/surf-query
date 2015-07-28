'use strict';

const surfifyHandlers = require('./surfify.handlers');
const auth = require('../auth/auth.middleware');
const router = require('koa-router')();

router.get('/', auth.verifyApiKey, surfifyHandlers.getSurfForecast);

module.exports = router;