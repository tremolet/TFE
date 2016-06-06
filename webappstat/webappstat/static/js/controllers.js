'use strict';

angular.module('Controllers', [])
//  .controller("myController", mycontroller);

/* Controllers */
function IndexController($scope,$http) {
  $http.get("/logs").then(function(response) {
    $scope.logs = response.data;
    console.log($scope.logs);
  });
}

function AboutController($scope) {

}

function PostListController($scope,$http) {
  $http.get("/logs").then(function(response) {
    $scope.logs = response.data;
  });
}

function PostDetailController($scope, $routeParams, Post) {
  var postQuery = Post.get({ postId: $routeParams.postId }, function(post) {
    $scope.post = post;
  });
}
