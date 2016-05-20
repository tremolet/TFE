angular.module('Directives', [])
  .directive('pieGraph', pieGraph);

function pieGraph(){
  return{
    scope:{
      data:'='
    },
    restrict:'AE',
    template:'<div id="chart" class="graph"></div>',
    link:function(scope){
     scope.$watch('data', function (data) {
      var w = 400;
      var h = 400;
      var r = h/2;
      var color = d3.scale.category20c();

      var datas = data.logs;

      var vis = d3.select('#chart').append("svg:svg").data([datas]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");
      var pie = d3.layout.pie().value(function(d){return d.nbLog;});

      // declare an arc generator function
      var arc = d3.svg.arc().outerRadius(r);

      // select paths, use arc generator to draw
      var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
      arcs.append("svg:path")
          .attr("fill", function(d, i){
              return color(i);
          })
          .attr("d", arc);

      // add the text
       
       
       var legend = d3.select("#chart").append("svg")
  		    .attr("class", "legend")
  		    .attr("width", r)
  		    .attr("height", r * 2)
  		    .selectAll("g")
  		    .data(datas)
  		    .enter().append("g")
  		    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
              .attr("width", 18)
              .attr("height", 18)
              .style("fill", function(d, i) { return color(i); });

       legend.append("text")
  	     .attr("x", 24)
  	     .attr("y", 9)
  	     .attr("dy", ".35em")
             .text(function(d,i) { return datas[i].day; });

})
}
};
}
angular.module('Directives', [])
 .directive('nbLogin', nbLogin);

function nbLogin(){
  return{
    scope:{
      data:'='
    },
    restrict:'AE',
    template:'',
    link:function(scope){
     scope.$watch('data', function (data) {
		var w = 800;
		var h = 450;
		var margin = {
			top: 58,
			bottom: 100,
			left: 80,
			right: 40
		};
                var datas = data.logs;
                datas.sort(function(a,b){
  			return new Date(a.day) - new Date(b.day);
			});
		var width = w - margin.left - margin.right;
		var height = h - margin.top - margin.bottom;

		var x = d3.scale.ordinal() //when nothing is comparing with each others,like names Simon,Natacha,etc..
			.domain(datas.map(function(entry){  //set the range of elements
				return entry.day;
			}))
			.rangeBands([0, width]); //range for ordinals
		var y = d3.scale.linear() // scale the data
			.domain([0, d3.max(datas, function(d){  // set the range of value
				return d.nbLog;
			})])
			.range([height, 0]); // scale to the height of the chart
		var ordinalColorScale = d3.scale.category20(); //20 colors of ordinal scale
/*var linearColorScale=d3.scale.linear()
                      .domain([0,data.length])
                       .range(["#572500","#F68026"]); //have different colors on the bars */
		var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom");
                                
		var yAxis = d3.svg.axis()
				.scale(y)
				.orient("left");
		var yGridlines = d3.svg.axis()
					.scale(y)
					.tickSize(-width,0,0)
					.tickFormat("")
					.orient("left");	
		var svg = d3.select("body").append("svg") //select the body tag and had svg tag at the end of the body tag
				.attr("id", "chart") // set attr and value to it
				.attr("width", w)
				.attr("height", h);
		var chart = svg.append("g")
				.classed("display", true) //<g class=display
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")"); //transform allows us to move the group : move on the x,move on the y
		function plot(params){
			this.append("g")
				.call(params.gridlines)
				.classed("gridline", true)
				.attr("transform", "translate(0,0)")
			this.selectAll(".bar") //select all the elements that have the bar class
				.data(params.data)
				.enter() //this represent what draw the bars
				.append("rect")
				.classed("bar", true) //true->add that class name,false,remove that class name
				.attr("x", function(d,i){
					return x(d.day);
				})
				.attr("y", function(d,i){
					return y(d.nbLog); //scale for the y for ordinal
				})
				.attr("height", function(d,i){
					return height - y(d.nbLog);
				})
				.attr("width", function(d){
					return x.rangeBand(); //range of a band
				})
				.style("fill", function(d,i){
					return ordinalColorScale(i); //get the bars to have different colors on it
				});
			this.selectAll(".bar-label")
				.data(params.data)
				.enter()
				.append("text")
				.classed("bar-label", true)
				.attr("x", function(d,i){
					return x(d.day) + (x.rangeBand()/2)
				})
				.attr("dx", 0) //put the text 0 pixels before the end of the bar
				.attr("y", function(d,i){
					return y(d.nbLog); //set thet text at the y of the y
				})
				.attr("dy", -6)
				.text(function(d){
					return d.nbLog; //d.value if key->value
				})
			this.append("g") //append add this element to the DOM
				.classed("x axis", true)
				.attr("transform", "translate(" + 0 + "," + height + ")") //x-axis at the bottom
				.call(params.axis.x) //show the y-axis
				.selectAll("text")
					.style("text-anchor", "end")
					.attr("dx", -8)
					.attr("dy", 8)
					.attr("transform", "translate(-10,0) rotate(-90)"); //rotate the text

			this.append("g")
				.classed("y axis", true)
				.attr("transform", "translate(0,0)") //y-axis at the bottom
				.call(params.axis.y);

			this.select(".y.axis")
				.append("text")
				.attr("x", 0)
				.attr("y", 0)
				.style("text-anchor", "middle")
				.attr("transform", "translate(0,-15)") //rotate the y-axis-label
				.text("Nb login"); //label axis y

			this.select(".x.axis")
				.append("text")
				.attr("x", 0)
				.attr("y", 0)
				.style("text-anchor", "middle")
				.attr("transform", "translate(" + (width+15) + ",20)")
				.text("Date"); //label axis x
		}
	plot.call(chart, {
		data: datas, // data source
		axis:{
			x: xAxis,
			y: yAxis
		},
		gridlines: yGridlines
	});
     })
  }
 };
}


