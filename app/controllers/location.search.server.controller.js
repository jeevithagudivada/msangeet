// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var User = require('mongoose').model('User');

var closest_teachers = [];
var studentLocation = undefined;

var deg2rad = function (deg) {
    return deg * (Math.PI / 180);
};


var getDistance = function (lat1, lon1, lat2, lon2) {
    var R = 6371;
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
};


var measureDist = function (src, dest) {
    return getDistance(src[0], src[1], dest[0], dest[1]);
};


var sort = function () {
    closest_teachers.sort(function (a, b) {
        var distA = a["distance"],
            distB = b["distance"]
        if (distA < distB)
            return -1;
        if (distA > distB)
            return 1;
        return 0;
    });
};

var init = function (all_teachers, studentLocation, MRD, CLOSEST_TEACHERS_SIZE) {

    console.log(all_teachers);
    for (var i = 0; i < all_teachers.length; ++i) {
        all_teachers[i]['distance'] = measureDist(studentLocation, [
            all_teachers[i].location.latitute,
            all_teachers[i].location.longitude
        ]);
        console.log('MRD', MRD);
        console.log('distance', all_teachers[i].distance);
        if (all_teachers[i]['distance'] > MRD) {
            all_teachers.splice(i, 1);
        }
    }



    var lat_long_teachers = [];

    for (var i = 0; i < all_teachers.length; ++i) {
        var temp = [];
        temp.push(all_teachers[i]["latitude"]); //check firstChild
        temp.push(all_teachers[i]["longitude"]);
        lat_long_teachers.push(temp);
    }
    closest_teachers = all_teachers;
    console.log(closest_teachers);
    sort();
    console.log(closest_teachers);

    closest_teachers = closest_teachers.slice(0, CLOSEST_TEACHERS_SIZE);
    console.log(closest_teachers);
    return closest_teachers;
};

// Create a new controller method that computes search results
exports.searchGuru = function (req, res, next) {
    console.log('search controller');
    console.log(req.body.maxRadialDistance);
    console.log(req.body.resultCount);
    console.log(req.body.longitude);
    console.log(req.body.latitude);
    console.log(req.teachers);

    var MRD = parseFloat(req.body.maxRadialDistance) * 1000;
    var CLOSEST_TEACHERS_SIZE = parseInt(req.body.resultCount);
    var teachers = [];
    studentLocation = [req.body.latitude, req.body.latitude]
    teachers = req.teachers;
    var results = init(teachers, studentLocation, MRD, CLOSEST_TEACHERS_SIZE);
    res.send({
        "data": results
    });
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
        for (var i = 0; i < results.length; ++i) {
            var teacher = results[i];
            var doc = {
                name: teacher.firstName + " " + teacher.lastName,
                username: teacher.username
            };
            for (var j = 0; j < teacher.teaching.length; j++) {
                var _class = teacher.teaching[j];
                if (_class.musicForm.genre == req.body.genre && _class.musicForm.medium == req.body.medium) {
                    doc["location"] = _class.location;
                }
            }
            teachers.push(doc);
        }

        console.log("teachers");
        console.log(teachers);

        req.teachers = teachers;
        next();
    });
}
