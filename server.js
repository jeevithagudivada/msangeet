//var app = require('./config/lib/app');
//var server = app.start();
//
//module.exports = app;

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/lib/express'),
    mongoose = require('./config/lib/mongoose'),
    passport = require('./config/lib/passport');

var db = mongoose();
var app = express();
var passport = passport();

app.listen(3000);
module.exports = app;

console.log('Server running at http://localhost:3000/');