process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('../config'),
    express = require('./express'),
    mongoose = require('./mongoose'),
    passport = require('./passport');

var db = mongoose();
var app = express();
var passport = passport();

module.exports.start = function start() {
    
}
app.listen(config.port);

console.log('Server running at http://localhost:3000/');