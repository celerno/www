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
router.get('/contact',function(req,res,next){
	res.render('contact',{title:'chamizo.org - contacto'});
});
router.get('/ruidos', function(req,res,next){
	res.render('sonidos', { title: 'chamizo.org - biblioteca pública de ruidos de ciudad...'});
});

module.exports = router;
