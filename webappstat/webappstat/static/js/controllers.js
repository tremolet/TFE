'use strict';

/* Controllers */

function IndexController($scope, Logs) {
    var postsQuery = Logs.get({}, function(response) {
        console.log(response);
        $scope.logs = response.logs;
    });
}

function AboutController($scope) {

}

function PostListController($scope, Logs) {
	var postsQuery = Logs.get({}, function(response) {
        $scope.logs = response.logs;
    });
}

function PostDetailController($scope, $routeParams, Post) {
	var postQuery = Post.get({ postId: $routeParams.postId }, function(post) {
		$scope.post = post;
	});
}
