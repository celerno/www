module.exports={
	analiza:function(oracion){
	var separa = oracion.indexOf(' ') === -1? [] : oracion.split(' ');
	if(separa.length===[])
		separa[0] = oracion;
	
	var analisis = [];
	var palabra = new RegExp('\\w+');

		for(var i=0; i<separa.length;i++){
			if(palabra.test(separa[i]))
				analisis.push(separa[i]);
		}

		return analisis;
	},
	piensa:function(twitter, analisis, responder){
		twitter.get('search/tweets', {
				q: '"' + analisis.join(' ') + '" -@ -RT', 
				count: 10, result_type: 'recent', lang: 'es'
				}, 
				function(error, tweets) {
				if(!error){
						if(tweets.statuses.length>1)
   						{
   							for (var i = 0; i < tweets.statuses.length; i++) {
   								if(tweets.statuses[i].text.split(' ').length > analisis.length){
   									responder(tweets.statuses[i].text, analisis);
   									break;
   								}
   							}
   						}
   						else{
   							responder('no encontré qué responder... ', analisis);
   						}
   				}
		});

	},
	responde:function(pensamiento, analisis){
		console.log(pensamiento);
		console.log(analisis);
		var lastW = analisis[analisis.length-1];
		analisis = analisis.join(' ');
		var respuesta = [];
		var palabras = pensamiento.split(' ');
		
		var go = false;

			for(var j = 0; j<palabras.length && respuesta.length < 5;j++){
				var arroba = /(@|http)\w+/;

				if(palabras[j].toLowerCase() === lastW.toLowerCase())
					go = true;

				if(arroba.test(palabras[j]) === false){
					if(analisis.toLowerCase().indexOf(palabras[j].toLowerCase()) === -1 && go)
						respuesta.push(palabras[j]);
				}
			}
		
		return respuesta.join(' ');
	}
}
