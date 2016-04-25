<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Learning D3</title>
	<link rel="stylesheet" href="main.css">
	<script  type="text/javascript" src="d3.min.js"></script>
</head>
<body>
<!--Place all DOM elements here -->
<script>
var w = 800;
var h = 450;
var margin = {
	top: 58,
	bottom: 100,
	left: 80,
	right: 40
};
var width = w - margin.left - margin.right; //boundaries of chart
var height = h - margin.top - margin.bottom;//
//var data=[{key:"Simon",value=...},{...}] //key->value

var data = [132,71,337,93,78,43,20,16,30,8,17,21];
var x = d3.scale.ordinal()
      //ordinal->when nothing is comparing with each others,like names Simon,Natacha,etc..
		.domain([0,data.length]) //set the range of elements
		.range([height,0]); //scale the the height of the chart
		//.domain(data.map(function(entry){return entry.key;}))
		//.rangeBands ([0,height]):   ->range for ordinals 
		//console.log(y("cream"));->have the y value of cream on screen
var y = d3.scale.linear() // scale the data
		.domain([0,d3.max(data)]) // set the range of value //max(data,function(d){return d.value})->if working with key->value
		.range([0,width]); // scale to the width of the chart


var linearColorScale=d3.scale.linear()
                      .domain([0,data.length])
                       .range(["#572500","#F68026"]); //have different colors on the bars 
var ordinalColorScale=d3.scale.category20() //20 colors of ordinal scale      
var xAxis=d3.svg.axis()  
            .scale(x)  
            .orient("bottom"); //get the x-axis  
var yAxis=d3.svg.axis()  
            .scale(y)  
            .orient("left"); // get the y-axis     
 var yGridlines=d3.svg.axis()  
                  .scale(y)
                  .tickSize(-width,0,0)
                  .tickFormat("")
                  .orent("left");               
var svg = d3.select("body").append("svg") //select the body tag and had svg tag at the end of the body tag
			.attr("id", "chart") // set attr and value to it
			.attr("width", w)
			.attr("height", h);
var chart = svg.append("g")
			.classed("display", true) //<g class=display
			.attr("transform", "translate(" + margin.left + "," +  margin.top + ")"); //bars within the chart
			//transform allows us to move thr group ->move on the x,move on the y

function plot(params){
	this.append("g")
	    .call(params.gridlines)
	    .classed("gridline",true)
	    .attr("transform","translate(0,0)")
	this.selectAll(".bar") //select all the elements that have the bar class
		.data(params.data)
		.enter() //this represent what draw the bars
			.append("rect")
			.classed("bar", true)//true->add that class name,false,remove that class name (better than attr(class,..)->dd several classes
			.attr("x", function(d,i)){
				return x(d.key);
			}
			.attr("y", function(d,i){
				return y(i); //scale for the y
				//return y(d.value);->for ordinal
			})
			.attr("width", function(d){ // d=data i=index of the data
				return x.rangeBand(); //range of a band
			})
			.attr("height", function(d,i){
				return height-y(d.value);
			})
			.style("fill",function(d,i){
                  return linearColorScale(i); //get the bars to have different colors on it
                  //return ordinalColorScale(i); 
			         });
	this.selectAll(".bar-label")
		.data(params.data)
		.enter()
			.append("text")
			.classed("bar-label", true) 
			.attr("x",function(d,i){
				return x(d.key)+(x.rangeBand()/2)
			} )
			})
			.attr("dx", -4) //put the text 4 pixels before the end of the bar
			.attr("y", function(d,i){
				return y(i); //set thet text at the y of the y
				//return y(d.value);->for the text 
			})
			.attr("dy", -6)
			})
			.text(function(d,i){
				return d;    //d.value if key->value
			})
	this.append("g")//append add this element to the DOM
	     .classed("x axis",true);
	     .attr("transform","translate("+0+","+height+")")//x-axis at the bottom
	     .call(params.axis.x)//show the y-axis
	       .selectAll("Text")
	         .style("text-anchor","end")
	         .attr("dx",-8)
	         .attr("dy",8) 
	         .attr("transform","translate(0,0) rotate(-45)"); //rotate the text

	this.append("g")//append add this element to the DOM
	     .classed("y axis",true);
	     .attr("transform","translate(0,0)")//y-axis at the bottom
	     .call(params.axis.y); 
	this.select(".y.axis")
	     .append("text")
	     .attr("x",0)
	     .attr("y",0)
	     .style("text-anchor","middle")
	     .attr("transform","translate(-50,"+height/2+") rotate(-90)") //rotate the y-axis-label
	     .text("Units sold");
	this.select(".x.axis")
	    .append("text")
	    .attr("x",0)
	     .attr("y",0)
	     .style("text-anchor","middle")
	     .attr("transform","translate("+width/2+",80)") 
	    .text("Donut type"):

}
plot.call(chart, { //first arg is This in the function (svg),and the second is the argument params
	data: data, // data source
	axis:{
		x:xAxis,
		y:yAxis:
	},
	gridlines:yGridlines
});
</script>	
</body>
</html>

