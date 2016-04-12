// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var User = require('mongoose').model('User'),
    TwilioUser = require('mongoose').model('TwilioUser'),
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
    var user = req.user;

    // Update the user fields
    user.userName = req.body.userName;
    user.firstName = req.body.firstName;
    user.latName = req.body.lastName;
    user.salutation = req.body.salutation;
    user.dateOfBirth = req.body.dateOfBirth;
    user.profilePhoto = req.body.profilePhoto;
    user.aboutSummary = req.body.aboutSummary;
    user.email = req.body.email;
    user.phoneNumber = req.body.phoneNumber;
    user.isChildUser = req.body.isChildUser;
    user.parentId = req.body.parentId;
    user.password = req.body.password;
    user.residenceLocation = req.body.residenceLocation;
    user.children = req.body.children;
    user.personas = req.body.personas;
    user.qualification = req.body.qualification;
    user.training = req.body.training;
    user.awards = req.body.awards;
    user.performances = req.body.performances;
    user.books = req.body.books;
    user.albums = req.body.albums;
    user.genresTaught = req.body.genresTaught;
    user.teachingMedium = req.body.teachingMedium;
    user.studentProfiles = req.body.studentProfiles;
    user.teaching = req.body.teaching;

    // Try saving the updated user
    user.save(function (err) {
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


function sendTwilioCode(req, res, next, phone_number) {
    var code = Math.floor(Math.random() * 10000);
    client.messages.create({
        to: phone_number, // get the phone number from the signup page
        from: "+16187900624",
        body: "Your  verification code is" + code, //+code 
        // mediaUrl: "http://farm2.static.flickr.com/1075/1404618563_3ed9a44a3a.jpg",  
    }, function (err, message) {
        if (err) {
            console.log("please give correct number");
        } else {
            console.log(message.sid);
            var user = new TwilioUser();
            user.phone = phone_number;
            user.verified = false;
            user.code = Math.floor(Math.random() * 10000);
            user.save(function (err, user_Saved) {
                if (err) {
                    throw err;
                } else {
                    console.log('saved');
                }
            });
        }
    });
}

function checkTwilioCode(req, res, next, phone_number, code) {
    var a = User.find({
        code: code
    }, function (err, user) {
        if (err) throw err;
        for (var i = 0; i < user.length; i++) {
            if (user[i].code == code) {
                console.log("user exists");
            } else {
                console.log("sry");
            }
        }
        // object of the user
        //console.log(user[1]);
        //user.end(user); how to display on webpage
    });
}

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
