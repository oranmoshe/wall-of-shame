
 // On tab changes
chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function (tab) {
        	update_badge(get_tab_counter(activeInfo.tabId));
    });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // offensive counter
    if (request.offensive_counter != null){
      tabs_counters[sender.tab.id] = String(request.offensive_counter);
      update_badge(request.offensive_counter);
      sendResponse({farewell: '<<<<counter>>>>:'+request.offensive_counter});
    }

    if (request.set_shown_words_list != null){
      tabs_words_list[sender.tab.id] =  request.set_shown_words_list;
      sendResponse({farewell: '<<<<words>>>>: '+ sender.tab.id +': '+update_amounts(sender.tab.id)});
    }

    if (request.get_shown_words_list != null){
      sendResponse({farewell: get_tabs_words_list(request.get_shown_words_list)});
    }



  });


var tabs_counters = {};
var tabs_words_list = {};

function get_tab_counter(tab_id){
 	return tabs_counters[tab_id];
 }

function get_tabs_words_list(tab_id){
  return tabs_words_list[tab_id];
 }

function update_amounts(tab_id){
  var words = "";
  $.each(tabs_words_list[tab_id], function(k, v) {
      //display the key and value pair
      if(v>0)
      update_amount(k,v);
  });
  return words;
}


function update_amount(word,amount){
  var http = new XMLHttpRequest();
  var url = "https://nashim.herokuapp.com/updateamount";
  var params = 'word='+word+'&amount='+amount;
  http.open("POST", url, true);

  //Send the proper header information along with the request
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  http.onreadystatechange = function() {//Call a function when the state changes.
      if(http.readyState == 4 && http.status == 200) {
          console.log('post success')
      }
      else{
          console.log('error')
      }
  }
  http.send(params);
 }

 function update_badge(counter){
 	if(counter>0){
 		chrome.browserAction.setBadgeBackgroundColor({ color: '#343434' });
 		chrome.browserAction.setBadgeText({text: String(counter)});
 	}
 	else
    	clear_badge();
 }
 function clear_badge(){
 	chrome.browserAction.setBadgeText({text: ""});
 }

