ng-model='addEvent.location' ->for example 
<ng-view></ng-view> -> show the content dynamically
{{addEvent|json}} ->form,get the output as json
ng-submit ->for the form
<option>...
->ng-submit for class name,and will  ->ng-submit(nameOfTheForm)

/*controller
function () {

  'use strict';

  angular.module('WordcountApp', [])
  .controller('formCtrl',['eventFactory,'$scope',function(,eventFactory,$scope)])
    $scope.event[]=eventFactory.getAllEvents();
  .controller('WordcountController', ['$scope', '$log',
    function($scope, $log) {
    $scope.getResults = function() {
      $log.log("test");
    };
  }

  ]);

}());

create a new controller that have the same name as the form
  change also in the app.js the name of the first paramter of the controller
  $scope.event[]
  inside the app 
  $scope.submit= function(form){
  eventFactory.createEvent(angular.copy(form)); ->to not pass it by reference
  console.log($scope.event);
  }
angular.module('eventApp')
.controller('formCtrl',['eventFactory',function(eventFactory){
 this.event=eventFactory.getAllEvents();
 this.eventForm={};
 this.eventForm.date=new Date(2015,0,1);
 this.categories=[{id:1,name:'Music'},{id:2,name:'Cinema'},{id:3,name:'Games'},{id:4,name:'Special Category'}]
 this.selectedOptions={id:1,name:'Music'} ->by default
 this.evenSpecial='True'
 this.specialValue={id:1,value:'SomethingSpecial'};
 this.submitForm=function(form){
 form.category=this.selectedOption.id;
 eventFactory.createEvent(angular.copy(form),this.event); 
 }
}])

.controller('eventManagerCtl',['eventFactory',$filter', function(eventFactory,$filter){
this.eventList=eventFactory.getAllEvents();
this.eventList=$filter('orderBy')(this.eventList,category.name);

}])

var self=this;
eventList=eventFactory.getAllEvents().then(function(result){
self.eventList=result.data;
console.log(this.eventList);
});
}])
.controller('eventManagerCtl',['eventFactory','initialData' function(eventFactory,initialData){
var self=this;
this.eventList=initialData;

}])

angular.module('myFirstApp')
.controller('myController',function($scope,personService){
	$scope.firstName='Trainee';
	$scope.lastName='Russo';

	$scope.printName=function(){return personService.printName($scope.firstName,$scope.lastName)}
});
.controller('AboutCtrl',['$scope','$routeParams',function($scope,$routeParams){
 $scope.input=$routeParams.parm1;
}])
.controller('ContactCtrl',['$scope','$routeParams',function($scope,$routeParams){
	$scope.input=$routeParams.parm1;
}])


*/
/*eventFactory
angular.module('eventApp')
.factory('eventFactory',function(){
   var eventFactory={};
   var events=[];
   eventFactory.getAllEvents=function(){
   return events;
   }
   eventFactory.createEvent=function(event,eventList){
   events.push(event);
   eventList=events;
   return eventList
   }
   return eventFactory;
    })
angular.module('eventApp').factory('eventFactory',['$http',function($http){
var eventFactory={};
var events=[];
eventFactory.getAllEvents=function(){
events=$http.get('events.json');
return events;
}
$http.get('events.json').then(function(response){
var data=response.data;
return data;
})
return events;

*/

/*app.js
include ng-message
angular.module('eventApp',['ngRoute','ngMessages'])
<div ng-messages"addEeventForm.eventName.$dirty && addEeventForm.eventName.$error">
<div ng-message='required'>This is required</div>
<div ng-message='minlength'>Please enter a name at least... long</div>
<div ng-message='maxlength'>Please enter a name shorter</div>
</div>
angular.module('eventApp',['ngRoute'])
.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
  $routeProvider.when('/add-event',{
    templateUrl='views/add-event.html',
	controller:'formCtrl',
	controllerAs:'eventCtl'
     })
   otherwise({redirectTo:'/'})
   $locationProvider.html5Mode(true);
}])
.run('$rootScope',['',function(){
$rootScope.event=[]; 
}]);
.when
resolve:{initialData:function(eventFactory){
return eventFactory.getAllEvents();
}}

angular.module('myFirstApp',['ngRoute']) 
.config(['$routeProvider','$locationProvider',function($locationProvider,$routeProvider){
   $routeProvider.when('/about/:parm1'.{
   	templateUrl:'views/about.html',
   	controller:'AboutCtrl'
   })
   .when('/contact:parm1',{templateUrl:'views/contact.html',controller:'ContactCtrl'})
   .otherwise({redirectTo:'/'})
   $locationProvider.html5Mode(true);
}])
.factory('personService',function(){
  var person={};
    person.printName=function(firstName,lastName){
      return:firstName+' 'lastName;
           }
        return person;
})

*/

