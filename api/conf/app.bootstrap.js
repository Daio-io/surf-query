'use strict';
const dbSetup = require('./db/db.setup');

module.exports = function (app) {

    dbSetup();

};