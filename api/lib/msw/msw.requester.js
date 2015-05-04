'use strict';

var MswClient = require('./msw.client');

// TODO: logic to only include data specified in the notification poll
exports.makeRequest = function(_spotId) {

    MswClient.setSpotId(_spotId);

    return MswClient.exec()

        .then(_buildResponse)

        .catch(function(err) {

            return err;

        });

};

/**
 * 
 * @param _data
 * @returns {*}
 * @private
 */
function _buildResponse(_data) {

    // Map response data to only take important data for Surfify
    let response = _data.map(function (item) {

        return {

            timestamp: item.timestamp,
            wind: item.wind.speed,
            weather: item.condition.weather + item.condition.unit,
            minSwell: item.swell.minBreakingHeight,
            maxSwell: item.swell.maxBreakingHeight,
            solidStar: item.solidRating,
            fadedStar: item.fadedRating

        }

    });

    return response;

}