'use strict';

angular.module('Controllers', [])
//  .controller("myController", mycontroller);

/* Controllers */
function logController($scope,$http) {
  $http.get("/logs").then(function(response) {
    $scope.usersFilter = response.data.usersFilter;
    $scope.dateMin = response.data.dateMin;
    $scope.usersToShow = response.data.usersToShow;
  });
 function formValidation(){
    $scope.searchUserForm.to=new Date()
    $scope.searchUserForm.model.from=new Date($scope.dateMin);
    $scope.searchUserForm.model.to=new Date($scope.searchUserForm.to);
    $scope.$watch('searchUserForm.model.from', validateDates);
    $scope.$watch('searchUserForm.model.to', validateDates);
    $scope.watch('dateMin',function (dateMin){
      $scope.model.from=dateMin;
     }
    });
    function validateDates(){
      var startDate=new Date($scope.searchUserForm.model.from);
      var endDate= new Date($scope.searchUserForm.model.to);
      $scope.form.valideDate.$setValidity("endBeforeStart", endDate >= startDate);
    };
    $scope.checkAll=function(){
      if ($scope.selectedAll) {
             $scope.selectedAll = true;
          } else {
            $scope.selectedAll = false;
          }
          angular.forEach($scope.usersFilter, function (user) {
            user.Selected = $scope.selectedAll;
          });

    };
  
    $scope.searchUser=function(form){
      $scope.userToSearch=[];
      $scope.getform = angular.copy(form);
      angular.forEach($scope.getform.usersFilter, function(user){
      if (!!user.Selected) $scope.userToSearch.push(user.userID);
      })
      $scope.getform.dateMax;
      var datas=[];
      datas['userToSearch'].push($scope.userToSearch);
      datas['_from']=$scope.searchUserForm.model.from;
      datas['_to']=$scope.searchUserForm.model.to;
      $http({
        url: '/users',
        method: "GET",
        headers: {'Content-Type': 'application/json' },
        data: JSON.stringify(datas)
      }).success(function(data) {
        console.log(data)
        });
    }
  }   
}

function activityController($scope,$http) {
  $http.get("/activities").then(function(response) {
    $scope.usersFilter = response.data.usersFilter;
    $scope.dateMin = response.data.dateMin;
    $scope.usersToShow = response.data.usersToShow;
  });
 function formValidation(){
    $scope.searchUserForm.to=new Date()
    $scope.searchUserForm.model.from=new Date($scope.dateMin);
    $scope.searchUserForm.model.to=new Date($scope.searchUserForm.to);
    $scope.$watch('searchUserForm.model.from', validateDates);
    $scope.$watch('searchUserForm.model.to', validateDates);
    $scope.watch('dateMin',function (dateMin){
      $scope.model.from=dateMin;
     }
    });
    function validateDates(){
      var startDate=new Date($scope.searchUserForm.model.from);
      var endDate= new Date($scope.searchUserForm.model.to);
      $scope.form.valideDate.$setValidity("endBeforeStart", endDate >= startDate);
    };
    $scope.checkAll=function(){
      if ($scope.selectedAll) {
             $scope.selectedAll = true;
          } else {
            $scope.selectedAll = false;
          }
          angular.forEach($scope.usersFilter, function (user) {
            user.Selected = $scope.selectedAll;
          });

    };
  
    $scope.searchUser=function(form){
      $scope.userToSearch=[];
      $scope.getform = angular.copy(form);
      angular.forEach($scope.getform.usersFilter, function(user){
      if (!!user.Selected) $scope.userToSearch.push(user.userID);
      })
      $scope.getform.dateMax;
      var datas=[];
      datas['userToSearch'].push($scope.userToSearch);
      datas['_from']=$scope.searchUserForm.model.from;
      datas['_to']=$scope.searchUserForm.model.to;
      $http({
        url: '/users',
        method: "GET",
        headers: {'Content-Type': 'application/json' },
        data: JSON.stringify(datas)
      }).success(function(data) {
        console.log(data)
        });
    }
  }   
}

function indexController(){
}


function formUserController($scope,$http) {
  $http.get("/users").then(function(response) {
    $scope.usersFilter = response.data.usersFilter;
    $scope.dateMin = response.data.dateMin;
    $scope.usersToShow = response.data.usersToShow;
  });
 function formValidation(){
    $scope.searchUserForm.to=new Date()
    $scope.searchUserForm.model.from=new Date($scope.dateMin);
    $scope.searchUserForm.model.to=new Date($scope.searchUserForm.to);
    $scope.$watch('searchUserForm.model.from', validateDates);
    $scope.$watch('searchUserForm.model.to', validateDates);
    $scope.watch('dateMin',function (dateMin){
      $scope.model.from=dateMin;
     }
    });
    function validateDates(){
      var startDate=new Date($scope.searchUserForm.model.from);
      var endDate= new Date($scope.searchUserForm.model.to);
      $scope.form.valideDate.$setValidity("endBeforeStart", endDate >= startDate);
    };
    $scope.checkAll=function(){
      if ($scope.selectedAll) {
             $scope.selectedAll = true;
          } else {
            $scope.selectedAll = false;
          }
          angular.forEach($scope.usersFilter, function (user) {
            user.Selected = $scope.selectedAll;
          });

    };
  
    $scope.searchUser=function(form){
      $scope.userToSearch=[];
      $scope.getform = angular.copy(form);
      angular.forEach($scope.getform.usersFilter, function(user){
      if (!!user.Selected) $scope.userToSearch.push(user.userID);
      })
      $scope.getform.dateMax;
      var datas=[];
      datas['userToSearch'].push($scope.userToSearch);
      datas['_from']=$scope.searchUserForm.model.from;
      datas['_to']=$scope.searchUserForm.model.to;
      $http({
        url: '/users',
        method: "GET",
        headers: {'Content-Type': 'application/json' },
        data: JSON.stringify(datas)
      }).success(function(data) {
        console.log(data)
        });
    }
  }   
}