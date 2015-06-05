(function() {
  'use strict';

  exports.init = function(params) {
    var service = params['service'];
    var shell = require('shelljs');
    var path = require('path');

    if (!service) {
      throw new Error('missing required parameter "service"');
    }
    createUser();
    enableLogging();
    writeUpstart();
    enableDaemon();

    function createUser() {
      console.log('creating user ' + service);
    }

    function writeUpstart() {
      console.log('writing upstart');
    }

    function enableLogging() {
      var logPath = path.join(process.env.npm_config_quichean_logging_path, service);
      console.log('log path: ' + logPath);
    }

    function enableDaemon() {
      console.log('enabling daemon');
    }
  };
})();
