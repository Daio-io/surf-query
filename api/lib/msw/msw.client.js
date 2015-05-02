'use strict';

var MSWClient = require('msw-client');

var mswClient = new MSWClient({
   
    apikey: process.env.MSW_KEY,
    spot_id: 0
    
});

module.exports = mswClient;