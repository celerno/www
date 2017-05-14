var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db 		 = require('../db');
var cmd = mongoose.model('cmd');
var date 	 = new Date();
var TwitterPackage = require('twitter');
var secret = {
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret
};
var tclient = new TwitterPackage(secret);
var robot = require('../robot.js');

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
router.get('/hablapormi', function(req,res,next){
	res.render('hablapormi', { title: 'chamizo.org - bot para tuiter que todavía no tiene función'});
});
router.get('/caracol', function(req,res,next){
	res.render('caracol', { title: 'chamizo.org - caracol'});
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

	//console.log(newCmd);
	next();
});
router.post('/enlace', function(req, res, next){
	
	try{
		if(req.body.text !==undefined && req.body.text.length>1){
			var analisis = robot.analiza(req.body.text);

	        robot.piensa(tclient, analisis, function(pensamiento, analisis){

		        var respuesta = robot.responde(pensamiento, analisis);

		        res.send(respuesta);
		        next();
		        });
    	}
	}
	catch(error){
		console.log(error.message);
		res.send('adios hubo un error');
	}
});
router.post('/tuit', function(req, res, next){
	try{
	
  	var tuit = req.body.text;
  	console.log('tuit: ' +tuit);
  	tuit = (tuit.length>127? tuit.substring(0,127): tuit) + ' - #hablapormí';

  	tclient.post('statuses/update', {status: tuit},  function(error, tweet, response){
		if(error){
			    console.log(error);
			  }
			  else{
				//console.log(tweet);  // Tweet body.
			  	//console.log(response);  // Raw response object.
			  }
		});
  }
  catch(error){
		console.log(error.message);
  }
  next();
});


module.exports = router;
