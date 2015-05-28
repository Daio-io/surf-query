'use strict';

var MswClient = require('./msw.client');
var moment = require('moment');

exports.makeRequest = function (_spotId, _maxWind, _minSwell, start, end) {

    MswClient.setSpotId(_spotId);

    return MswClient.exec()

        .then(function (data) {

            if(isNaN(start) || isNaN(end)) {

                return _buildResponse(data, _maxWind, _minSwell, 0, 24);

            } else {

                return _buildResponse(data, _maxWind, _minSwell, start, end);

            }

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
function _buildResponse(_data, _wind, _minSwell, start, end) {

    // Map response data to only take important data for Surfify
    let response = _data.map(function (item) {

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
                weather: item.condition.weather + item.condition.unit,
                minSwell: item.swell.minBreakingHeight,
                maxSwell: item.swell.maxBreakingHeight,
                solidStar: item.solidRating,
                fadedStar: item.fadedRating

            }

        }
        else return null;

    });

    return response.filter(_filterEmptyValues)
        .splice(0, 5);

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