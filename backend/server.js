var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongooseConnection = require('./db/dbconnect').connection;
// var morgan = require('morgan');

app.use(session({
	secret: 'sessionsecretsessionsecret',
	resave: true,
	saveUninitialized: true,
	store: new MongoStore({
		mongooseConnection: mongooseConnection
	})
}));

// app.use(morgan('combined'));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

var staticPath = path.normalize(__dirname + '/../public');
app.use(express.static(staticPath));

staticPath = path.normalize(__dirname + '/../bower_components');
app.use('/bower_components', express.static(staticPath));

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

var routes = require('./routes/api/routes')(app);
var viewRoutes = require('./routes/view/routes')(app);

var server = app.listen(4099);

module.exports = app;