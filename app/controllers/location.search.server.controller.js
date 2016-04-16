// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var User = require('mongoose').model('User');

var closest_teachers=[];
var studentLocation = undefined;

var deg2rad = function (deg) {
	  return deg * (Math.PI/180);
	};


var getDistance = function (lat1,lon1,lat2,lon2) {
		  var R = 6371; 
		  var dLat = deg2rad(lat2-lat1);  
		  var dLon = deg2rad(lon2-lon1); 
		  var a = 
		    Math.sin(dLat/2) * Math.sin(dLat/2) +
		    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
		    Math.sin(dLon/2) * Math.sin(dLon/2)
		    ; 
		  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		  var d = R * c; // Distance in km
		  return d;
	};


var measureDist = function(src,dest){
		return getDistance(src[0],src[1],dest[0],dest[1]);
};


var sort = function () {
	    closest_teachers.sort(function(a, b) {
	    var distA= a["distance"],
		distB= b["distance"]
	    if (distA < distB) 
	      return -1;
	    if (distA > distB)
	      return 1;
	    return 0;
	   });          
};

var init = function (all_teachers,studentLocation,MRD,CLOSEST_TEACHERS_SIZE) {

    console.log(all_teachers);
    for(var i = 0;i<all_teachers.length;++i){
        all_teachers[i]['distance']=measureDist(studentLocation,[
            all_teachers[i].location.latitute,
            all_teachers[i].location.longitude
        ]);
        console.log(all_teachers[i].distance);
    }
    //hard coding
    /*
    for(var i=0;i<all_teachers.length;i++)
        console.log(all_teachers[i]["location"]);

    var all_teachers = [{"latitude":13.002484,"longitude":77.576137},{"latitude":13.003759,"longitude": 77.578884},{"latitude":13.002498,"longitude": 77.576156}]
    */

    //fetch lat long from mongodb
    //var studentLocation=[13.002484,77.57137]

    var lat_long_teachers=[];

    for(var i=0; i<all_teachers.length;++i){
        var temp=[];
        temp.push(all_teachers[i]["latitude"]); //check firstChild
        temp.push(all_teachers[i]["longitude"]);
        lat_long_teachers.push(temp);			
    }
    closest_teachers = all_teachers;
    console.log(closest_teachers);
    sort();
    console.log(closest_teachers);

    closest_teachers = closest_teachers.slice(0,CLOSEST_TEACHERS_SIZE);
    console.log(closest_teachers);

    /*
    for(var i=0;i< lat_long_teachers.length;i++){
        console.log(measureDist(lat_long_teachers[i],studentLocation));			
    }		
    */				


//		for(var i=0;i<CLOSEST_TEACHERS_SIZE;i++){
//			closest_teachers.push(lat_long_teachers[i]); //how to declare global closest_teachers
//		}			

//		for(var i=CLOSEST_TEACHERS_SIZE;i<lat_long_teachers.length;i++){
//			if(measureDist(lat_long_teachers[i],studentLocation) < measureDist(closest_teachers[CLOSEST_TEACHERS_SIZE-1],studentLocation)){ //how to call measureDist()
//				closest_teachers.splice(CLOSEST_TEACHERS_SIZE-1,1);
//				closest_teachers.push(lat_long_teachers[i]);
//			 	sort();	
//			}			
//		}

    //create json here
//    var _json=[];
//
//    for(var i=0; i< all_teachers.length ;++i){
//        for(var j=0;j< closest_teachers.length;++j)
//        {
//            if(all_teachers[i]["latitude"]==closest_teachers[j][0] && all_teachers[i]["longitude"]==closest_teachers[j][1])
//            {
//                _json.push(all_teachers[i]);
//                //Also push into json the remaining details that need to be filled in for the marker
//                break; 
//            }
//        }
//    }
//
//    for(var i=0; i<_json.length ;++i){
//        console.log(_json[i]);
//    }

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

    var MRD = parseInt(req.body.maxRadialDistance);
    var CLOSEST_TEACHERS_SIZE=parseInt(req.body.resultCount);
    var teachers = [];
//    var ulat = parseFloat(req.body.longitude);
//    var ulon = parseFloat(req.body.longitude);
//    //search logic
//    for(var teacher in req.teachers){
//        var tlat = parseFloat(teacher.location.latitute);
//        var tlon = parseFloat(teacher.location.longitude);
//        teacher.distance = getDistance(ulat,ulon,tlat,tlon);
//        
//    }
//  hello();
    studentLocation = [req.body.latitude,req.body.latitude]
    teachers = req.teachers;    
    var results = init(teachers,studentLocation,MRD,CLOSEST_TEACHERS_SIZE);
    res.send({"data":results});
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
//        var teachers = [];
//        console.log(results);
//        for (var i=0;i<results.length;++i) {
//            var teacher = results[i];
//            var doc = {
//                name: teacher.firstName + " " + teacher.lastName
//            };
//            for (var _class in teacher.teaching) {
//                if (_class.musicForm.genre == req.body.genre && _class.musicForm.medium == req.body.medium) {
//                    doc["location"] = _class.musicForm.location;
//                }
//            }
//            teachers.push(doc);
//        }
//          
//        console.log("line 74");
//        console.log(teachers);
        req.teachers = [{
            name: "VK",
            username: "vkumar",
            location: {
                "locationName": "Race Course Road, Bangalore",
                "latitute": "12.96181949",
                "longitude": "77.61596739"
            }
        },{
            name: "VK2",
            username: "vkumar2",
            location: {
                "locationName": "Race Course Road, Bangalore",
                "latitute": "22.96181949",
                "longitude": "77.61596739"
            }
        },{
            name: "VK3",
            username: "vkumar3",
            location: {
                "locationName": "Race Course Road, Bangalore",
                "latitute": "12.96181949",
                "longitude": "87.61596739"
            }
        }];
        next();
    });
}


