'use strict';

exports.getSurfForecast = function *() {

    let queries = this.request.query;

    let spotId = queries.spotid;
    let start = queries.start;
    let end = queries.end;
    let maxWind = queries.maxwind;
    let minSwell = queries.minswell;
    
    this.body = {
        
        // Placeholder to test out query
        response: 'placeholder response',
        spotid: spotId,
        start: start,
        end: end,
        maxwind: maxWind,
        minswell: minSwell
        
    }

};
