'use strict';

/* Filters */
angular.module('Filters', [])
  .filter('uppercase', function() {
    return function(input) {
      return input.toUpperCase();
    }
  });