/*index.html
<div ng-repeat="event  in eventCtl.event">
<table>
<tr><td>Event name </td></tr>
<tr><td>{{event.name}}</td></tr>
</table>
</div>
in ng-submit->eventCtl.submitForm(evenForm)
<select class="form-control" required ng-model='eventCtl.selectedOption' ng-options='category.name for category in eventCtl.categories track by category.id' name='eventCategory'>
ng-if="eventCtl.eventForm.specialEvent==='True'" ->will only display if this is true
<input type='radio' ng-model='eventCtl.specialEvent' ng-value='eventCtl.specialValue' name="evenSpecial">
<table>	
<tr ng-repeat-start="event in eventCtl.event">
 <td>{event.name}</td> 
</tr>
<tr ng-repeat-end="event in eventCtl.event">
 <td>{event.description}</td> 
</tr>	
</table>
<tr ng-repeat-end="event in eventCtl.event track by $index or event.id"> ->if repeatition
<input type="date" min max ng-model='eventCtl.eventForm.date' ->for date
type time,etc..
{event.date | date:'yyyy-MM-dd'}
<p  ng-show='addEventForm.$dirty && addEventForm.eventName.$invalid'>Please enter the event name</p> ng-hide
ng-minlength='3' ng-maxlength='50' ->for input
<input text="text" required ng-pattern='/^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]||[1-2][0-9]|3[0-1])$/'> ->date correct format
$dirty,$invalid,etc...; ->CHECK FOR VALIDITY
<form ng-submit='addEevent.form.$valid && eventCtl.submitForm(eventCtl.eventForm)'
or in the submit button ng-disabled="addEventForm.$invalid"
<input='text' ng-model='search.$'>Search
<input='text' ng-model='search.name>Search by event name
<button ng-clicked='search=undefined'>Clear</button>
<tr ng-repeat="event in managerCtl.eventList | filter:search | orderBy: 'name'" -name ->reverse sort
contact.html

<div>
  <h1>This is my contact page </h1>
  <h2> The input value is {{input}}</h2>
</div>*/
<!DOCTYPE html>
<html ng-app='myFirstApp'> //name of the app
<head>
<base href="/">	
<meta charset="UTF-8">	
 <title> Our journey begins... </title>
 <link rel="stylesheet" href="">
 <style> body{padding-top:50px;}.starer-template{padding:40px 15px;text-align:center; }</style>
 <script src='https://ajax.googleapis.com/ajax/libs/angularjs/1.3.15/angular.min.js'></script>
</head>
<body>
	<a ng-href='/about/alex'>About</a>
	<a ng-href='/contact/Mark'>Contact</a>
	<div class="starter-template">
	 <input type="text" name="name" ng-model="firstName">
	 <input type="text" name="name" ng-model="lastName">
	 <h1>Hello,{{printName()}}</h1>
	  <ng-view></ng-view>
    <script src='https//code.angularjs.org/1.3.15/angular-route.js'></script>
    <script src='ap.js'></script>
    <script src='controller.js'></script>

</body>
 
</html>

<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.9/angular.min.js"></script>
ng-app: <html ng-app="WordcountApp">
ng-controller: <body ng-controller="WordcountController">
ng-submit: <form role="form" ng-submit="getResults()">
<script src="{{ url_for('static', filename='main.js') }}"></script>


*/
