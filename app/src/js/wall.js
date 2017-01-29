
function init(){
	setCategories();
}

function setCategories(){
	var categories = ["הצינור","(הצל) the shadow","וואלה! ספורט","וואלה! חדשות"];
	for (var i = 0; i < categories.length; i++) {
		$('main ul').append('<li><div class="data-title">'+ categories[i] +'</div><div class="data"></div></li>');
		getData(categories[i],i+1,function(data,children){
		    console.log('iterator=' + children);
			draw(data,'ul li:nth-child('+children+') .data');
		});


	}
}

function getData(username,children,callback){
	// Assign handlers immediately after making the request,
	// and remember the jqxhr object for this request
	var jqxhr = $.getJSON('http://nashim.herokuapp.com/getPostsByUser/'+username, function() {
	  console.log( "success" );
	})
	  .done(function(data) {
	  	callback(data,children);
	  })
	  .fail(function() {
	    console.log( "error" );
	  })
	  .always(function() {
	    console.log( "complete" );
	  });
}

function draw(dataset, selector){
	var counter = 0;
	d3.select(selector).selectAll("section")
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
			if(d.comment_content.length >150)
				barHeight = d.size * 5 * 2;
			return barHeight + "px";
		})
		.attr('data-offensive',function(d) {
			if(d.offensive)
				return "true";
			return "false"
		});

		$('div.row').bind('mouseenter',function(e){
			var el = $(e.target);
			if($(el).attr("data-offensive")=="true"){
				setTimeout(function() {
					$('.popup')
					.css('background-image','url('+ $(el).attr("data-img") +')')
					.css('background-size','100px')
					.css("display","block")
					.css("top",function(){
						return $(el).position().top+120;
					})
					.css("left",function(){
						return $(el).position().left-20;
					});
					getOffensiveWords($(el).attr("data-img"),function(data){
						$('.popup').append(data);
					})
				}, 1000);
			}
		});

		$('div.row').bind('mouseleave',function(e){

				$('.popup').css("display","none");

		});

		function getOffensiveWords(text,callback){
			var xhr = new XMLHttpRequest;
			xhr.open("GET", "data/words.json");
			xhr.onreadystatechange = function() {
			  if (this.readyState == 4) {
			    window.json_text = xhr.responseText;
			    window.parsed_json = JSON.parse(xhr.responseText);
			    $.each( window.parsed_json, function( key, val ) {

			    });
			  }
			};
			xhr.send();
		}
}
