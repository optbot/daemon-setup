(function() {
  'use strict';

  exports.init = function(params) {
    var fs = require('fs');
    var path = require('path');
    var shell = require('shelljs');
    var user = params.user;
    var service = params.service;
    var command = params.command || 'node';

    requireParams('service', 'user', 'pathToFiles');
    createUser();
    enableLogging();
    enableDaemon();
    createUpstart();

    function createUser() {
      console.log('creating user "' + user + '"');
      shell.exec(path.join(__dirname, 'createuser.sh') + ' ' + user +
        ' "--shell /bin/bash"');
    }

    function createUpstart() {
      var upstart = true;
      if ('upstart' in params) {
        upstart = params.upstart;
      }
      if (!upstart) {
        console.log('service will not start on system reboot');
        return;
      }
      var format = require('string-template');
      var srcFile = path.join(__dirname, 'template.upstart');
      var _params = {
        command: command,
        service: service,
        user: user
      };
      console.log('generating upstart content');
      fs.readFile(srcFile, 'utf8', function(err, data) {
        if (err) {
          throw new Error(err);
        }
        var content = format(data, _params);
        writeUpstart(content);
      });
    }

    function writeUpstart(content) {
      var filename = path.join('/etc/init', 'optbot-' + user + '.conf');
      console.log('writing upstart');
      fs.writeFile(filename, content, function(err) {
        if (err) {
          throw err;
        }
        console.log('upstart file ' + filename + ' written');
      });
    }

    function enableLogging() {
      var logPath = path.join(process.env.npm_config_quichean_logging_path,
          user);
      shell.mkdir('-p', logPath);
      shell.exec('chown ' + user + ':' + user + ' ' + logPath);
      console.log('created log directory ' + logPath);
    }

    function enableDaemon() {
      var toCopy = path.join(params.pathToFiles, '*');
      var serviceRoot = path.join('/usr/local/lib/quichean', user);
      console.log('enabling daemon');
      shell.rm('-rf', path.join(serviceRoot, '*'));
      shell.mkdir('-p', serviceRoot);
      shell.cp('-Rf', toCopy, serviceRoot);
      shell.exec('chown -R ' + user + ':' + user + ' ' +
          path.join(serviceRoot, '*'));
      console.log('service files copied');
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
