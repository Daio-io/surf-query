'use strict';

const surfifyHandlers = require('./surfify.handlers');
const auth = require('../middleware/auth.middleware');
const param = require('../middleware/params.middleware');
const headers = require('../middleware/response.headers');
const router = require('koa-router')();

router.get('/', param.validateParams, auth.verifyApiKey, surfifyHandlers.getSurfForecast);

router.get('/next', param.validateParams, auth.verifyApiKey, surfifyHandlers.nextSurf);

module.exports = router;