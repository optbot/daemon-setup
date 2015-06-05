(function() {
  'use strict';

  exports.init = function(params) {
    var fs = require('fs');
    var path = require('path');
    var shell = require('shelljs');
    var user = params['user'];
    var service = params['service'];
    var command = params['command'] || 'node';

    requireParams('service', 'user');
    createUser();
    enableLogging();
    writeUpstart();
    enableDaemon();

    function createUser() {
      console.log('creating user ' + service);
    }

    function writeUpstart() {
      var format = require('string-template');
      var srcFile = path.join(__dirname, 'template.upstart');
      var _params = {
        command: command,
        service: service,
        user: user
      };
      var content;

      fs.readFile(srcFile, 'utf8', function(err, data) {
        if (err) {
          throw new Error(err);
        }
        console.log(data);
        content = format(data, _params);
        console.log(content);
      });
      console.log(content);
    }

    function enableLogging() {
      var logPath = path.join(process.env.npm_config_quichean_logging_path, service);
      console.log('log path: ' + logPath);
    }

    function enableDaemon() {
      console.log('enabling daemon');
    }
  
    function requireParams() {
      for (var i = 0; i < arguments.length; i++) {
        if (!params[arguments[i]]) {
          throw new Error('missing required parameter "' + arguments[i] + '"');
        }
      }
    }
  };
})();
