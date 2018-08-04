function rand(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
$('.post').each(function(ix, e){
    $(e).css('top',rand(screen.height));
    $(e).css('left', rand(screen.width));
});

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

$('.post').draggable(draggableOptions).click(function(){$(this).toggleClass('selected')});


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