var surfifyHandlers = require('./surfify.handlers');
var router = require('koa-router')();

router.get('/', surfifyHandlers.getSurfForecast);

module.exports = router;