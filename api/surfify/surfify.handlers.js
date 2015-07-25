'use strict';

var mswRequest = require('../lib/msw/msw.requester');

exports.getSurfForecast = function *() {

  let queries = this.request.query;

  let data = _buildQueryData(queries);
  
  this.body = yield mswRequest.makeRequest(data);

};

function _buildQueryData(query) {

  return {

    spotId: parseInt(query.spotid),
    start: parseInt(query.start),
    end: parseInt(query.end),
    maxWind: query.maxwind || 50,
    minSwell: query.minswell || 0,
    maxSwell: query.maxswell || 50

  }

}
