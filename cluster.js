'use strict';

let cluster = require('cluster');

function startWorker() {
  let worker = cluster.fork();
  console.log('Cluster: worker %d started', worker.id);
}

if (cluster.isMaster) {

  require('os').cpus().forEach(function () {
    startWorker();
  });

  cluster.on('disconnect', function (worker) {
    console.log('worker %d disconnected from the cluster. ', worker.id);

  });

  cluster.on('exit', function (worker, code, signal) {
    console.log('worker %d died with code: %d (%s)', worker.id, code, signal);
    startWorker();
  });
}
// If the cluster is not the master cluster get it to just start the server
else {
  require('./index.js');
}