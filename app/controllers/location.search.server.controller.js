// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var User = require('mongoose').model('User');

// Create a new controller method that computes search results
exports.searchGuru = function (req, res, next) {
    console.log('search controller');
    console.log(req.body.genre);
    console.log(req.body.medium);
    console.log(req.body.maxRadialDistance);
    console.log(req.body.resultCount);
    console.log(req.body.longitude);
    console.log(req.body.latitude);

    //search logic

    res.json({});
};

//get guru location from mongodb based on medium & genre & city
exports.listTeachers = function (req, res, next) {
    User.find({
        $and: [
            {
                Personas: {
                    "$in": ["Guru"]
                }
            },
            {
                $or: [

                    {
                        genre: {
                            $eq: req.body.genre
                        }
                    },
                    {
                        medium: {
                            $eq: req.body.medium
                        }
                    },
                    {
                        city: {
                            $eq: req.body.city
                        }
                    }
                ]
            }
        ]
    }, function (err, teacher) {
        if (err) {
            return next(err);
        } else {
            res.json(teacher);
        }
    });
};
