(function() {
  'use strict';

  exports.init = function(params) {
    var fs = require('fs');
    var path = require('path');
    var service = params['service'];
    var shell = require('shelljs');

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
      var format = require('string-template');
      var srcFile = path.join(__dirname, 'template.upstart');
      var _params = {
        command: '/usr/bin/python',
        service: 'foo.py',
        user: 'foo'
      };
      var template;
      var content;

      fs.readFile(srcFile, 'utf8', function(err, data) {
        if (err) {
          throw new Error(err);
        }
        template = data;
      });
      content = format(template, _params);
      console.log(content);
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
