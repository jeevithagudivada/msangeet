var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User');

module.exports = function () {
    passport.use(new LocalStrategy(function (username, password, done) {
        User.findOne({
            username: username
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    error: 'Incorrect username or password.'
                });
            }
            if (!user.authenticate(password)) {
                console.log(user);
                return done(null, false, {
                    message: 'Invalid password'
                });
            }
            user.hasRegistered = false;
            return done(null, user);
        });
    }));
};
