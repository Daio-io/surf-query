'use strict';
var dbSetup = require('./db/db.setup');

module.exports = function (app) {

    dbSetup();

};