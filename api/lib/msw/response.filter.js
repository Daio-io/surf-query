'use strict';

const moment = require('moment');
const tooly = require('tooly');

class ResponseFilter {

    constructor(_data) {
        this.data = _data;
    }

    filterStartTime(startTime) {
        if (tooly.existy(startTime)) {
            this.data = this.data.filter(item => {

                let time = moment.unix(item.timestamp).utcOffset(60);
                let timey = parseInt(time.format('H'));
                return timey >= startTime;
            });
        }
        return this;
    }

    filterEndTime(endTime) {
        if (tooly.existy(endTime)) {
            this.data = this.data.filter(item => {
                let time = moment.unix(item.timestamp).utcOffset(60);
                let timey = parseInt(time.format('H'));
                return timey <= endTime;
            });
        }
        return this;
    }

    filterMaxWind(maxWind) {
        if (tooly.existy(maxWind)) {
            this.data = this.data.filter(item => {
                return item.weather.wind <= maxWind;
            });
        }
        return this;
    }

    filterMaxSwell(maxSwell) {
        if (tooly.existy(maxSwell)) {
            this.data = this.data.filter(item => {
                return item.swell.maxSwell <= maxSwell;
            });
        }
        return this;
    }

    filterMinSwell(minSwell) {
        if (tooly.existy(minSwell)) {
            this.data = this.data.filter(item => {
                return item.swell.minSwell <= minSwell;
            });
        }
        return this;
    }

    results() {
        return this.data.filter(tooly.existy);
    }

}

module.exports = ResponseFilter;