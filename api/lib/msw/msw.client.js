'use strict';

const MSWClient = require('msw-client');

let mswClient = new MSWClient({
   
    apikey: process.env.MSW_KEY,
    spot_id: 0,
    units: 'uk'
    
});

module.exports = mswClient;