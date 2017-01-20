var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db 		 = require('../db');
var cmd = mongoose.model('cmd');
var date 	 = new Date();


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

router.post('/cmd',function(req,res,next){
	//specific time
	  var hours = date.getHours();
	  var minutes = date.getMinutes();
	  var seconds = date.getSeconds();
	  //date
	  var month = date.getMonth() + 1;
	  var year = date.getFullYear();
	  var day = date.getDate();
	  var time = month + '/' + day + '/' + year + ' at ' + hours + ':' + minutes + ':' + seconds;


	  //Submitting to database
	  var newCmd = cmd({
	  	text: req.body.text,
	    sauce: req.get('User-Agent'),
	    date: time
	  });
	  newCmd.save();

	console.log(newCmd);
});
module.exports = router;
