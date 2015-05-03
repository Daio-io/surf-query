'use strict';

var surfifyRoutes = require('../surfify/surfify.router');
var statusRoutes = require('../status/status.router');

module.exports = function (app) {

    app.use(surfifyRoutes.routes());
    app.use(statusRoutes.routes());

};

