'use strict';
//define the controllers and the pages linked with each other. Define also the different accessible functions (directives,etc..) by each page
angular.module('WebAppStat',
               ['ngRoute',
                'Directives',
                'Controllers',
                'Services',
                'Filters'
               ])
  .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'static/partials/landing.html',
      controller: IndexController
    })
    .when('/showActivities', {
      templateUrl: 'static/partials/activities.html',
      controller: ActivitiesController
    })
    .when('/showLogs', {
      templateUrl: 'static/partials/logins.html',
      controller: LoginsController
    })
	.when('/showRequests', {
      templateUrl: 'static/partials/requests.html',
      controller: RequestController
    })
    .otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
  }]);
