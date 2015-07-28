'use strict';

const surfifyRoutes = require('../surfify/surfify.router');
const statusRoutes = require('../status/status.router');

module.exports = function (app) {

    app.use(surfifyRoutes.routes());
    app.use(statusRoutes.routes());

};

