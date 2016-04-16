// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var User = require('mongoose').model('User'),
    TwilioUser = require('mongoose').model('TwilioUser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});

var upload = multer({
    storage: storage
}, {
    limits: {
        fileSize: 102400
    }
}).single('userPhoto');

// Twilio Credentials 
var accountSid = 'AC55135cfe0b0aa15279ba5196abb00a69';
var authToken = '7b3a3369ad2c8bfa7f3fa018d55f786d';
//render the signup page

//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken);

// Create a new error handling controller method
var getErrorMessage = function (err) {
    // Define the error message variable
    var message = '';

    // If an internal MongoDB error occurs get the error message
    if (err.code) {
        switch (err.code) {
            // If a unique index error occurs set the message error
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
                // If a general error occurs set the message error
            default:
                message = 'Something went wrong';
        }
    } else {
        // Grab the first error message from a list of possible errors
        for (var errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }
    console.log(message);
    // Return the message error
    return message;
};


// Create a new controller method that renders the signup page
exports.renderSignup = function (req, res, next) {
    // If user is not connected render the signup page, otherwise redirect the user back to the main application page
    if (!req.user) {
        // Use the 'response' object to render the signup page
        res.render('signup', {
            // Set the page title variable
            title: 'Sign-up Form',
            // Set the flash message variable
            messages: req.flash('error')
        });
    } else {
        return res.redirect('/');
    }
};

// Create a new controller method that creates new user
exports.createChildUser = function (req, res, next) {
    // If user is not connected, create and login a new user, otherwise redirect the user back to the main application page

    // Create a new 'User' model instance
    var user = new User(req.body);
    console.log(user);
    var message = null;

    user.provider = 'local';
    user.hasRegistered = true;
    user.username = req.body.newusername;
    user.isChildUser = true;

    // Try saving the new user document
    user.save(function (err) {
        // If an error occurs, use flash messages to report the error
        if (err) {
            // Use the error handling method to get the error message
            var message = getErrorMessage(err);
            console.log('createChildUser failed')
            console.log(message);
            return res.json({
                faliure: ""
            })
        }
        return res.json({
            success: user
        });
    });
};

// Create a new controller method that creates new user
exports.createUser = function (req, res, next) {
    // If user is not connected, create and login a new user, otherwise redirect the user back to the main application page
    if (!req.user) {
        // Create a new 'User' model instance
        var user = new User(req.body);
        console.log(user);
        var message = null;

        user.hasRegistered = false;

        // Try saving the new user document
        user.save(function (err) {
            // If an error occurs, use flash messages to report the error
            if (err) {
                // Use the error handling method to get the error message
                var message = getErrorMessage(err);
                console.log('createUser failed')
                console.log(message);
                return res.redirect('/signup');
            }

            // If the user was created successfully use the Passport 'login' method to login
            req.login(user, function (err) {
                // If a login error occurs move to the next middleware
                if (err) return next(err);

                // Redirect the user back to the main application page
                return res.redirect('/');
            });
        });
    } else {
        return res.redirect('/');
    }
};

// Create a new controller method that renders the signup page
exports.renderSignup = function (req, res, next) {
    // If user is not connected render the signup page, otherwise redirect the user back to the main application page
    if (!req.user) {
        // Use the 'response' object to render the signup page
        res.render('signup', {
            // Set the page title variable
            title: 'Sign-up Form',
            // Set the flash message variable
            messages: req.flash('error')
        });
    } else {
        return res.redirect('/');
    }
};

// Create a new controller method that updates user profile
exports.updateUser = function (req, res, next) {
    // If user is not connected, create and login a new user, otherwise redirect the user back to the main application page
    if (!requser) {
        // Create a new 'User' model instance
        var user = new User(req.body);
        var message = null;

        // Try saving the updated user document
        //        user.update(function (err) {
        //            // If an error occurs, use flash messages to report the error
        //            if (err) {
        //                // Use the error handling method to get the error message
        //                var message = getErrorMessage(err);
        //                console.log(err);
        //                // Set the flash messages
        //                req.flash('error', message);
        //
        //                // Redirect the user back to the signup page
        //                return res.redirect('/signup');
        //            }
        //
        //            // If the user was created successfully use the Passport 'login' method to login
        //            req.login(user, function (err) {
        //                // If a login error occurs move to the next middleware
        //                if (err) return next(err);
        //
        //                // Redirect the user back to the main application page
        //                return res.redirect('/');
        //            });
        //        });
    } else {
        return res.redirect('/');
    }
};

// Create a new controller method that creates new 'OAuth' user
exports.saveOAuthUserProfile = function (req, profile, done) {
    // Try finding a user document that was registered using the current OAuth provider
    User.findOne({
        provider: profile.provider,
        providerId: profile.providerId
    }, function (err, user) {
        // If an error occurs continue to the next middleware
        if (err) {
            return done(err);
        } else {
            // If a user could not be found, create a new user, otherwise, continue to the next middleware
            if (!user) {
                // Set a possible base username
                var possibleUsername = profile.username || ((profile.email) ? profile.email.split('@')[0] : '');

                // Find a unique available username
                User.findUniqueUsername(possibleUsername, null, function (availableUsername) {
                    // Set the available user name 
                    profile.username = availableUsername;

                    // Create the user
                    user = new User(profile);

                    // Try saving the new user document
                    user.save(function (err) {
                        // Continue to the next middleware
                        return done(err, user);
                    });
                });
            } else {
                // Continue to the next middleware
                return done(err, user);
            }
        }
    });
};

// Create a new controller method for signing out
exports.signout = function (req, res) {
    // Use the Passport 'logout' method to logout
    req.logout();
    return res.redirect('/');
};

// Create a new controller middleware that is used to authorize authenticated operations 
exports.requiresLogin = function (req, res, next) {
    // If a user is not authenticated send the appropriate error message
    if (!req.isAuthenticated()) {
        return res.status(401).send({
            message: 'User is not logged in'
        });
    }

    // Call the next middleware
    next();
};

// Create a new controller method that retrieves a list of children
exports.listChildren = function (req, res) {
    User.find({
        _id: {
            $in: req.body.children
        }
    }, function (err, child) {
        if (err) {
            // If an error occurs send the error message
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            // Send a JSON representation of the article 
            res.json(child);
        }
    });
};

// Create a new controller method that returns an existing article
exports.read = function (req, res) {
    res.json(req.userDetails);
};

// Create a new controller method that updates an existing user
exports.update = function (req, res) {
    // Get the user from the 'request' object
    console.log(req.body);
    var user = req.body;
    console.log(user);
    user.hasRegistered = true;
    User.update({
        _id: mongoose.Types.ObjectId(user._id)
    }, user, function (err) {
        if (err) {
            // If an error occurs send the error message
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            // Send a JSON representation of the user
            res.send(user);
        }
    });
};

// Create a new controller method that delete an existing user
exports.delete = function (req, res) {
    // Get the user from the 'request' object
    var user = req.user;

    // Use the model 'remove' method to delete the user
    user.remove(function (err) {
        if (err) {
            // If an error occurs send the error message
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            // Send a JSON representation of the user 
            res.json(user);
        }
    });
};


// Create a new controller middleware that retrieves a single existing userDetails
exports.userByUsername = function (req, res, next, id) {
    // Use the model 'findById' method to find a single article 
    User.find({
        username: id
    }).exec(function (err, userDetails) {
        if (err) return next(err);
        if (!userDetails) return next(new Error('Failed to load article ' + id));

        // If an article is found use the 'request' object to pass it to the next middleware
        req.userDetails = userDetails[0];

        // Call the next middleware
        next();
    });
};


exports.sendTwilioCode = function (req, res, next) {
    var code = Math.floor(Math.random() * 10000);
    console.log(code);
    res.send("done");
    //    client.messages.create({
    //        to: "+919008661140",
    //        from: "+16187900624",
    //        body: "Your  verification code is" + code, //+code 
    //        // mediaUrl: "http://farm2.static.flickr.com/1075/1404618563_3ed9a44a3a.jpg",  
    //    }, function (err, message) {
    //        if (err) {
    //            console.log("please give correct number");
    //        } else {
    //            console.log(message.sid);
    //            var user = new TwilioUser();
    //            user.username = req.body.username;
    //            user.phone = req.body.phone;
    //            user.verified = false;
    //            user.code = code;
    //            user.save(function (err, user_Saved) {
    //                if (err) {
    //                    throw err;
    //                } else {
    //                    console.log('saved');
    //                    res.send();
    //                }
    //            });
    //        }
    //    });
}

exports.checkTwilioCode = function (req, res, next) {
    console.log(req.body.code);
    console.log(req.body.username);
    TwilioUser.findOne({
            username: req.body.username,
            code: req.body.code,
            verified: false
        },
        function (err, user) {
            if (err) {
                res.send({
                    "data": "failure"
                });
                throw err
            };
            console.log(user)
            if (user == null) {
                res.send({
                    "data": "failure"
                });
            } else {
                res.send({
                    "data": "success"
                });
            }
            TwilioUser.update({
                    username: req.body.username,
                    code: req.body.code,
                    verified: false
                }, {
                    $set: {
                        "verified": true
                    }
                },
                function (err, user) {
                    if (err) {
                        throw err
                    };
                    console.log(user);
                });
        });
};


exports.uploadPhoto = function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            //res.end(err);
            console.log(err);
            return res.send("Error uploading file.");
        }
        //res.send("File is uploaded");
    });
};
