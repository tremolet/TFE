body,html{
	margin: 0;
	padding: 0;
	font-family: "Arial", sans-serif;
	font-size: 0.95em;
	text-align: center;
}
#chart{
	background-color: #F5F2EB;
	border: 1px solid #CCC;
}
.bar{
	fill: purple; // color of the bars
	shape-rendering: crispEdges; // have nice spaces between bars
}
.bar-label{
	fill: #000;
	text-anchor:middle; //text put at the middle of the bars
	font-size: 24px;
}
.axis path,
.axis line{ //whether a path or a line will apply this 
	fill:none; //line disappear
	stroke:#000; //line black
    shape-rendering: crispEdges; //nice lines without blur
 }
 .gridline path,
 .gridline line {
  fill:none;
  stroke:#ccc;
  shape-rendering: crispEdges; //the grid lines
   }