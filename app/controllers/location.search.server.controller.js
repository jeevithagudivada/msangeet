// Invoke 'strict' JavaScript mode
'use strict';

// Create a new controller method that computes search results
exports.searchGuru = function (req, res, next) {
    console.log('search controller');
    console.log(req.body.genre);
    console.log(req.body.medium);
    console.log(req.body.maxRadialDistance);
    console.log(req.body.resultCount);
    console.log(req.body.longitude);
    console.log(req.body.latitude);

    //get guru location from mongodb based on medium & genre & city

    //search logic

    res.json({});
};
