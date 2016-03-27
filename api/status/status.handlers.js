'use strict';

exports.getStatus = function *() {
  this.set("Cache-Control", "no-cache, no-store, must-revalidate");
  this.set("Pragma", "no-cache");
  this.set("Expires", "0");
  this.body= {status: 'OK'};
};