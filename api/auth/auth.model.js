'use strict';

const mongoose = require('mongoose');

let authSchema = mongoose.Schema({

    apikey: { type: String }
    
});

let AuthModel = mongoose.model('AuthModel', authSchema);

module.exports = AuthModel;