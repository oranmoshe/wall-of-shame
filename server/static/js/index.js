
var data = "";
var COLOR_DOMINANT = "";
var COLOR_1 = "";
var COLOR_2 = "";
var COLOR_3 = "";
var COLOR_4 = "";
var COLOR_5 = "";
var COLOR_6 = "";
var COLOR_7 = "";
var COLOR_8 = "";
var COLOR_9 = "";
var QUOT = null;
var ICON = null;
var IMAGE = null;
var CREDIT = null;

function run(){
	var vocabulary = ["car","dog","sun"];
	var index = 0;
	generateCommercial(vocabulary[index++]);
	setInterval(function(){
		if(index==vocabulary.length)
			index=0;
		generateCommercial(vocabulary[index++]);
	}, 20000);

}

$(document).ready(function(){
	$('#submit').click(function init(){
		generateCommercial($('#term').val());
	});
});

function generateCommercial(term){
	$.getJSON('https://yale-oran-moshe.herokuapp.com/product/'+ term +'?callback=non', 
	function(json) {
		if(json["image_url"]!=""){
  			imageColors(json["image_url"]);
		}else{
			imageColors('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?dpr=2&auto=format&fit=crop&w=1500&h=1001&q=80&cs=tinysrgb&crop=');
		}
		$(QUOT).html(json["quot"]) 
		$(ICON).html(json["icon_svg"])
		$(CREDIT).html(json["image_credit"])
	});
}

function imageColors(image_url){
	var colorThief = new ColorThief();
	colorThief.getColorsAsync(image_url,function(color, element){
		$(IMAGE).html(element);
		COLOR_DOMINANT = 'rgb('+color[0][0]+','+color[0][1]+','+color[0][2]+')';
		COLOR_1 = 'rgb('+color[1][0]+','+color[1][1]+','+color[1][2]+')';
		COLOR_2 = 'rgb('+color[2][0]+','+color[2][1]+','+color[2][2]+')';
		COLOR_3 = 'rgb('+color[3][0]+','+color[3][1]+','+color[3][2]+')';
		COLOR_4 = 'rgb('+color[4][0]+','+color[4][1]+','+color[4][2]+')';
		COLOR_5 = 'rgb('+color[5][0]+','+color[5][1]+','+color[5][2]+')';
		COLOR_6 = 'rgb('+color[6][0]+','+color[6][1]+','+color[6][2]+')';
		COLOR_7 = 'rgb('+color[7][0]+','+color[7][1]+','+color[7][2]+')';
		COLOR_8 = 'rgb('+color[8][0]+','+color[8][1]+','+color[8][2]+')';
		COLOR_9 = 'rgb('+color[9][0]+','+color[9][1]+','+color[9][2]+')';
        initElementsColors();
	});
}


