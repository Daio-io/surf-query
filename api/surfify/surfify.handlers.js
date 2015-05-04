'use strict';

var mswRequest = require('../lib/msw/msw.requester');

exports.getSurfForecast = function *() {

    let queries = this.request.query;

    let spotId = parseInt(queries.spotid);
    let start = queries.start;
    let end = queries.end;
    let maxWind = queries.maxwind;
    let minSwell = queries.minswell;

    this.body = yield mswRequest.makeRequest(spotId);

};
