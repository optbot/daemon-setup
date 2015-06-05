(function() {
  'use strict';

  exports.init = function(params) {
    var service = params['service'];

    if (!service) {
      throw new Error('missing required parameter "service"');
    }
    console.log('service is ' + service);
  };
})();
