'use strict';

var config = require('../config'),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    flash = require('connect-flash'),
    session = require('express-session'),
    passport = require('passport'),
    cookieParser = require('cookie-parser');

module.exports = function ()
{
    var app = express();

    if (process.env.NODE_ENV === 'development')
    {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production')
    {
        app.use(compress());
    }
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(methodOverride());

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 86400000
        },
        store: new session.MemoryStore()
    }));

    app.use(flash());

    app.use(passport.initialize());
    app.use(passport.session());

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    require('../../app/routes/index.server.routes.js')(app);
    require('../../app/routes/user.server.routes.js')(app);

    app.use(express.static('./public'));

    return app;
};
