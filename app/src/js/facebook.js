  	window.fbAsyncInit = function() {
    FB.init({
      appId      : '570335642980384',
      xfbml      : true,
      cookie: true, // This is important, it's not enabled by default
      version    : 'v2.8'
    });
    FB.AppEvents.logPageView();

      	var url = 'https://www.facebook.com/bar.amar.902';
	  	var identifier = url.substring(url.lastIndexOf("/"));
		var graphUrl = "https://graph.facebook.com" + identifier;
		var urlJsonData = getGraphData(graphUrl);
		//alert(graphUrl)
		function getGraphData(url){
			FB.api('/https://www.facebook.com/cnn?access_token=570335642980384|Dh8Ul7titaoSc3qEfuUH0jypMLA', function(response){
			  console.log(response);
			});
		}

  };
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
