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
    console.log(req.teachers);

    //search logic

    //    res.json(req.);
};

exports.listTeachers = function (req, res, next) {
    var genre = req.body.genre;
    var medium = req.body.medium;
    User.aggregate([
        {
            $match: {
                $and: [
                    {
                        personas: {
                            $elemMatch: {
                                $eq: "Guru"
                            }
                        }
                    },
                    {
                        teaching: {
                            $elemMatch: {
                                "musicForm.genre": req.body.genre,
                                "musicForm.medium": req.body.medium
                            }
                        }
                        }
                    ]
            }
            }, {
            $project: {
                _id: 0,
                firstName: 1,
                lastName: 1,
                username: 1,
                profilePhoto: 1,
                teaching: 1
            }
        }
    ]).exec(function (err, results) {
        if (err) throw err;
        var teachers = [];
        console.log(results);
        for (var i = 0; i < results.length; ++i) {
            var teacher = results[i];
            var doc = {
                name: teacher.firstName + " " + teacher.lastName
            };
            for (var _class in teacher.teaching) {
                if (_class.musicForm.genre == req.body.genre && _class.musicForm.medium == req.body.medium) {
                    doc["location"] = _class.musicForm.location;
                }
            }
            teachers.push(doc);
        }

        console.log("line 74");
        console.log(teachers);
        req.teachers = [{
            name: "VK",
            username: "vkumar",
            location: {
                "locationName": "Race Course Road, Bangalore",
                "latitute": "12.96181949",
                "longitude": "77.61596739"
            }
        }];
        next();
    });
}
