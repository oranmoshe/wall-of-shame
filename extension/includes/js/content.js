function lightWords(element,callback){
	var xhr = new XMLHttpRequest;
	xhr.open("GET", chrome.runtime.getURL("data/words.json"));
	xhr.onreadystatechange = function() {
	  if (this.readyState == 4) {
	    window.json_text = xhr.responseText;
	    window.parsed_json = JSON.parse(xhr.responseText);
	    var iterate_offensive_counter = 0;

	    $.each( window.parsed_json, function( key, val ) {
	    	// REPLACE TEXT
	    	var elementscount = 0;
  	 		$(element).replaceText(val.word, '<a href=\"https://he.wikipedia.org/wiki/%D7%90%D7%9C%D7%99%D7%9E%D7%95%D7%AA_%D7%A0%D7%92%D7%93_%D7%A0%D7%A9%D7%99%D7%9D\" style="color: red; display: inline;text-decoration: line-through;">'+val.word+'</a>', function(data){
  	 			// counters
  	 			offensive_counter+=data.length;
  	 			iterate_offensive_counter+=data.length;
  	 			elementscount++;
  	 			// count word
  	 			if(shown_words_list[val.word] == null)
  	 				shown_words_list[val.word] = 0;
  	 			shown_words_list[val.word] += data.length;
  	 			// add class to parent
  	 			for (var i = data.length - 1; i >= 0; i--) {
  	 				console.log($(data[i]).closest('.UFIComment'));
  	 				$(data[i]).closest('.UFIComment').addClass('CatchYou');
  	 			}
  	 			// last iterate
	 			if(key == window.parsed_json.length-1 && $(element).length == elementscount){
	 				if(iterate_offensive_counter>0){
	 					callback(true);
	 				}else{
	 					callback(false);
	 				}
	 			}
  	 		});
	    });
	  }
	};
	xhr.send();
}


var shown_words_list = {};
var offensive_counter = 0;
function updateExtension(){
    chrome.runtime.sendMessage({offensive_counter: offensive_counter}, function(response) {
	  console.log('updates amount' + response.farewell);
	});
    chrome.runtime.sendMessage({set_shown_words_list: shown_words_list}, function(response) {
	  console.log('updates shwon words' + response.farewell);
	});
}

function clearExtension(){
    chrome.runtime.sendMessage({offensive_counter: 0}, function(response) {
	  //console.log(response.farewell);
	});
    chrome.runtime.sendMessage({set_shown_words_list: {}}, function(response) {
	 // console.log(response.farewell);
	});
}


function makeJson(selector){
	console.log("make json..");
	var json = {};
	json['username'] = $(selector).find('h6 a , h5 a').html();
	json['userimg'] = $(selector).find('._38vo img').attr('src');
	json['posturl'] = $(selector).find('._5pcq').attr('href');
	json['userContent'] = $(selector).find('.userContent').html();
	var jsoncomments = [];
	var comments = $(selector).find('.UFIList .UFIComment');
	$(comments).each(function(index){
		var jsoncomment = {};
		if($(this).hasClass('CatchYou'))
			jsoncomment['offensive'] = true;
		else
			jsoncomment['offensive'] = false;
		jsoncomment['comment_name'] = $(this).find('.UFICommentActorName').text();
		var a = 'http://graph.facebook.com/';
		var b = '/picture?type=large';
		var image = a+getParameterByName("id",'http://'+$(this).find('.UFIImageBlockImage').attr('data-hovercard'))+b;
		jsoncomment['comment_pic'] = image;
		jsoncomment['comment_content'] = $(this).find('.UFICommentBody').text();
		jsoncomments.push(jsoncomment);
	});
	json['comments'] = jsoncomments;
	console.log(json);
	insertPost(json);
}

function insertPost(object){
	console.log("insert json..");
	$.ajax({
	    type: "POST",
	    url: "https://nashim.herokuapp.com/addPost",
	    // The key needs to match your method's input parameter (case-sensitive).
	    data: JSON.stringify(object),
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    success: function(data){
	    	console.log('Post: facebook post done!');
	    },
	    failure: function(errMsg) {
	        console.log('Post: facebook post faild!');
	    }
	});
 }

 function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function eachPost(selector, callback){
	console.log('eachPost')
	$(selector).each(function(){
		readPost($(this),callback);
	});
}


function readPost(selector,callback){
	var readPostIsOffensiveFound = false;
	lightWords( $(selector).find('.userContent').children(),function(data){
		if(data){
			readPostIsOffensiveFound = true;
		}
		console.log("first....");
	});
	var comments = $(selector).find('.UFIComment');
	$(comments).each(function(index){
		if(index+1 == comments.length){
			lightWords($(this).find('.UFICommentBody').children(),function(data){
				console.log("last....");
				if(data){
					readPostIsOffensiveFound = true;
				}
				console.log('answare: ' + readPostIsOffensiveFound)
				if(readPostIsOffensiveFound){
					callback(data);
				}
			});
		}else{
			lightWords($(this).find('.UFICommentBody').children(),function(data){
				console.log("middle");
				if(data){
					readPostIsOffensiveFound = true;
				}
			});
		}
		console.log("combdy: "+ $(this).find('.UFICommentBody').text());
	});
	console.log(comments);
}

$(document).ready(function(){

	$(document).on("click", ".userContentWrapper", function(e) {
		//console.log('hover:' + isHover);
		console.log('click, hover: ' + isHover);
		var posted = 0;
		var userContentWrapper = $(e.target).closest('.userContentWrapper');
		if(isHover){
			$(userContentWrapper).find("div").css('background-color','#ffeded');
			setTimeout(function(){
				readPost(userContentWrapper,function(isOffensiveFound){
								updateExtension();
								makeJson($(userContentWrapper));
								console.log("callback of scanning called..")
						});
			},5000);
		}
	});
/*
	setTimeout(function(){
		eachPost('.userContentWrapper',function(){updateExtension();});
	},5000);

	$(window).scroll(function() {
	    if($(window).scrollTop() + $(window).height() == $(document).height()) {
		   	setTimeout(function(){
		    	eachPost('.userContentWrapper',function(){updateExtension();});
		    },5000);
	   }
	});
*/

	var ctrlPressed = false;
	var isHover = false;
	$(window).keydown(function(evt) {
	  if (evt.which == 16) { // ctrl
	    ctrlPressed = true;
	    console.log('ctrl pressed!');

	    $('.userContentWrapper').bind('mouseover',function(e){
			if(ctrlPressed){
				var el = $(e.target).closest('.userContentWrapper');
				$(el).css('border','4px solid red');
				isHover = true;
			}
		}).bind('mouseleave',function(e){
			var el = $(e.target).closest('.userContentWrapper');
			$(el).css('border','1px solid');
			$(el).css('border-color','#e5e6e9 #dfe0e4 #d0d1d5');
			isHover = false;
		});
	  }
	}).keyup(function(evt) {
	  if (evt.which == 16) { // ctrl
	    ctrlPressed = false;
	    console.log('ctrl up!');
	  }
	});


});

