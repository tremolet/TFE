'use strict';

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
      controller: indexController
    })
    
    .when('/users', {
      templateUrl: 'static/partials/users.html',
      controller: formUserController
    })
    .when('/logs', {
      templateUrl: 'static/partials/logs.html',
      controller: IndexController
    })
    .when('/activities', {
      templateUrl: 'static/partials/activities.html',
      controller: sendUser
    })
   
    })
    .when('/post/:postId', {
      templateUrl: '/static/partials/post-detail.html',
      controller: PostDetailController
    })
    /* Create a "/blog" route that takes the user to the same place as "/post" */
    .when('/blog', {
      templateUrl: 'static/partials/post-list.html',
      controller: PostListController
    })
    .otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
  }]);
