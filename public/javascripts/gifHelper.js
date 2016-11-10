
var gifText = function(d, text){
    var gif = new GIF({
      workers: 1,
      quality: 1,
      background:'white',
      repeat:0,
      width: 400,
      height: 100,
      transparent:true
    });

    // add a image element
   
	/*
	ctx.fillText("I am the world'text",20,50);
    ctx.strokeText("I am the world'text",20,50);
    gif.addFrame(c, {delay:2000});
    */
    let size = 16;
    var chunks = text.length / size + ((text.length % size > 0) ? 1 : 0);
    var arr = new Array();

    for(var i = 0, j = 0, l = text.length; i < l; i += size, j++){
        arr.push(text.substring(i, Math.min(l, i + size)));
      }



  var cText = '';
	for (var i = 0; i < arr.length; i++) {
		
    let c = d.createElement('canvas');
    c.id='c';
    c.width = 400;
    c.height= 100;
   
    var ctx = c.getContext("2d");
    ctx.font = "30px Courier New";
    ctx.fillStyle = "#5a6372";
    ctx.strokeStyle = "#5a6372";
   
    ctx.fillText(arr[i],20 + ((size - arr[i].length) * 10), 50);
    ctx.strokeText(arr[i],20  + ((size- arr[i].length) * 10), 50);
    gif.addFrame(c, {delay:2000});
    if(i===(arr.length - 1)){
      let blank = d.createElement('canvas');
      gif.addFrame(blank, {delay:2000});
    }
  }

    gif.on('finished', function(img) {
        var render = d.getElementById('render');
        render.src=URL.createObjectURL(img);
    });
    gif.render();
//    d.body.appendChild(c);
//    d.body.appendChild(c2);

}
