'use strict';

angular.module('Controllers', [])
//  .controller("myController", mycontroller);

/* Controllers */
function IndexController($scope,$http) {
  
}
function isValidDate(dateString) {
  //if a date is %Y-%m-%d and is a possible date (ex : 1998-08-30 OK,1704-Feb-02 NOK,2016-02-30 NOK)
  /*
  :params:dateString:type: Date object
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

function makeUrl(urlFirstPart,user,dateStart,dateEnd){
	/*make the url
	if userID set,add to the url. If dateStart and dateEnd are valid dates but not in correct range,none of these are taken in account. Else if at least one of these are valid,but not the other,this one is taken in account
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
	if (dateStart !='' && dateEnd !='' && isValidDate(dateStart) && isValidDate(dateEnd)){
			if (startEndDate(dateStart,dateEnd)){
				dataToSend.push('from='+dateStart);
				dataToSend.push('until='+dateEnd);
			}
	} else {
		if (dateStart !='' || dateEnd !=''){
			if (dateStart !=''){
			 if (isValidDate(dateStart)){
				dataToSend.push('from='+dateStart); 
			 }	
			}
			if (dateEnd !=''){
			 if (isValidDate(dateEnd)){
				dataToSend.push('until='+dateEnd); 
			 }	
			}
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
  });	
  $scope.refreshGraph=function(user){
	  //when the button in the form is clicked
    $scope.getUser = angular.copy(user);
	var url=makeUrl('/activities',$scope.getUser,$scope.startDate,$scope.endDate);
	$http.get(url).then(function(response) {
      $scope.logs=response.data.logs;
	  //linked with scope.$on('refreshChart') of the pie chart,will update the logs
      $rootScope.$broadcast('refreshChart',$scope.logs);
    });  
  };  
}

function LoginsController($scope,$http,$rootScope) {
  
$http.get("/users").then(function(response) {
	//get the data from Flask
    $scope.userToSearch = response.data.users;
    $scope.startDate=new Date(response.data.minDate).toISOString().slice(0,10);
    $scope.endDate=new Date(response.data.maxDate).toISOString().slice(0,10);
  });	
  $scope.refreshGraph=function(user){
	  //when the button in the form is clicked
    $scope.getUser = angular.copy(user);
	var dataToSend=[];
	var url=makeUrl('/logs',$scope.getUser,$scope.startDate,$scope.endDate);
    $http.get(url).then(function(response) {
      $scope.logs=response.data.logs;
	  //linked with scope.$on('refreshChart') of the bar chart,will update the logs
      $rootScope.$broadcast('refreshChart',$scope.logs);
    });  
  };  
}


