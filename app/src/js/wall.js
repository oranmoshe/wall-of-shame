var names = ["oran","mark","steven","oran3","mark","steven"];
var dataset = [ 5, 10, 15 ];
var dataset2 = [ 3, 2, 15, 1, 2 ];
var dataset3 = [ 3, 2, 3, 1, 2 ];
var dataset4 = [ 3, 2, 3, 1, 2 ];
var counter = 0;
var counter2 = 0;
var db = [];
db.push(dataset2);
db.push(dataset3);
db.push(dataset4);

function init(){
	getData();
}

function getData(){
	// Assign handlers immediately after making the request,
	// and remember the jqxhr object for this request
	var jqxhr = $.getJSON( "http://nashim.herokuapp.com/getAllPosts", function() {
	  console.log( "success" );
	})
	  .done(function(data) {
	  	draw(data)
	  })
	  .fail(function() {
	    console.log( "error" );
	  })
	  .always(function() {
	    console.log( "complete" );
	  });
}

function draw(dataset){
	d3.select("main").selectAll("section")
		.data(dataset)
		.enter()
		.append("section")
		.attr("class", "column")
		.selectAll("div")
		.data(function(){
			var arr = [];
			for (var i = dataset[counter]["comments"].length - 1; i >= 0; i--) {
				var comment_content = dataset[counter]["comments"][i]["comment_content"];
				var comment_name = dataset[counter]["comments"][i]["comment_name"];
				var comment_pic = dataset[counter]["comments"][i]["comment_pic"];
				var offensive = dataset[counter]["comments"][i]["offensive"];
				arr.push({size:2,comment_content:comment_content,comment_name:comment_name,comment_pic:comment_pic,offensive:offensive});
			}
			counter++
			return arr ;
		})
		.enter()
		.append("div")
		.attr("data-name",function(d){
			if(counter2==names.length)
				counter2 =0;
			return d.comment_content;
		} )
		.attr("class", "row")
		.style("height", function(d) {
			var barHeight = d.size * 5;
			return barHeight + "px";
		})
		.style("background-color", function(d) {
			if(d.offensive)
				return "red";
			return "blue";
		});

		$('div.row').bind('mouseenter',function(e){
			var el = $(e.target);
			$('.popup').html('<h1>' + $(el).attr("data-name") +'</h1>')
			.css("display","block")
			.css("top",function(){
				return $(el).position().top+20;
			})
			.css("left",function(){
				return $(el).position().left+20;
			});
		});

		$('div.row').bind('mouseleave',function(e){

				$('.popup').css("display","none");

		});
}
