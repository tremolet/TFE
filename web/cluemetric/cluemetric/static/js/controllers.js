'use strict';

angular.module('Controllers', [])
//  .controller("myController", mycontroller);

/* Controllers */
function IndexController($scope,$http) {
  
}
function isValidDate(dateString) {
  //if a date is %Y-%m-%d and is a possible date (ex : 1998-08-30 OK,1704-Feb-02 NOK,2016-02-30 NOK)
  /*
  :params:dateString:type: String
  */
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if(!dateString.match(regEx))
    return false;  // Invalid format
  var d;
  if(!((d = new Date(dateString))|0))
    return false; // Invalid date (or this could be epoch)
  return d.toISOString().slice(0,10) == dateString;
}

function startEndDate(startDate,endDate){
	//verify if the range of dates is right
	/*
	:params:startDate:start date of a range
	:params:startDate:type: String
	:params:endDate:end date of a range
	:params:endDate:type:String
	*/
	
	return (new Date(startDate)<= new Date(endDate));
}
function dateOK(dateString){
//if a date is %Y-%m-%d and is a possible date (ex : 1998-08-30 OK,1704-Feb-02 NOK,2016-02-30 NOK),or is empty
  /*
  :params:dateString:type: String
  */
  dateString = dateString.trim();  
  return (isValidDate(dateString) || dateString == '');
}
function makeUrl(urlFirstPart,user,dateStart,dateEnd){
	/*make the url
	if userID set,add to the url. If dateStart and/or dateEnd is set,will be added to URL
	*/
	/*
	:params:urlFirstPart:basename of the url where the info will be retrieved
	:params:urlFirstPart:type: String
	:params:user(optional):user_id to search (filter)
	:params:user:type:String
	:params:startDate(optional):start date of a range
	:params:startDate:type: String
	:params:dateEnd(optional):end date of a range
	:params:dateEnd:type:String
	*/
	var url=urlFirstPart;
	var dataToSend=[];
	if (user !=null){
		dataToSend.push('userID='+user);
	}
	if (dateStart !='' || dateEnd !=''){
		if (dateStart !=''){
			dataToSend.push('from='+dateStart); 
		}	
		if (dateEnd !=''){
			dataToSend.push('until='+dateEnd); 
		}
	}
	if (user !=null || dateStart !='' || dateEnd !=''){
	 url+='?'+dataToSend.join('&');	
	}
	return url;
}

function ActivitiesController($rootScope,$scope,$http) {
  $http.get("/users").then(function(response) {
	  //get the data from Flask
	$scope.userToSearch = response.data.users;  	
    $scope.startDate=new Date(response.data.minDate).toISOString().slice(0,10);
    $scope.endDate=new Date(response.data.maxDate).toISOString().slice(0,10);
	$scope.message = '';
  });	
  $scope.refreshGraph=function(user){
	var errors=[];
	$scope.message = '';
    var OK = true;
    if (!dateOK($scope.startDate) || !dateOK($scope.endDate)){
		errors.push("One or many dates are invalid");
	}
	if (isValidDate($scope.startDate) && isValidDate($scope.endDate)){
		if (!startEndDate($scope.startDate,$scope.endDate)){
			errors.push("The starting date must be before the end date");
		}
	}
	$scope.message = errors.join(' and ');
	if ($scope.message != ''){
		OK=false;
	}
	if (OK == true){
	  //when the button in the form is clicked
    $scope.getUser = angular.copy(user);
	var url=makeUrl('/activities',$scope.getUser,$scope.startDate,$scope.endDate);
	$http.get(url).then(function(response) {
      $scope.logs=response.data.logs;
	  //linked with scope.$on('refreshChart') of the pie chart,will update the logs
      $rootScope.$broadcast('refreshChart',$scope.logs);
    });  
	}
  };  
}

function LoginsController($scope,$http,$rootScope) {
  
$http.get("/users").then(function(response) {
	//get the data from Flask
    $scope.userToSearch = response.data.users;
    $scope.startDate=new Date(response.data.minDate).toISOString().slice(0,10);
    $scope.endDate=new Date(response.data.maxDate).toISOString().slice(0,10);
	$scope.message = ''; 
  });	
  $scope.refreshGraph=function(user){
	var errors=[];
	$scope.message= '';
    var OK = true;
    if (!dateOK($scope.startDate) || !dateOK($scope.endDate)){
		errors.push("One or many dates are invalid");
	}
	if (isValidDate($scope.startDate) && isValidDate($scope.endDate)){
		if (!startEndDate($scope.startDate,$scope.endDate)){
			errors.push("The starting date must be before the end date");
		}
	}
	$scope.message = errors.join(' and ');
	if ($scope.message != ''){
		OK=false;
	}
	if (OK == true){	  
	  //when the button in the form is clicked
    $scope.getUser = angular.copy(user);
	var dataToSend=[];
	var url=makeUrl('/logs',$scope.getUser,$scope.startDate,$scope.endDate);
    $http.get(url).then(function(response) {
      $scope.logs=response.data.logs;
	  //linked with scope.$on('refreshChart') of the bar chart,will update the logs
      $rootScope.$broadcast('refreshChart',$scope.logs);
    });  }
  };  
}
function RequestController($scope,$http,$rootScope) {
  
$http.get("/users").then(function(response) {
	//get the data from Flask
    $scope.userToSearch = response.data.users;
    $scope.startDate=new Date(response.data.minDate).toISOString().slice(0,10);
    $scope.endDate=new Date(response.data.maxDate).toISOString().slice(0,10);
	$scope.message = ''; 
  });	
  $scope.refreshGraph=function(user){
	var errors=[];
	$scope.message= '';
    var OK = true;
    if (!dateOK($scope.startDate) || !dateOK($scope.endDate)){
		errors.push("One or many dates are invalid");
	}
	if (isValidDate($scope.startDate) && isValidDate($scope.endDate)){
		if (!startEndDate($scope.startDate,$scope.endDate)){
			errors.push("The starting date must be before the end date");
		}
	}
	$scope.message = errors.join(' and ');
	if ($scope.message != ''){
		OK=false;
	}
	if (OK == true){	  
	  //when the button in the form is clicked
    $scope.getUser = angular.copy(user);
	var dataToSend=[];
	var url=makeUrl('/requests',$scope.getUser,$scope.startDate,$scope.endDate);
    $http.get(url).then(function(response) {
      $scope.logs=response.data.logs;
	  //linked with scope.$on('refreshChart') of the bar chart,will update the logs
      $rootScope.$broadcast('refreshChart',$scope.logs);
    });  }
  };  
}




