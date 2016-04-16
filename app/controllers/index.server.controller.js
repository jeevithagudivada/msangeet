// Invoke 'strict' JavaScript mode
'use strict';

// Recommender module - can get data pertaining to user's posts, photos etc
var recommender = require('./recommender.server.controller');
// Searching module - can search for a query of a type in Facebook.
var search = require('./search.server.controller');
// This module is used to encode the query if there are any spaces.
var urlencoder = require('urlencode');

// Create a new 'render' controller method
exports.render = function (req, res)
{
    // Use the 'response' object to render the 'index' view with a 'title' and a stringified 'user' properties
    console.log('index controller');
    console.log(req.user);

    if (req.user != undefined)
    {
        recommender.getUserPhoto(req.user);
        recommender.getUserFeed(req.user);

        var query = 'prince of persia';
        search.searchFB(req.user, urlencoder(query), 'group');

        recommender.getFriendsList(req.user);

        recommender.getUserLikes(req.user);
        recommender.getUserProfile(req.user);

        res.render('app', {
            // Set the page title variable
            title: 'mSangeet',
            user: req.user,
            messages: req.flash('error') || req.flash('info')
        });
    } else
    {
        console.log('user has not logged in');
        res.render('index', {
            title: 'Welcome to mSangeet',
            messages: req.flash('error') || req.flash('info')
        });
    }
};
