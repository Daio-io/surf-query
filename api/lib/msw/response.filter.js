'use strict';

const moment = require('moment');
const tooly = require('tooly');

Array.prototype.filterUntil = function (predicate) {

    let shouldStop = false;

    return this.filter(function filter(value, index) {
        if (shouldStop) {
            return true
        }

        shouldStop = predicate(value)
        return shouldStop
    });
}

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

    filterFromTime(fromTimeStamp) {
        if (tooly.existy(fromTimeStamp)) {
            this.data = this.data.filterUntil(item => {
                let time = moment.unix(item.timestamp).utcOffset(60);
                let from = moment.unix(fromTimeStamp).utcOffset(60);

                return time >= from
            })
        }

        return this
    }

    filterDayOfTimestamp(timestampDay) {
        if (tooly.existy(timestampDay)) {

            this.data = this.data.filter(item => {
                let day = moment.unix(timestampDay).utcOffset(60);
                let time = moment.unix(item.timestamp).utcOffset(60);

                return time.isSame(day, "day")
            })
        }

        return this
    }

    filterToTime(toTimeStamp) {
        if (tooly.existy(toTimeStamp)) {
            console.log(toTimeStamp)
            this.data = this.data.filter(item => {
                let time = moment.unix(item.timestamp).utcOffset(60);
                let to = moment.unix(toTimeStamp).utcOffset(60);

                return to >= time
            })
        }

        return this
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