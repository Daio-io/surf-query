'use strict';

var mongoose = require('mongoose');
var config = require('./db.config');

module.exports = function () {

    switch (process.env.NODE_ENV) {
        case 'production':

            mongoose.connect(config.prod.connectionString, config.prod.options);
            break;

        default:

            mongoose.connect(config.dev.connectionString, config.dev.options);
            break;

    }

};