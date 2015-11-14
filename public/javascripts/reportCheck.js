var index = $('.pi').html().split(",");
for(var i = 0; i<index.length ; i++){		
	$("tr:nth-child("+(parseInt(index[i])+2)+")").removeClass("warning").addClass("success");
}