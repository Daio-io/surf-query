var surfifyHandlers = require('./surfify.handlers');
var auth = require('../auth/auth.middleware');
var router = require('koa-router')();

router.get('/', auth.verifyApiKey, surfifyHandlers.getSurfForecast);

module.exports = router;