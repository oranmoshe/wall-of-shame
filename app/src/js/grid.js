$(document).ready(function() {

   var width = 36;
   var height = 28;
   for(var x = 0; x < width; x++) {
       for(var y = 0; y < height; y++) {
           var unit = $("<div class='unit'></div>");
           unit.appendTo('#container');
       }
   }

   var images = ["https://scontent.fsdv1-1.fna.fbcdn.net/v/t1.0-1/p200x200/16194969_1423857557646916_4202594077164282223_n.jpg?oh=b1c55abd7509f033532b7a6918f33a0d&oe=591A0842"]
	setInterval(function(){
		var random = Math.floor((Math.random() * width*height-1) + 1);
		console.log(random);
    	var all = $('#container').children();
    	$(all).get(random)
    	var listItem = $('#container');
		$('#container :nth-child('+ random +')').css("background-image", 'url('+ images[0] +')' ).css("background-size", '20px' );
	}, 3000);

});
