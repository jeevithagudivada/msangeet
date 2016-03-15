// Invoke 'strict' JavaScript mode
'use strict';

// Create a new 'render' controller method
exports.render = function (req, res) {
    // Use the 'response' object to render the 'index' view with a 'title' and a stringified 'user' properties
    console.log('index controller');
    console.log(req.user);
    res.render('index', {
        title: 'Welcome to mSangeet'
    });
};
