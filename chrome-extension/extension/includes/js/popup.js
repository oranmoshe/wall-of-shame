document.addEventListener('DOMContentLoaded', function() {

	$(window).bind('load', function(){

		var query = { active: true, currentWindow: true };
		function callback(tabs) {
		  var currentTab = tabs[0]; // there will be only one in this array
		  console.log(currentTab.id); // also has methods like currentTab.id

		  chrome.runtime.sendMessage({get_shown_words_list: currentTab.id}, function(response) {
		  //console.log(response.farewell);
			appendWords(response.farewell);
		});
		}
		chrome.tabs.query(query, callback);

		function appendWords(words){
			for(var v in words){
				$('ul').append('<li>'+ v + ': '+ words[v] +'</li>');
			}
		}

	});

 }, false);
