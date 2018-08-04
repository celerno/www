function rand(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
function muevanse(){
$('.post').each(function(ix, e){
    $(e).css('top',rand(screen.height));
    $(e).css('left', rand(screen.width));
});
$('.post').draggable(draggableOptions).click(function(){$(this).toggleClass('selected')});
}

//https://stackoverflow.com/a/5679450/335905
var selectedObjs;
var draggableOptions = {
    start: function(event, ui) {
        //get all selected...
        if (ui.helper.hasClass('selected')) selectedObjs = $('div.selected');
        else {
            selectedObjs = $(ui.helper);
            $('div.selected').removeClass('selected')
        }
    },
    drag: function(event, ui) {
        var currentLoc = $(this).position();
        var prevLoc = $(this).data('prevLoc');
        if (!prevLoc) {
            prevLoc = ui.originalPosition;
        }

        var offsetLeft = currentLoc.left-prevLoc.left;
        var offsetTop = currentLoc.top-prevLoc.top;

        moveSelected(offsetLeft, offsetTop);
        $(this).data('prevLoc', currentLoc);
    }
};



function moveSelected(ol, ot){
    console.log("moving to: " + ol + ":" + ot);
    selectedObjs.each(function(){
        $this =$(this);
        var p = $this.position();
        var l = p.left;
        var t = p.top;
        console.log({id: $this.attr('id'), l: l, t: t});


        $this.css('left', l+ol);
        $this.css('top', t+ot);
    })
}
//https://stackoverflow.com/a/26626971/335905
function meteOtro(texto){
    $('#posts').append($('<div class="post"><div class="title">'+getTime()+'</div>'+'<div class="text">'+texto+'</div></div>'));
    muevanse();
}
muevanse();
//Utils.js
function getTime(){
	date = new Date();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	//date
	var month = date.getMonth() + 1;
	var year = date.getFullYear();
	var day = date.getDate();
	return  year + '-' + n2(month) + '-' + n2(day) + '-' + n2(hours) + ':' + n2(minutes) + ':' + n2(seconds);
}
function n2(n){
	return n>9?n:'0'+n;
}