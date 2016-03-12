process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/lib/express'),
    mongoose = require('./config/lib/mongoose'),
    passport = require('./config/lib/passport');

var db = mongoose();
var app = express();
var passport = passport();

if (module === require.main) {
    var server = app.listen(process.env.PORT || 3000, function () {
        var host = server.address().address;
        var port = server.address().port;

        console.log('App listening at http://%s:%s', host, port);
    });
}

module.exports = app;
