module.exports={
	analiza:function(chingaderas){
	var analisis = {verbo:{args:''};
		for(c in chingaderas.split(' ')){
			analisis = isVerb(c) ? {verbo:verbo?verbo + c: c}
		}
	},
	piensa:function(analisis){

	},
	responde:function(pensamiento){

	}
}