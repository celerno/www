var express = require('express');
var mixte = express.Router();

mixte.get('/mixte',function(req, res, next){
	res.render('mixte', { title:'chamizo.org - Proyectos - Blog mixte' } );
});
module.exports = mixte;
