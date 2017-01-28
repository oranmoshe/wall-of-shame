
function init(){
	getData();
}

function getData(){
	// Assign handlers immediately after making the request,
	// and remember the jqxhr object for this request
	var jqxhr = $.getJSON( "http://nashim.herokuapp.com/getPostsByUser/הצינור", function() {
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
	var counter = 0;
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
			return d.comment_content;
		})
		.attr("data-img",function(d){
			return d.comment_pic;
		})
		.attr("class", "row")
		.style("height", function(d) {
			var barHeight = d.size * 5;
			return barHeight + "px";
		})
		.style("background-color", function(d) {
			if(d.offensive)
				return "red";
			return "#FFAE61";
		});

		$('div.row').bind('mouseenter',function(e){
			var el = $(e.target);
			$('.popup').html('<h1>' + $(el).attr("data-name") +'</h1>')
			$('.popup').append('<img src="'+ $(el).attr("data-img") +'"">')
			.css("display","block")
			.css("top",function(){
				return $(el).position().top+170;
			})
			.css("left",function(){
				return $(el).position().left+870;
			});
		});

		$('div.row').bind('mouseleave',function(e){

				$('.popup').css("display","none");

		});
}
