var config = require('../config')
    express = require('express');
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');
    session = require('express-session');
    passport = require('passport');

module.exports = function() {
    var app = express();
    
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    require('../../modules/core/app/routes/index.server.routes')(app);
    require('../../modules/core/app/routes/users.server.routes')(app);
    
    app.use(express.static('../../modules/core/public'));
    
    return app;
};