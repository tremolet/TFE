angular.module('Directives', [])
  .directive('activities', activities)
  .directive('nbRequest',nbRequest)
  .directive('nbLogin', nbLogin);

function activities(){
  return{
    scope:{
      logs:'='  //retrieve the data from the scope in the controller via the tag
    },
    restrict:'AE',
    template:'<div id="chart" class="graph"></div>',
    link:function(scope){
		//initialization,when passing by the tag and have some data
		scope.init = function() {
			// params
			
			var width = 800;
			scope.height = 500;
			scope.radius = Math.min(width, scope.height) / 2;
			scope.color = d3.scale.category20();
            var total=0;
			for(var i in scope.logs) { total += parseFloat(scope.logs[i].count); }
			// function that calculate the values to draw each pie
			scope.pie = d3.layout.pie()
				.value(function(d) { return d.count; })
				.sort(null);
			// function that define each arc
			scope.arc = d3.svg.arc()
				.outerRadius(scope.radius);

			// attach the svg to the dom
			scope.svg = d3.select("#chart").append("svg")
				.attr("width", width)
				.attr("height", scope.height)
			  .append("g")
				.attr("transform", "translate(" + width / 2 + "," + scope.height / 2 + ")");
			
			// fill the chart with data
			scope.path = scope.svg.selectAll("path")
						.data(scope.pie(scope.logs))
						.enter().append("path")
						  .classed("path",true)
						  .attr("fill", function(d, i) { return scope.color(i); })
						  .attr("d", scope.arc)
						  .each(function(d) { this._current = d; }); // store the initial angles
            
			// draw legend
			scope.legend = d3.select("#chart").append("svg")
	  		    .attr("class", "legend")
	  		    .selectAll("g")
	  		    .data(scope.logs)
	  		    .enter()
				.append("g")
				.attr("transform", function(d, i) { return "translate(0," + (i * 20) + ")"; });

			scope.legend.append("rect")
			      .attr("width", 18)
			      .attr("height", 18)
			      .style("fill", function(d, i) { return scope.color(i); });

		    scope.legend.append("text")
			     .attr("x", 24)
		  	     .attr("y", 9)
		  	     .attr("dy", ".35em")
			     .text(function(d,i) { return d.categ.concat(' : ',((parseFloat(d.count)/parseFloat(total))*100).toFixed(2),'% (',d.count,')'); }); 
		};
        //when update the chart
		scope.$on("refreshChart", function(event, logs) {
			/*
			:params:event: listener,when refreshChart,here when the button of the form is clicked
			:params:logs: updated data to pass to update the graph
			:params:logs:type:Array
			*/
			scope.logs = logs;
            var total=0;
			for(var i in scope.logs) { total += parseFloat(scope.logs[i].count); }
			// update each pie of the chart with the new values
			scope.svg.selectAll("path")
			    .data(scope.pie(scope.logs))
				.enter()
				.append("path");
			// update properties
			scope.svg.selectAll("path")
                      .attr("fill", function(d, i) { return scope.color(i); })
					  .attr("d", scope.arc)
					  .each(function(d) { this._current = d; });		  					
			//exit
			scope.svg.selectAll("path")
					.data(scope.pie(scope.logs))
					.exit()
					.remove();
			
			/* LEGEND */
			// update data legend
			d3.select(".legend").remove();
			scope.legend = d3.select("#chart").append("svg")
	  		    .attr("class", "legend")
	  		    .selectAll("g")
	  		    .data(scope.logs)
	  		    .enter()
				.append("g")
				.attr("transform", function(d, i) { return "translate(0," + (i * 20) + ")"; });

			scope.legend.append("rect")
			      .attr("width", 18)
			      .attr("height", 18)
			      .style("fill", function(d, i) { return scope.color(i); });

		    scope.legend.append("text")
			     .attr("x", 24)
		  	     .attr("y", 9)
		  	     .attr("dy", ".35em")
			     .text(function(d,i) { return d.categ.concat(' : ',((parseFloat(d.count)/parseFloat(total))*100).toFixed(2),'% (',d.count,')'); }); 
		});
		
		scope.init();
	}
  };
}


