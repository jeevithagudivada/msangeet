/**
 * Created by gauth_000 on 03-Apr-16.
 */
// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var passport = require('passport'),
    url = require('url'),
    TwitterStrategy = require('passport-twitter').Strategy,
    config = require('../config'),
    user = require('../../app/controllers/user.server.controller');

// Create the Twitter strategy configuration method
module.exports = function () {
    // Use the Passport's Twitter strategy
    passport.use(new TwitterStrategy({
            consumerKey: config.twitter.consumerKey,
            consumerSecret: config.twitter.consumerSecret,
            callbackURL: config.twitter.callbackURL,
            passReqToCallback: true
        },
        function (req, token, tokenSecret, profile, done) {
            // Set the user's provider data and include tokens
            var providerData = profile._json;
            providerData.token = token;
            providerData.tokenSecret = tokenSecret;

            // Create the user OAuth profile
            var providerUserProfile = {
                fullName: profile.displayName,
                username: profile.username,
                provider: 'twitter',
                providerId: profile.id,
                providerData: providerData
            };

            // Save the user OAuth profile
            user.saveOAuthUserProfile(req, providerUserProfile, done);
        }
    ));
};