
function  upperToLowerCase(){
   var text = $("#text").val();
   
   var loweredTExts = text.toLowerCase();
   $("#text").val(loweredTExts);
}

function  lowerToUpperCase(){
   var text = $("#text").val();
   var loweredTExts = text.toUpperCase();
   $("#text").val(loweredTExts);
}
function  removeSpaceAddHypen(){
   var text = $("#text").val();
   var convertedTExt = text.replace(/ /g, "-");
   $("#text").val(convertedTExt);   
}