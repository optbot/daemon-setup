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
    writeUpstart();

    function createUser() {
      console.log('creating user ' + service);
    }

    function writeUpstart() {
      console.log('writing upstart');
    }
  };
})();
