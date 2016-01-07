'use strict';

const tooly = require('tooly');

exports.validateParams = function*(next) {

  let spotId = this.request.query.spotid;

  if (tooly.existy(spotId)) {
    yield next;
  } else {
    this.body = {status: 'failed', message: 'You must provide a spotid in your query'};
  }

};