'use strict';

const NodeCache = require('node-cache');
const THREE_HOURS_SECONDS = 10800;

const moment = require('moment');
const tooly = require('tooly');

var mswCache = new NodeCache();
var MswClient = require('./msw.client');

exports.makeRequest = function(_spotId, _maxWind, _minSwell, start, end) {

  let cached = mswCache.get(_spotId);

  if (tooly.existy(cached)) {

    console.log('using cache for spot:', _spotId);

    return new Promise(function(resolve) {

      resolve(_processRequest(cached, _maxWind, _minSwell, start, end))

    });

  } else {

    MswClient.setSpotId(_spotId);

    return MswClient.exec()

      .then(function(data) {

        mswCache.set(_spotId, data, THREE_HOURS_SECONDS);

        return _processRequest(data, _maxWind, _minSwell, start, end)

      })

      .catch(function(err) {

        return err;

      });
  }

};

function _processRequest(data, _maxWind, _minSwell, start, end) {

  if (isNaN(start) || isNaN(end)) {

    return _buildResponse(data, _maxWind, _minSwell, 0, 24);

  } else {

    return _buildResponse(data, _maxWind, _minSwell, start, end);

  }

}

/**
 *
 * @param _data
 * @param _wind
 * @param _minSwell
 * @param start
 * @param end
 * @returns {*}
 * @private
 */
function _buildResponse(_data, _wind, _minSwell, start, end) {

  // Map response data to only take important data for Surfify
  let response = _data.map(function(item) {

    let time = moment.unix(item.timestamp).format('H');
    let timey = parseInt(time);

    if (item.wind.speed < _wind &&
      item.swell.minBreakingHeight > _minSwell &&
      timey >= start &&
      timey <= end) {

      return {

        timestamp: item.timestamp,
        date: moment.unix(item.timestamp).format('MMMM Do YYYY'),
        time: moment.unix(item.timestamp).format('H:MM'),
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