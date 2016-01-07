'use strict';

const surfifyHandlers = require('./surfify.handlers');
const auth = require('../middleware/auth.middleware');
const param = require('../middleware/params.middleware');
const router = require('koa-router')();

router.get('/', auth.verifyApiKey, param.validateParams, surfifyHandlers.getSurfForecast);

module.exports = router;