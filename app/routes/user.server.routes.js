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
//    app.route('/auth/local')
//        .post(passport.authenticate('local', {
//            successRedirect: '/',
//            failureRedirect: '/',
//            failureFlash: true
//        }));
//
//    // Set up the Facebook OAuth routes 
//    app.get('/oauth/facebook', passport.authenticate('facebook', {
//        failureRedirect: '/'
//    }));
//    app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
//        failureRedirect: '/',
//        successRedirect: '/'
//    }));
//
//    // Set up the 'signout' route
//    app.get('/signout', user.signout);
};
