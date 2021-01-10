'use strict';

const MSWClient = require('msw-client');

module.exports = {
    create: function (spotId) {
        return new MSWClient({
            apikey: process.env.MSW_KEY,
            spot_id: spotId,
            units: 'uk'
        });
    }
};