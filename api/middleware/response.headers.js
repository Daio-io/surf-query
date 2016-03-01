'use strict';

exports.cache = function *(next) {
    this.set('Cache-Control', 'max-age=10800');
    yield next;
};