function nbLogin(){
  return{
    scope:{
      data:'=' //retrieve the data from the scope in the controller via the tag and have some data
    },
    restrict:'AE',
    template:'<div id="barChart" class="graph"></div>',
    link:function(scope){
		var w = 800;
		var h = 450;
		var margin = {
			top: 58,
			bottom: 100,
			left: 80,
			right: 40
		};
		//get the data and sort it by date
		var datas=scope.data;
		datas.sort(function(a,b){
					return new Date(a.day) - new Date(b.day);
					});
		
        var width = w - margin.left - margin.right;
		var height = h - margin.top - margin.bottom;
		scope.x = d3.scale.ordinal() //when nothing is compared with each others,like names Simon,Natacha,etc..
			.domain(datas.map(function(entry){  //set the range of elements
				return entry.day;
			}))
			.rangeBands([0, width]); //range for ordinals
		scope.y = d3.scale.linear() // scale the data
			.domain([0, d3.max(datas, function(d){  // set the range of value
				return d.nbLog;
			})])
			.range([height, 0]); // scale to the height of the chart
		scope.ordinalColorScale = d3.scale.category20(); //20 colors of ordinal scale
		scope.xAxis = d3.svg.axis()
				.scale(scope.x)
				.orient("bottom");
        scope.yAxis = d3.svg.axis()
				.scale(scope.y)
				.orient("left");
		//grid lines drawn		
		scope.yGridlines = d3.svg.axis()
					.scale(scope.y)
					.tickSize(-width,0,0)
					.tickFormat("")
					.orient("left");	
		var svg = d3.select("#barChart").append("svg") //select the body tag and had svg tag at the end of the body tag
				.attr("id", "chart") // set attr and value to it
				.attr("width", w)
				.attr("height", h);
		scope.chart = svg.append("g")
				.classed("display", true) //<g class=display
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")"); //transform allows us to move the group : move on the x,move on the y
		
		function drawAxis(params){
			//when created
		 if (params.initialize===true){
			//gridlines	
			this.append("g")
				.call(params.gridlines)
				.classed("gridline", true)
				.attr("transform", "translate(0,0)")
			this.append("g") //append add this element to the DOM
				.classed("x axis", true)
				.attr("transform", "translate(" + 0 + "," + height + ")") //x-axis at the bottom
				.call(params.axis.x) //show the y-axis
				.selectAll("text")
				    .classed("x-axis-label",true)
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
				.attr("transform", "translate(-60," + height/2 + ") rotate(-90)") //rotate the y-axis-label
				.text("Nb login"); //label axis y

			this.select(".x.axis")
				.append("text")
				.attr("class", "name-axis-x")
				.attr("x", 0)
				.attr("y", 0)
				.style("text-anchor", "middle")
				.attr("transform", "translate(" + width/2 + ",100)")
				.text("Date"); //label axis x
		 } else if(params.initialize===false) {
			this.selectAll(".x.axis")
			    .transition()
                .duration(800)
			    .call(params.axis.x);
			
			this.selectAll(".x.axis")
				.selectAll("text:not(.name-axis-x)")
				.style("text-anchor", "end")
				.attr("dx", -8)
				.attr("dy", 8)
				.attr("transform", function() {return "translate(-10,0) rotate(-90)"; }); //rotate the text			 
			this.selectAll("g.y.axis")
			    .transition()
                .duration(800)
				.call(params.axis.y);	 
		   }	
		 	
		}
		function plot(params){
			params.data.sort(function(a,b){
					return new Date(a.day) - new Date(b.day);
					});
			scope.x.domain(params.data.map(function(entry){  //set the range of elements
				return entry.day;
			}));
			scope.y.domain([0, d3.max(params.data, function(d){  // set the range of value
				return d.nbLog;
			})]);
			drawAxis.call(this,params)
			//enter()
			this.selectAll(".bar") //select all the elements that have the bar class
				.data(params.data)
				.enter()             //add data
				.append("rect")
				.classed("bar", true)	//true->add that class name,false,remove that class name
				.on("mouseover",function(d,i){  //event listeners
					d3.select(this).style("fill","yellow");
				})
				.on("mousemove",function(d,i){
					
				})
				.on("mouseout",function(d,i){
					d3.select(this).style("fill",scope.ordinalColorScale(i));
				});	
			this.selectAll(".bar-label")  
				.data(params.data)
				.enter()
				.append("text")
				.classed("bar-label", true);
			
            //update
			this.selectAll(".bar")
                .transition()
                .duration(800)				
				.attr("x", function(d,i){
					return scope.x(d.day);
				})
				.attr("y", function(d,i){
					return scope.y(d.nbLog); //scale for the y for ordinal
				})
				.attr("height", function(d,i){
					return height - scope.y(d.nbLog);
				})
				.attr("width", function(d){
					return scope.x.rangeBand(); //range of a band
				})
				.style("fill", function(d,i){
					return scope.ordinalColorScale(i); //get the bars to have different colors on it
				});
			this.selectAll(".bar-label")
                .transition()
                .duration(800)				
				.attr("x", function(d,i){
					return scope.x(d.day) + (scope.x.rangeBand()/2)
				})
				.attr("dx", 0) //put the text 0 pixels before the end of the bar
				.attr("y", function(d,i){
					return scope.y(d.nbLog); //set thet text at the y of the y
				})
				.attr("dy", -6)
				.text(function(d){
					return d.nbLog; //d.value if key->value
				})	
            //exit()			 //delete datas that is not anymore present
			this.selectAll(".bar")
				.data(params.data)
				.exit()
				.remove();
				
			this.selectAll(".bar-label")
			    .data(params.data)
				.exit()
				.remove();			
		}
	scope.init=function(){
	 //initialization,when passing by the tag	
	 
	//create the graph				
	 plot.call(scope.chart, {
		data: datas, // data source
		axis:{
			x: scope.xAxis,
			y: scope.yAxis
		},
		gridlines: scope.yGridlines,
		initialize:true            //$scope.on
	});		
	}
   scope.$on("refreshChart", function(event, logs) {
	   /*
			:params:event: listener,when refreshChart,here when the button of the form is clicked
			:params:logs: updated data to pass to update the graph
			:params:logs:type:Array
	   */

	   //draw the new graph
	   plot.call(scope.chart, {
		data: logs, // data source
		axis:{
			x: scope.xAxis,
			y: scope.yAxis
		},
		gridlines: scope.yGridlines,
		initialize:false
	});
   });	
	scope.init();
	}
 };
}

