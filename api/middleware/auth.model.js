'use strict';

const mongoose = require('mongoose');

const authSchema = mongoose.Schema({

    apikey: { type: String }
    
});

const AuthModel = mongoose.model('AuthModel', authSchema);

module.exports = AuthModel;