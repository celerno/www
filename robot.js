module.exports={
	analiza:function(oracion){
	var separa = oracion.split(' ');
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
		analisis = analisis.join(' ');
		var respuesta = [];
		var palabras = pensamiento.split(' ');

			for(var j = 0; j<palabras.length;j++){
				if(analisis.toLowerCase().indexOf(palabras[j].toLowerCase()) === -1)
					respuesta.push(palabras[j]);
			}
		
		return respuesta.join(' ');
	}
}