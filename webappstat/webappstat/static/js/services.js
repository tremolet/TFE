'use strict';

angular.module('angularFlaskServices', ['ngResource'])
	.factory('Logs', function($resource) {
		return $resource('/logs/', {}, {
			query: {
				method: 'GET',
				params: {},
				isArray: true
			}
		});
	})
;

