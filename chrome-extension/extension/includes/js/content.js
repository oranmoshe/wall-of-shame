


function lightWords(){
	var xhr = new XMLHttpRequest;
	xhr.open("GET", chrome.runtime.getURL("words.json"));
	xhr.onreadystatechange = function() {
	  if (this.readyState == 4) {
	    console.log("request finished, now parsing");
	    window.json_text = xhr.responseText;
	    window.parsed_json = JSON.parse(xhr.responseText);
	    var words_list = {};
      	var offensive_counter = 0;
	    $.each( window.parsed_json, function( key, val ) {
  	 		$("body *").replaceText(val.word, '<a href=\"https://he.wikipedia.org/wiki/%D7%90%D7%9C%D7%99%D7%9E%D7%95%D7%AA_%D7%A0%D7%92%D7%93_%D7%A0%D7%A9%D7%99%D7%9D\" style="color: red;">'+val.word+'</a>', function(data){  	 			
  	 			offensive_counter+=data;
  	 			if(words_list[val.word] == null)
  	 				words_list[val.word] = 0;
  	 			words_list[val.word] += data;
  	 		});	 	  	 		
	    });
	    var shown_words_list = {};
	    // select shown words only
	    for(var v in words_list){
	    	if(words_list[v] != 0)
	    		shown_words_list[v] = words_list[v];
	    }
      
      	chrome.runtime.sendMessage({offensive_counter: offensive_counter}, function(response) {
		  console.log(response.farewell);
		});
        chrome.runtime.sendMessage({set_shown_words_list: shown_words_list}, function(response) {
		  console.log(response.farewell);
		});
	  }
	};
	xhr.send();
}

$(document).ready(function(){
	lightWords();
});