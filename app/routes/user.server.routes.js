// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var user = require('../../app/controllers/user.server.controller'),
    passport = require('passport');

// Define the routes module' method
module.exports = function (app) {
    // Set up the 'signup' routes 
    app.param('username', user.userByUsername);
    app.route('/api/user')
        //        .get(user.list)
        .post(user.createChildUser);
    //
    //    app.route('/api/user/create')
    //        .post(user.create);
    //
    app.route('/api/user/:username')
        .get(user.read)
        .put(user.update);
    //        .put(user.requiresLogin, user.hasAuthorization, user.update);
    //
    //    app.param('username', user.userByUSERNAME);
    //
    //    // Set up the 'signin' routes

    // Set up the 'articleId' parameter middleware   

    var isLoggedIn = function (req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.send({
                msg: 'Please login to access this information'
            }, 400);
        }
    };

    //    app.route('/signup')
    //        .get(user.renderSignup)
    //        .post(user.signup);

    app.route('/auth/local')
        .post(
            passport.authenticate('local'),
            function (req, res) {
                res.redirect('/');
            }
        );

    app.get('/api/session', isLoggedIn, function (req, res) {
        res.send({
            loginStatus: true,
            user: req.user
        });
    });

    app.post('/api/photo', user.uploadPhoto);
    app.post('/api/verification/create', user.sendTwilioCode);
    app.post('/api/verification/check', user.checkTwilioCode);


    // Set up the Twitter OAuth routes
    app.get('/oauth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/'
    }));

    app.get('/oauth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/',
        successRedirect: '/'
    }));

    // Set up the Facebook OAuth routes
    app.get('/oauth/facebook', passport.authenticate('facebook', {
        failureRedirect: '/'
    }));

    app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/',
        successRedirect: '/'
    }));

    // Set up the Google OAuth routes
    app.get('/oauth/google', passport.authenticate('google', {
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ],
        failureRedirect: '/'
    }));
    app.get('/oauth/google/callback', passport.authenticate('google', {
        failureRedirect: '/',
        successRedirect: '/'
    }));

    // Set up the 'signout' route
    app.get('/signout', user.signout);
};
