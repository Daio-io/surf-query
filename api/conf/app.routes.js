'use strict';

var surfifyRoutes = require('../surfify/surfify.router');

module.exports = function (app) {

    app.use(surfifyRoutes.routes());

};

