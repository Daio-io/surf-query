'use strict';

const NodeCache = require('node-cache');
const THREE_HOURS_IN_SECONDS = 10800;

const moment = require('moment');
const tooly = require('tooly');

const mswCache = new NodeCache();
const MswClient = require('./msw.client');

exports.makeRequest = function(spotId) {

  let cached = mswCache.get(spotId);
  let res = {status: 'success', message: 'Request successful'};

  if (tooly.existy(cached)) {

    return new Promise(resolve => {
      res.response = _buildResponse(cached);
      resolve(res)
    });

  } else {

    MswClient.setSpotId(spotId);

    return MswClient.request()
      .then(data => {
        mswCache.set(spotId, data, THREE_HOURS_IN_SECONDS);
        res.response = _buildResponse(data);
        return res;
      })
      .catch(err => {
        res.status = 'failed';
        res.response = [];
        res.message = `Request failed with error: ${err.message}`;
        return res;
      });
  }
};


function _buildResponse(_data) {

  return _data.map(function(item) {

      let time = moment.unix(item.timestamp).utcOffset(60);

      return {
        timestamp: item.timestamp,
        date: time.format('MMMM Do YYYY'),
        time: time.format('H:MMa'),
        solidStar: item.solidRating,
        fadedStar: item.fadedRating,
        weather: {
            wind: item.wind.speed,
            temperature: item.condition.temperature
        },
        swell: {
            minSwell: item.swell.minBreakingHeight,
            maxSwell: item.swell.maxBreakingHeight
        }

      }
  })
}