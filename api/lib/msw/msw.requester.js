'use strict';

const NodeCache = require('node-cache');
const THREE_HOURS_IN_SECONDS = 10800;

const moment = require('moment');
const tooly = require('tooly');

const mswCache = new NodeCache();
const MswClient = require('./msw.client');

exports.makeRequest = function(query, amount) {

  let cached = mswCache.get(query.spotId);
  let res = {status: 'success', message: 'Request successful'};

  if (tooly.existy(cached)) {

    return new Promise(function(resolve) {
      let data = _processRequest(cached, query);
      res.response = tooly.existy(amount) ? data.splice(0, amount) : data;
      resolve(res)
    });

  } else {

    MswClient.setSpotId(query.spotId);

    return MswClient.exec()
      .then(function(data) {
        mswCache.set(query.spotId, data, THREE_HOURS_IN_SECONDS);
        let results = _processRequest(data, query);
        res.response = tooly.existy(amount) ? results.splice(0, amount) : results;
        return res;
      })
      .catch(function(err) {
        res.status = 'failed';
        res.response = [];
        res.message = `Request failed with error: ${err.message}`;
        return res;
      });
  }
};

function _processRequest(data, query) {

  if (isNaN(query.start) || isNaN(query.end)) {

    return _buildResponse(data, 
      query.maxWind, 
      query.minSwell, 
      query.maxSwell, 0, 24);

  } else {

    return _buildResponse(data, 
      query.maxWind, 
      query.minSwell, 
      query.maxSwell, query.start, query.end);

  }

}

/**
 * 
 * @param _data
 * @param _wind
 * @param _minSwell
 * @param _maxSwell
 * @param start
 * @param end
 * @returns {*}
 * @private
 */
function _buildResponse(_data, _maxWind, _minSwell, _maxSwell, start, end) {

  // Map response data to only take important data for Surfify
  let response = _data.map(function(item) {

    // Set offset to UK
    let time = moment.unix(item.timestamp).utcOffset(60);
    let timey = parseInt(time.format('H'));
    
    if (item.wind.speed <= _maxWind &&
      item.swell.minBreakingHeight >= _minSwell &&
      item.swell.maxBreakingHeight <= _maxSwell &&
      timey >= start &&
      timey <= end) {

      return {

        timestamp: item.timestamp,
        date: time.format('MMMM Do YYYY'),
        time: time.format('H:MMa'),
        wind: item.wind.speed,
        minSwell: item.swell.minBreakingHeight,
        maxSwell: item.swell.maxBreakingHeight,
        solidStar: item.solidRating,
        fadedStar: item.fadedRating

      }

    }
    else return null;

  });

  // Filter out all values that are null and undefined
  return response.filter(tooly.existy);

}