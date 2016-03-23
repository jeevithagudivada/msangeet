// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var user = require('../../app/controllers/user.server.controller'),
    passport = require('passport');

// Define the routes module' method
module.exports = function (app) {
    // Set up the 'signup' routes 

    //    app.route('/api/user')
    //        .get(user.list)
    //        .post(user.create)
    //
    //    app.route('/api/user/create')
    //        .post(user.create);
    //
    //    app.route('/api/user/:username')
    //        .get(user.read)
    //        .put(user.requiresLogin, user.hasAuthorization, user.update)
    //
    //    app.param('username', user.userByUSERNAME);
    //
    //    // Set up the 'signin' routes
    var isLoggedIn = function (req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.send({
                msg: 'Please login to access this information'
            }, 400);
        }
    };
    app.route('/signup')
        //        .get(user.renderSignup)
        .get(user.signup)
        .post(user.signup);
    app.route('/api/auth/local')
        .post(
            passport.authenticate('local'),
            function (req, res) {
                res.json(req.user);
            }
        );
    app.get('/api/session', isLoggedIn, function (req, res) {
        res.send({
            loginStatus: true,
            user: req.user
        });
    });
    // Set up the Facebook OAuth routes 
    app.get('/oauth/facebook', passport.authenticate('facebook', {
        failureRedirect: '/'
    }));

    app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/',
        successRedirect: '/'
    }));

    // Set up the 'signout' route
    app.get('/signout', user.signout);
};
