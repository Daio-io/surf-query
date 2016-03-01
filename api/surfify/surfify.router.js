'use strict';

const surfifyHandlers = require('./surfify.handlers');
const auth = require('../middleware/auth.middleware');
const param = require('../middleware/params.middleware');
const headers = require('../middleware/response.headers');
const router = require('koa-router')();

router.get('/', auth.verifyApiKey, param.validateParams, headers.cache, surfifyHandlers.getSurfForecast);

router.get('/next', auth.verifyApiKey, param.validateParams, headers.cache, surfifyHandlers.nextSurf);

module.exports = router;