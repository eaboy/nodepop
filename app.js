'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var i18n = require('i18n');
var customErrors = require('./lib/customErrors');
const jwtAuth = require('./lib/jwtAuth');

require('dotenv').config();

var app = express();

const i18nOptions = {
	directory: './locals',
	defaultLocale: 'en',
	queryParameter: 'lang',
	register: global
};

i18n.configure(i18nOptions);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Connecting to database
require('./lib/connectMongoose');
require('./models/Ad');
require('./models/Tag');
require('./models/User');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
if (process.env.LOG_FORMAT !== 'nolog'){
	app.use(logger(process.env.LOG_FORMAT || 'dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(i18n.init);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/ads', jwtAuth(), require('./routes/api/ads'));
app.use('/api/tags', require('./routes/api/tags'));

const loginController = require('./routes/loginController');

// Usamos las rutas de un controlador
app.post('/api/authenticate', loginController.postLoginJWT);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error();
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	customErrors(err);
  
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
  
	res.status(err.status || 500);

	if (isAPI(req)) {
		res.json({ success: false, error: err.message });
		return;
	}  

	// render the error page
	res.render('error');
});

function isAPI(req) {
	return req.originalUrl.indexOf('/api') === 0;
}

module.exports = app;
