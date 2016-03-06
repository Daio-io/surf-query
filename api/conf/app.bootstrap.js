'use strict';
const dbSetup = require('./db/db.setup');

module.exports = function (app) {

    dbSetup();

    app.context.ResponseFilter = require('../lib/msw/response.filter');
    app.context.surfService = require('../lib/msw/surf.requester');

};