'use strict';

exports.cache = function *(next) {
    this.set('Cache-Control', 'maxage=10800');
    yield next;
};