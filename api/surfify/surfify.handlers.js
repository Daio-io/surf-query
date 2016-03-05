'use strict';

exports.getSurfForecast = function *() {

    let query = _buildQueryData(this.request.query);

    let surfData = yield this.surfService.makeRequest(query.spotId);

    let responseFilter = new this.ResponseFilter(surfData.response);

    surfData.response = responseFilter.filterStartTime(query.start)
        .filterEndTime(query.end)
        .filterMaxSwell(query.maxSwell)
        .filterMinSwell(query.minSwell)
        .filterMaxWind(query.maxWind)
        .results();

    this.body = surfData;

};

exports.nextSurf = function *() {

    let query = _buildQueryData(this.request.query);

    let surfData = yield this.surfService.makeRequest(query.spotId);

    let responseFilter = new this.ResponseFilter(surfData.response);

    surfData.response = responseFilter.filterStartTime(query.start)
        .filterEndTime(query.end)
        .filterMaxSwell(query.maxSwell)
        .filterMinSwell(query.minSwell)
        .filterMaxWind(query.maxWind)
        .results().splice(0, 1);

    this.body = surfData;

};

function _buildQueryData(query) {

  return {

    spotId: parseInt(query.spotid, 10),
    start: parseInt(query.start, 10) || null,
    end: parseInt(query.end, 10) || null,
    maxWind: parseInt(query.maxwind, 10) || null,
    minSwell: parseInt(query.minswell, 10) || null,
    maxSwell: parseInt(query.maxswell, 0) || null

  }

}
