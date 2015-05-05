'use strict';

var mswRequest = require('../lib/msw/msw.requester');

exports.getSurfForecast = function *() {

    let queries = this.request.query;

    let spotId = parseInt(queries.spotid);
    let maxWind = queries.maxwind || 0;
    let minSwell = queries.minswell || 0;

    this.body = yield mswRequest.makeRequest(spotId, maxWind, minSwell);

};
