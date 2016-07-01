'use strict';

/* Services */
angular.module('Services', ['ngResource'])
  .factory('Logs', function($resource) {
    return $resource('/logs/', {}, {
      query: {
        method: 'GET',
        params: {},
        isArray: true
      }
    });
  })
  .factory('Activities', function($resource) {
    return $resource('/activities/', {}, {
      query: {
        method: 'GET',
        params: {},
        isArray: true
      }
    });
  })
  .factory('Requests', function($resource) {
    return $resource('/requests/', {}, {
      query: {
        method: 'GET',
        params: {},
        isArray: true
      }
    });
  })
  .factory('Users', function($resource) {
    return $resource('/users/', {}, {
      query: {
        method: 'GET',
        params: {},
        isArray: true
      }
    });
  })
;

