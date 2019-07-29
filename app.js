var express = require('express');
var connect = require('connect');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db     = require('./db');
var post_model = mongoose.model('cmd');
var routes = require('./routes/index');
var vhost = require('vhost');
var app = express();
var middle = connect();
var serveStatic = require('serve-static');
//use vhosts
// view engine setup
app.use(vhost('coolbox.com.mx', serveStatic('/home/coolbox_access/www/')));
app.use(vhost('*.coolbox.com.mx', serveStatic('/home/coolbox_access/www/')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// uncomment after placing your favicon in /public
middle.use(vhost('coolbox.com.mx', function(req, res, next){if(!req.secure){res.redirect(301, 'https://'+req.headers.host+req.url);}next();}));
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

middle.use(vhost('chamizo.pro', function (req, res, next) {
	if(!req.secure){
		res.redirect(301,'https://' + req.headers.host + req.url);
	}
	next();
})); 
middle.use(vhost('*.chamizo.pro', function (req, res, next) {
	if(!req.secure){
		res.redirect(301,'https://' + req.headers.host + req.url);
	}
	next();
})); 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);


// catch 404 and forward to error handler
app.use(vhost('chamizo.pro', function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
}));

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(vhost('chamizo.pro', function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  }));
}

// production error handler
// no stacktraces leaked to user
app.use(vhost('chamizo.pro', function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
}));


module.exports = app;
