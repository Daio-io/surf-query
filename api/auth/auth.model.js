'use strict';

var mongoose = require('mongoose');

var authSchema = mongoose.Schema({

    apikey: { type: String }
    
});

var AuthModel = mongoose.model('AuthModel', authSchema);

module.exports = AuthModel;