/*angular.module('Directives', [])
 .directive('nbLogin', nbLogin);

function nbLogin(){
  return{
    scope:{
      data:'='
    },
    restrict:'AE',
    template:'',
    link:function(scope){
     scope.$watch('data', function (data) {
		var w = 800;
		var h = 450;
		var margin = {
			top: 58,
			bottom: 100,
			left: 80,
			right: 40
		};
                var datas = data.logs;
                datas.sort(function(a,b){
  			return new Date(a.day) - new Date(b.day);
			});
		var width = w - margin.left - margin.right;
		var height = h - margin.top - margin.bottom;

		var x = d3.scale.ordinal() //when nothing is comparing with each others,like names Simon,Natacha,etc..
			.domain(datas.map(function(entry){  //set the range of elements
				return entry.day;
			}))
			.rangeBands([0, width]); //range for ordinals
		var y = d3.scale.linear() // scale the data
			.domain([0, d3.max(datas, function(d){  // set the range of value
				return d.nbLog;
			})])
			.range([height, 0]); // scale to the height of the chart
		var ordinalColorScale = d3.scale.category20(); //20 colors of ordinal scale

		var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom");
                                
		var yAxis = d3.svg.axis()
				.scale(y)
				.orient("left");
		var yGridlines = d3.svg.axis()
					.scale(y)
					.tickSize(-width,0,0)
					.tickFormat("")
					.orient("left");	
		var svg = d3.select("body").append("svg") //select the body tag and had svg tag at the end of the body tag
				.attr("id", "chart") // set attr and value to it
				.attr("width", w)
				.attr("height", h);
		var chart = svg.append("g")
				.classed("display", true) //<g class=display
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")"); //transform allows us to move the group : move on the x,move on the y
		function plot(params){
			this.append("g")
				.call(params.gridlines)
				.classed("gridline", true)
				.attr("transform", "translate(0,0)")
			this.selectAll(".bar") //select all the elements that have the bar class
				.data(params.data)
				.enter() //this represent what draw the bars
				.append("rect")
				.classed("bar", true) //true->add that class name,false,remove that class name
				.attr("x", function(d,i){
					return x(d.day);
				})
				.attr("y", function(d,i){
					return y(d.nbLog); //scale for the y for ordinal
				})
				.attr("height", function(d,i){
					return height - y(d.nbLog);
				})
				.attr("width", function(d){
					return x.rangeBand(); //range of a band
				})
				.style("fill", function(d,i){
					return ordinalColorScale(i); //get the bars to have different colors on it
				});
			this.selectAll(".bar-label")
				.data(params.data)
				.enter()
				.append("text")
				.classed("bar-label", true)
				.attr("x", function(d,i){
					return x(d.day) + (x.rangeBand()/2)
				})
				.attr("dx", 0) //put the text 0 pixels before the end of the bar
				.attr("y", function(d,i){
					return y(d.nbLog); //set thet text at the y of the y
				})
				.attr("dy", -6)
				.text(function(d){
					return d.nbLog; //d.value if key->value
				})
			this.append("g") //append add this element to the DOM
				.classed("x axis", true)
				.attr("transform", "translate(" + 0 + "," + height + ")") //x-axis at the bottom
				.call(params.axis.x) //show the y-axis
				.selectAll("text")
					.style("text-anchor", "end")
					.attr("dx", -8)
					.attr("dy", 8)
					.attr("transform", "translate(0,0) rotate(-45)"); //rotate the text

			this.append("g")
				.classed("y axis", true)
				.attr("transform", "translate(0,0)") //y-axis at the bottom
				.call(params.axis.y);

			this.select(".y.axis")
				.append("text")
				.attr("x", 0)
				.attr("y", 0)
				.style("text-anchor", "middle")
				.attr("transform", "translate(-50," + height/2 + ") rotate(-90)") //rotate the y-axis-label
				.text("Nb login"); //label axis y

			this.select(".x.axis")
				.append("text")
				.attr("x", 0)
				.attr("y", 0)
				.style("text-anchor", "middle")
				.attr("transform", "translate(" + width/2 + ",80)")
				.text("Date"); //label axis x
		}
	plot.call(chart, {
		data: datas, // data source
		axis:{
			x: xAxis,
			y: yAxis
		},
		gridlines: yGridlines
	});
     })
  }
 };
}
*/



