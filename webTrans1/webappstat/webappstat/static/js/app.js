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
      controller: IndexController
    })
    .when('/about', {
      templateUrl: 'static/partials/about.html',
      controller: AboutController
    })
    .when('/users', {
      templateUrl: 'static/partials/users.html',
      controller: userController
    })
    .when('/post', {
      templateUrl: 'static/partials/post-list.html',
      controller: PostListController
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
