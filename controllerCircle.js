angular.module('myApp', []).

// Directive contenant le code D3.js
directive('grapheForces', function() {
    return {
        restrict: 'A',
        link: function (scope, element) {
            var width = 450;
            var height = 400;
            var color = d3.scale.category20();
            
            // On récupère les données présentent dans scope.grapheDatas
            // Le $watch a pour but de mettre à jour le graphe dès que les
            // données présentent dans $scope.grapheDatas changent.
            scope.$watch('grapheDatas', function (grapheDatas) {
                
               var w = 400;
               var h = 400;
               var r = h/2;
               var color = d3.scale.category20c();
               var vis = d3.select('#chart').append("svg:svg").data([grapheDatas]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");
               var pie = d3.layout.pie().value(function(d){return d.value;});
               // declare an arc generator function
               var arc = d3.svg.arc().outerRadius(r);
               // select paths, use arc generator to draw
               var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
               arcs.append("svg:path")
                   .attr("fill", function(d, i){
                     return color(i);
                      })
                   .attr("d", function (d) {
                        // log the result of the arc generator to show how cool it is :)
                         console.log(arc(d));
                          return arc(d);
                          });

                       // add the text
                      arcs.append("svg:text").attr("transform", function(d){
			      d.innerRadius = 0;
			      d.outerRadius = r;
                              return "translate(" + arc.centroid(d) + ")";}).attr("text-anchor", "middle").text( function(d, i) {
                              return grapheDatas[i].label;}
               });
            });
        }
    }
})
//get data in scope RESTful get
.controller('AppCtrl', ['$scope', '$http','filterFilter'
    function($scope, $http,filterFilter) {		
    $scope.grapheDatas = function() {
      $http.get('http://127.0.0.1:5000/pieData/data').then(function(result) {
		var login=filterFilter(result.data,{ request.categ: 'LOGIN' }).length;
                var other=filterFilter(result.data,{ request.categ: 'OTHER' }).length;	
	        return [{'label':'login','value':login},{'label':'other','value':other}]
		);
                                                                             };
	function(error) {
     return [{'label':'login','value':0},{'label':'other','value':0}];}
                                    };
	                                  }; 
         ]);

           });



