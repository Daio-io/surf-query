'use strict';

const AuthModel = require('./auth.model');

exports.verifyApiKey = function*(next) {
    
    let queryApikey = this.request.query.apikey;

    let response = yield AuthModel.find({ apikey: queryApikey }).exec();

    // Should return a response if the api key exists
    if (response[0]) {
        yield next;
    }
    else {
        yield this.body = {error: 'Invalid or no apikey'};
    }

};