function nbRequest(){
  return{
    scope:{
      data:'=' //retrieve the data from the scope in the controller via the tag and have some data
    },
    restrict:'AE',
    template:'<div id="barChartRequest" class="graph"></div>',
    link:function(scope){
		var w = 800;
		var h = 450;
		var margin = {
			top: 58,
			bottom: 100,
			left: 80,
			right: 40
		};
		//get the data and sort it by date
		
		
        var width = w - margin.left - margin.right;
		var height = h - margin.top - margin.bottom;
		scope.x = d3.scale.linear() //when nothing is compared with each others,like names Simon,Natacha,etc..
					.range([0, width]); //range for ordinals
		scope.y = d3.scale.linear() // scale the data
						 .range([height, 0]); // scale to the height of the chart
		scope.ordinalColorScale = d3.scale.category10(); //20 colors of ordinal scale
		scope.xAxis = d3.svg.axis()
				.scale(scope.x)
				.orient("bottom");
        scope.yAxis = d3.svg.axis()
				.scale(scope.y)
				.orient("left");
		//grid lines drawn		
		scope.yGridlines = d3.svg.axis()
					.scale(scope.y)
					.tickSize(-width,0,0)
					.tickFormat("")
					.orient("left");	
		var svg = d3.select("#barChartRequest").append("svg") //select the body tag and had svg tag at the end of the body tag
				.attr("id", "chart") // set attr and value to it
				.attr("width", w)
				.attr("height", h);
		scope.chart = svg.append("g")
				.classed("display", true) //<g class=display
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")"); //transform allows us to move the group : move on the x,move on the y
		
		function drawAxis(params){
			//when created
		 if (params.initialize===true){
			//gridlines	
			this.append("g")
				.call(params.gridlines)
				.classed("gridline", true)
				.attr("transform", "translate(0,0)")
			this.append("g") //append add this element to the DOM
				.classed("x axis", true)
				.attr("transform", "translate(" + 0 + "," + height + ")") //x-axis at the bottom
				.call(params.axis.x) //show the y-axis
				.selectAll("text")
				    .classed("x-axis-label",true)
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
				.attr("transform", "translate(-60," + height/2 + ") rotate(-90)") //rotate the y-axis-label
				.text("Nb login"); //label axis y

			this.select(".x.axis")
				.append("text")
				.attr("class", "name-axis-x")
				.attr("x", 0)
				.attr("y", 0)
				.style("text-anchor", "middle")
				.attr("transform", "translate(" + width/2 + ",100)")
				.text("Date"); //label axis x
		 } else if(params.initialize===false) {
			this.selectAll(".x.axis")
			    .transition()
                .duration(800)
			    .call(params.axis.x);
			
			this.selectAll(".x.axis")
				.selectAll("text:not(.name-axis-x)")
				.style("text-anchor", "end")
				.attr("dx", -8)
				.attr("dy", 8)
				.attr("transform", function() {return "translate(-10,0) rotate(-90)"; }); //rotate the text			 
			this.selectAll("g.y.axis")
			    .transition()
                .duration(800)
				.call(params.axis.y);	 
		   }	
		 	
		}
		function plot(params){
			params.data.sort(function(a,b){
					return new Date(a.day) - new Date(b.day);
					});
			var dateParser = d3.time.format("%Y-%m-%d").parse;
			scope.nested = d3.nest()
							 .key(function(d){ return d.categ; });
							 					 
            			
			var stack = d3.layout.stack()
							.offset("zero")
							.values(function(d){ return d.values;})
							.x(function(d) { var date = dateParser(d.day); return date; })
							.y(function(d) { return d.nbRequest; });
			scope.layers = stack(scope.nested.entries(params.data));
			scope.nested.entries(params.data);
			var keys = scope.nested[0].values.map(function(item){var date= dateParser(item.day); return date; });		
			scope.x.domain(keys);
			scope.y.domain([0, d3.max(scope.layers, function(d){  // set the range of value
				return d.y0 + d.y;
			})]);
			scope.ordinalColorScale.domain(scope.layers.map(function (layer){
          return layer.key;
        }));

			drawAxis.call(this,params)
			//enter()
			scope.layerGroups = this.selectAll('.layers').data(scope.layers);
			scope.layerGroups.enter().append("g").attr("class", "layer");
			scope.layerGroups.exit().remove();
			scope.layerGroups.style("fill", function (d){
				return scope.ordinalColorScale(d.key);
				});
			scope.bars = scope.layerGroups.selectAll('.rect').data(function(d){return d.values;});
            
            

			
            //update
			scope.bars.transition()
					  .duration(800)
					  .attr('x',function(d){var date = dateParser(d.day);return scope.x(date);})
                      .attr('y',function(d){return scope.y(d.y0+d.y);})
                      .attr('width',function(d){return scope.x(d);})
                      .attr('height',function (d){return height-scope.y(d.y);});					  

	
            //exit()			 //delete datas that is not anymore present
			scope.bars.exit().remove();	
			if (params.initialize==True){
				scope.legend = d3.select("#barChartRequest").append("svg")
	  		    .attr("class", "legend")
	  		    .selectAll("g")
	  		    .data(scope.layers)
	  		    .enter()
				.append("g")
				.attr("transform", function(d, i) { return "translate(0," + (i * 20) + ")"; });

			scope.legend.append("rect")
			      .attr("width", 18)
			      .attr("height", 18)
			      .style("fill", function(d, i) { return scope.ordinalColorScale(d.key); });

		    scope.legend.append("text")
			     .attr("x", 24)
		  	     .attr("y", 9)
		  	     .attr("dy", ".35em")
			     .text(function(d) { return d.categ; }); 
			} else {
				d3.select(".legend").remove();
			scope.legend = d3.select("#barChartRequest").append("svg")
	  		    .attr("class", "legend")
	  		    .selectAll("g")
	  		    .data(scope.layers)
	  		    .enter()
				.append("g")
				.attr("transform", function(d, i) { return "translate(0," + (i * 20) + ")"; });

			scope.legend.append("rect")
			      .attr("width", 18)
			      .attr("height", 18)
			      .style("fill", function(d) { return scope.ordinalColorScale(d.key); });

		    scope.legend.append("text")
			     .attr("x", 24)
		  	     .attr("y", 9)
		  	     .attr("dy", ".35em")
			     .text(function(d) { return d.categ; }); 
				
			}
				
		
		}
	scope.init=function(){
	
	 //initialization,when passing by the tag	

	//create the graph				
	 plot.call(scope.chart, {
		data: scope.data, // data source
		axis:{
			x: scope.xAxis,
			y: scope.yAxis
		},
		gridlines: scope.yGridlines,
		initialize:true            //$scope.on
	});		
	}
   scope.$on("refreshChart", function(event, logs) {
	   /*
			:params:event: listener,when refreshChart,here when the button of the form is clicked
			:params:logs: updated data to pass to update the graph
			:params:logs:type:Array
	   */
	   //draw the new graph
	   plot.call(scope.chart, {
		data: logs, // data source
		axis:{
			x: scope.xAxis,
			y: scope.yAxis
		},
		gridlines: scope.yGridlines,
		initialize:false
	});
   });	
	scope.init();
	}
 };
}

