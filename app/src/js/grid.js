//function gridData() {
//	var data = new Array();
//	var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
//	var ypos = 1;
//	var width = 20;
//	var height = 20;
//	var click = 0;
//
//	// iterate for rows
//	for (var row = 0; row < 20; row++) {
//		data.push( new Array() );
//
//		// iterate for cells/columns inside rows
//		for (var column = 0; column < 45; column++) {
//			data[row].push({
//				x: xpos,
//				y: ypos,
//				width: width,
//				height: height,
//				click: click
//			})
//			// increment the x position. I.e. move it over by 50 (width variable)
//			xpos += width;
//		}
//		// reset the x position after a row is complete
//		xpos = 1;
//		// increment the y position for the next row. Move it down 50 (height variable)
//		ypos += height;
//	}
//	return data;
//}
//
//var gridData = gridData();
//
//// I like to log the data to the console for quick debugging
//
//console.log(gridData);
//
//var grid = d3.select("#grid")
//	.append("svg")
//	.attr("width","990px")
//	.attr("height","500px");
//
//var row = grid.selectAll(".row")
//	.data(gridData)
//	.enter().append("g")
//	.attr("class", "row");
//
//var column = row.selectAll(".square")
//    .data(function(d) { return d; })
//    .enter().append("rect")
//    .attr("class","square")
//    .attr("x", function(d) { return d.x; })
//    .attr("y", function(d) { return d.y; })
//    .attr("width", function(d) { return d.width; })
//    .attr("height", function(d) { return d.height; })
//    .style("fill", "f54f2e")
//    .style("stroke", "#fff");
////    .on('click', function(d) {
////       d.click ++;
////       if ((d.click)%4 == 0 ) { d3.select(this).attr("xlink:href", "http://www.e-pint.com/epint.jpg") }
////       if ((d.click)%4 == 1 ) { d3.select(this).style("fill","#2C93E8"); }
////       if ((d.click)%4 == 2 ) { d3.select(this).style("fill","#F56C4E"); }
////       if ((d.click)%4 == 3 ) { d3.select(this).style("fill","#838690"); }
////    });
$(document).ready(function() {

   var width = 36;
   var height = 28;
   for(var x = 0; x < 36; x++) {
       for(var y = 0; y < 28; y++) {
           var unit = $("<div class='unit'></div>");
           unit.appendTo('#container');
       }
   }
	setInterval(function(){
		var random = Math.floor((Math.random() * width*height-1) + 1);
		console.log(random);
    	var all = $('#container').children();
    	$(all).get(random)
    	var listItem = $('#container');
		$('#container :nth-child('+ random +')').css("background-color","#000000");
	}, 3000);

});