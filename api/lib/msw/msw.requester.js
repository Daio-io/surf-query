'use strict';

var MswClient = require('./msw.client');
var moment = require('moment');

// TODO: refactor into cleaner solution - deploying to test from app
// Params for time and other scenarios around swell max and min
exports.makeRequest = function (_spotId, _maxWind, _minSwell) {

    MswClient.setSpotId(_spotId);

    return MswClient.exec()

        .then(function (data) {

            return _buildResponse(data, _maxWind, _minSwell);

        })

        .catch(function (err) {

            return err;

        });

};

/**
 *
 * @param _data
 * @returns {*}
 * @private
 */
function _buildResponse(_data, _wind, _minSwell) {

    // Map response data to only take important data for Surfify
    let response = _data.map(function (item) {

        if (item.wind.speed < _wind && 
            item.swell.minBreakingHeight > _minSwell) {

            return {

                timestamp: item.timestamp,
                date: moment.unix(item.timestamp).format('MMMM Do YYYY'),
                time: moment.unix(item.timestamp).format('H:MM'),
                wind: item.wind.speed,
                weather: item.condition.weather + item.condition.unit,
                minSwell: item.swell.minBreakingHeight,
                maxSwell: item.swell.maxBreakingHeight,
                solidStar: item.solidRating,
                fadedStar: item.fadedRating

            }

        }
        else return null;

    });

    return response.filter(_filterEmptyValues);

}

/**
 * *
 * @param item
 * @returns {boolean}
 * @private
 */
function _filterEmptyValues(item) {
    
    return item !== null;
    
}