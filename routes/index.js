var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var db 		 = require('../db');
var cmd = mongoose.model('cmd');
var blog = mongoose.model('blog');
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
  res.render('index', { title: 'chamizo.pro' });
});

router.get('/mixe',function(req, res, next){
	res.render('mixe', {title:'chamizo.pro - Proyectos - Blog mixte'});
});

router.get('/about', function(req,res,next){
	res.render('about', { title: 'chamizo.pro - acerca de...'});
});
router.get('/cielo', function(req,res,next){
	res.render('elcieloeselpasado', { title: 'chamizo.pro - el cielo es el pasado'});
});
router.get('/contact',function(req,res,next){
	res.render('contact',{title:'chamizo.pro - contacto'});
});
router.get('/ruidos', function(req,res,next){
	res.render('sonidos', { title: 'chamizo.pro - biblioteca pública de ruidos de ciudad...'});
});
router.get('/hablapormi', function(req,res,next){
	res.render('hablapormi', { title: 'chamizo.pro - bot para tuiter que todavía no tiene función'});
});
router.get('/caracol', function(req,res,next){
	res.render('caracol', { title: 'chamizo.pro - caracol'});
});
router.get('/marichuy', function(req,res,next){
	res.render('marichuy', { });
});
router.get('/blog', function(req,res,next){
	blog.find({title: { $gt: 0 }}, function(err, posts){
		res.render('blog', {posts:posts});
	});
});
router.get('/blog/posts', function(req,res,next){
	blog.find({title: { $gt: 0 }}, function(err, posts){
		res.render('posts', {posts:posts});
	});
});
router.post('/blog',function(req,res,next){
	  //Submitting to database
	  var newPost = blog({
	  	text: req.body.text,
		title: req.body.text.substring(0,12) + '...',
	    date: getTime(),
		sauce: req.get('User-Agent')
	  });
	  newPost.save();
	  //tuit into hablapormi
		var tuit = req.body.text;
		//console.log('tuit: ' +tuit);
		tuit = tuit.length>256 ? tuit.substring(0,256): tuit;
		tuit = tuit +'... chamizo.pro/blog';
		tclient.post('statuses/update', {status: tuit},  function(error, tweet, response){
			if(error){
					console.log(error);
				}
				else{
					//console.log(tweet);  // Tweet body.
					//console.log(response);  // Raw response object.
				}
			});

	//console.log(newCmd);
	next();
});

function getTime(){
	date = new Date();
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var seconds = date.getSeconds();
	//date
	var month = date.getMonth() + 1;
	var year = date.getFullYear();
	var day = date.getDate();
	return  year + '-' + n2(month) + '-' + n2(day) + '-' + n2(hours) + ':' + n2(minutes) + ':' + n2(seconds);
}
function n2(n){
	return n>9?n:'0'+n;
}
router.post('/cmd',function(req,res,next){
	  //Submitting to database
	  var newCmd = cmd({
	  	text: req.body.text,
	    sauce: req.get('User-Agent'),
	    date: getTime()
	  });
	  newCmd.save();

	//console.log(newCmd);
	next();
});
router.post('/diario',function(req,res,next){
	//Submitting to database
	var diario = diario({
	  name: req.body.diario.name,
	  password:req.body.diario.password,
	  fecha: req.body.diario.fecha,
	  sauce: req.get('User-Agent'),
	  date: getTime()
	});
	diario.save();
  //console.log(newCmd);
  next();
});
router.post('/diarioEntry',function(req,res,next){
	//Submitting to database
	var diario = diarioEntry({
	  name: req.body.diario.name,
	  password:req.body.diario.password,
	  fecha: req.body.diario.fecha,
	  
	  sauce: req.get('User-Agent'),
	  date: getTime()
	});
	diario.save();
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
  	tuit = tuit.length>260? tuit.substring(0,260): tuit;

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

router.get('/opendata', function(req, res, next){
	res.render('opendata', { title: 'tallermínimo de datos abiertos para periodismo.' });
});

module.exports = router;
