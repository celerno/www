var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'chamizo.org' });
});

router.get('/mixe',function(req, res, next){
	res.render('mixe', {title:'chamizo.org - Proyectos - Blog mixte'});
});

router.get('/about', function(req,res,next){
	res.render('about', { title: 'chamizo.org - acerca de...'});
});

module.exports = router;
