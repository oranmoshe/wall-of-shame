function lightWords(element){
	var xhr = new XMLHttpRequest;
	xhr.open("GET", chrome.runtime.getURL("data/words.json"));
	xhr.onreadystatechange = function() {
	  if (this.readyState == 4) {
	    console.log("request finished, now parsing");
	    window.json_text = xhr.responseText;
	    window.parsed_json = JSON.parse(xhr.responseText);
	    var iterate_offensive_counter = 0;
	    $.each( window.parsed_json, function( key, val ) {
	    	// REPLACE TEXT
  	 		$(element).replaceText(val.word, '<a href=\"https://he.wikipedia.org/wiki/%D7%90%D7%9C%D7%99%D7%9E%D7%95%D7%AA_%D7%A0%D7%92%D7%93_%D7%A0%D7%A9%D7%99%D7%9D\" style="color: red; display: inline;text-decoration: line-through;">'+val.word+'</a>', function(data){
  	 			// counters
  	 			offensive_counter+=data.length;
  	 			iterate_offensive_counter+=data.length;
  	 			// count word
  	 			if(shown_words_list[val.word] == null)
  	 				shown_words_list[val.word] = 0;
  	 			shown_words_list[val.word] += data.length;
  	 			// add class to parent
  	 			for (var i = data.length - 1; i >= 0; i--) {
  	 				console.log($(data[i]).closest('.UFIComment'));
  	 				$(data[i]).closest('.UFIComment').addClass('CatchYou');
  	 			}
  	 			// at last make json and updateExtension
  	 			if(key == window.parsed_json.length-1){
  	 				updateExtension();
  	 				if(iterate_offensive_counter>0)
  	 				makeJson($(element).closest('.userContentWrapper'));
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
	  //console.log(response.farewell);
	});
    chrome.runtime.sendMessage({set_shown_words_list: shown_words_list}, function(response) {
	 // console.log(response.farewell);
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
		jsoncomment['comment_pic'] = $(this).find('.UFIActorImage').attr('src');
		jsoncomment['comment_content'] = $(this).find('.UFICommentBody').text();
		jsoncomments.push(jsoncomment);
	});
	json['comments'] = jsoncomments;
	json = JSON.stringify(json);
	insertPost(json);
	console.log(json);
}

function insertPost(json){
  var http = new XMLHttpRequest();
  var url = "https://nashim.herokuapp.com/addPost";
  http.open("POST", url, true);

  //Send the proper header information along with the request
  http.setRequestHeader("Content-type", "application/json");

  http.onreadystatechange = function() {//Call a function when the state changes.
      if(http.readyState == 4 && http.status == 200) {
          console.log('post success')
      }
      else{
          console.log('error')
      }
  }
  http.send(JSON.stringify(json));
 }

$(document).ready(function(){

	setTimeout(function(){
		eachPost('.userContentWrapper');
	},5000);

	$(window).scroll(function() {
	    if($(window).scrollTop() + $(window).height() == $(document).height()) {
		   	setTimeout(function(){
		    	eachPost('.userContentWrapper');
		    },5000);
	   }
	});

	$('body').click(function(e){
		var el = $(e.target).closest('.userContentWrapper');
   		console.log('start scan this..');
   		setTimeout(function(){
   			readPost($(el));
   		},5000);


	});

	function eachPost(selector){
		console.log('eachPost')
		$(selector).each(function(){
			readPost($(this));
		});
	}

	function readPost(selector){
		var username = $(selector).find('h6 a , h5 a').html();
		var userimg = $(selector).find('._38vo img').attr('src');
		var posturl = $(selector).find('._5pcq').attr('href');
		var userContent = $(selector).find('.userContent').html();
		lightWords( $(selector).find('.userContent').children());
		//console.log('user: '+ username + '\n img: ' + userimg
		//	+ '\n url: ' + posturl + '\n userContent: ' + userContent);

		var comments = $(selector).find('.UFIList .UFIComment');
		$(comments).each(function(index){
			var comment_name = $(this).find('.UFICommentActorName').text();
			var comment_pic = $(this).find('.UFIActorImage').attr('src');
			var comment_content = $(this).find('.UFICommentBody').text();
			lightWords($(this).find('.UFICommentBody').children());
			//console.log('comment_name: '+ comment_name + '\n comment_pic: ' + comment_pic
			//	+ '\n comment_content: ' + comment_content);
		});
	}






});

