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
	piensa:function(twitter, analisis){
		var piensa = [];

		twitter.get('search/tweets', {
				q: analisis.join(' '), 
			count: 10, result_type: 'recent', lang: 'es'}, 
			function(error, tweets, response) {
				if(!error){
   				piensa = tweets;
   				}
		});

		return piensa[0];
	},
	responde:function(pensamiento, analisis){
		/*
		var respuesta = pensamiento.filter(function(n) {
   		 return analisis.indexOf(n) === -1;
		});

		return respuesta.join(' ');*/
		return pensamiento;
	}
}