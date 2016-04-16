// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'user' controller
angular.module('user').controller('UserController', ['$scope', '$routeParams', '$location', '$window', 'SessionService', 'UserService', 'SearchService',
    function ($scope, $routeParams, $location, $window, SessionService, UserService, SearchService)
    {
        var self = this;
        self.userDetails = SessionService.userDetails;
        self.fullName = self.userDetails.firstName + " " + self.userDetails.lastName;
        self.profilePhoto = self.userDetails.profilePhoto;
        console.log(self.userDetails.profilePhoto);
        //self.generaldetails = {
        //    'Location': self.userDetails.residenceLocation.addressText,
        //    'Musical Interests': self.userDetails.interests.join(),
        //    'Influences': self.userDetails.influences.join()
        //};

        //self.about = self.userDetails.aboutSummary;
        self.about = "John the bookmaker was an Indian bookmaker who gave money to Australian cricketers Mark Waugh and Shane Warne in 1994–95 for pitch and weather information. One of the most publicised betting controversies in cricket in the 1990s, the matter was initially covered up by the Australian Cricket Board (ACB), which reported it to the International Cricket Council and quietly fined the players. The players and the ACB were later widely condemned by the media and public, but not generally by the sports community. The ACB requested an independent inquiry and appointed Rob O'Regan QC, who wrote that a suspension for a  would have been a more appropriate penalty. He strongly condemned the players' behaviour and recommended that cricketers be educated about the dangers of gambling and unauthorised bookmakers. The controversy prompted Pakistan to ask the two Australian players to appear in front of their own judicial inquiry into corruption; the hearings were held in Australia.";
        self.about_short = self.about.substring(0, 100);
        self.read_about = false;

        self.qualification = {};
        var qual = self.userDetails.qualification;
        for (var i in qual)
        {
            var skill = qual[i].musicForm.genre + " " + qual[i].musicForm.medium;
            self.qualification[qual[i].qualificationName] = skill + "-" + qual[i].awardingOrg + "-" + qual[i].qualificationYear.toString();
        }
        self.training = {};
        var _training = self.userDetails.training;
        for (var i in _training)
        {
            var teacher_name = _training[i].teacher.firstName + " " + _training[i].teacher.lastName;
            var skill = _training[i].musicForm.genre + " " + _training[i].musicForm.medium;
            var duration = _training[i].fromYear.toString() + " to " + _training[i].toYear.toString();
            self.training[teacher_name] = skill + "-" + qual[i].awardingOrg + "-" + qual[i].qualificationYear.toString();
        }
        self.awards = {};
        var _awards = self.userDetails.awards;
        for (var i in _awards)
        {
            self.awards[_awards[i].awardName] = _awards[i].awardingOrg + "-" + _awards[i].awardYear.toString();
        }
        self.performances = {};
        var _performances = self.userDetails.performances;
        for (var i in _performances)
        {
            self.performances[_performances[i].eventName] = _performances[i].hostorg + "-" + _performances[i].eventYear.toString();
        }
        self.books = {};
        var _books = self.userDetails.books;
        for (var i in _books)
        {
            self.books[_books[i].bookName] = _books[i].publisherName + "-" + _books[i].publicationYear.toString();
        }
        self.albums = {};
        var _albums = self.userDetails.albums;
        for (var i in _albums)
        {
            var date = new Date(_albums[i].releaseYear)
            self.albums[_albums[i].albumTitle] = _albums[i].publisherName + "-" + _albums[i].releaseYear;
        }
        self.albums = {};
        var _albums = self.userDetails.albums;
        for (var i in _albums)
        {
            var date = new Date(_albums[i].releaseYear);
            console.log(date.getDate(), date.getMonth(), date.getFullYear());
            self.albums[_albums[i].albumTitle] = _albums[i].publisherName + "-" + _albums[i].releaseYear;
        }
        self.musicdetails = {
            'DISCIPLESHIP': {
                'Formal Musical Educational Qualifications': self.qualification,
                'Musical Training': self.training
            },
            'ARTISTRY': {
                'Awards and Felicitation': self.awards,
                'Musical Concerts and Performences': self.performances,
                'Books': self.books,
                'Albums': self.albums
            }

        };

        var teaching = {};
        var _teaching = self.userDetails.teaching;
        self.students = [];
        for (var i in _teaching)
        {
            var duration = _teaching[i].fromYear.toString() + " to ";
            if (_teaching[i].toYear == undefined) duration += "present";
            else duration += _teaching[i].toYear.toString();
            var title = _teaching[i].teachingTitle + " - " + _teaching[i].orgName + " - " + duration;
            var _class = {};
            _class['Location'] = {
                'Address': _teaching[i].location.locationName
            };
            _class['Schedule'] = {
                'Days': _teaching[i].schedule.days.join(),
                'Frequency': _teaching[i].schedule.frequency,
                'Timing': _teaching[i].schedule.fromTime + " to " + _teaching[i].schedule.toTime
            };
            var type = [];
            if (_teaching[i].conductsGroupClass) type.push("Groups");
            if (_teaching[i].conductsIndividualClass) type.push("Individual");
            _class['Additional Info'] = {
                'Class Type': type.join(),
                'Class Duration': _teaching[i].classDuration.toString() + " mins",
                'Monthly Fee': "INR " + _teaching[i].monthlyFee.toString()
            }
            _class['Students'] = [];
            for (var j in _teaching[i].students)
                _class['Students'].push(_teaching[i].students[j]);

            teaching[title] = _class;
        }
        self.tutorship = teaching;

        self.redirect = function (site)
        {
            //            if(site=='facebook')
        }


        self.searchGuru = function ()
        {
            console.log('searchGuru')
            $scope.searchDetails = self.searchDetails;
            if (navigator.geolocation)
            {
                navigator.geolocation.getCurrentPosition(function (position)
                {
                    $scope.$apply(function ()
                    {
                        $scope.searchDetails.latitude = position.coords.latitude;
                        $scope.searchDetails.longitude = position.coords.longitude;
                        console.log($scope.searchDetails);
                        SearchService.searchGuru($scope.searchDetails);
                    });
                });
            }
        }

        self.sendRequestViaMultiFriendSelector = function ()
        {
            console.log('sending request');
        }
        self.viewProfile = function ()
        {
            console.log(SessionService.userDetails.username);
            $location.path('/users/' + SessionService.userDetails.username);
        };

        self.children = function ()
        {
            console.log(SessionService.userDetails.username);
            $location.path('/users/' + SessionService.userDetails.username);
        };

        // Create a new controller method for creating new user
        $scope.create = function ()
        {
            // Use the form fields to create a new user $resource object
            var user = new User({
                title: this.title,
                content: this.content
            });

            // Use the user '$save' method to send an appropriate POST request
            user.$save(function (response)
            {
                // If an user was created successfully, redirect the user to the user's page 
                $location.path('user/' + response._id);
            }, function (errorResponse)
            {
                // Otherwise, present the user with the error message
                $scope.error = errorResponse.data.message;
            });
        };

        // Create a new controller method for retrieving a list of user
        $scope.find = function ()
        {
            // Use the user 'query' method to send an appropriate GET request
            $scope.user = UserService.query();

        };

        // Create a new controller method for retrieving a single user
        self.findOne = function ()
        {
            // Use the user 'get' method to send an appropriate GET request
            $scope.user = UserService.get({
                username: $routeParams.username
            });
            console.log($scope.user);
        };

        // Create a new controller method for updating a single user
        $scope.update = function ()
        {
            // Use the user '$update' method to send an appropriate PUT request
            $scope.user.$update(function ()
            {
                // If an user was updated successfully, redirect the user to the user's page 
                $location.path('user/' + $scope.user._id);
            }, function (errorResponse)
            {
                // Otherwise, present the user with the error message
                $scope.error = errorResponse.data.message;
            });
        };

        // Create a new controller method for deleting a single user
        $scope.delete = function (user)
        {
            // If an user was sent to the method, delete it
            if (user)
            {
                // Use the user '$remove' method to delete the user
                user.$remove(function ()
                {
                    // Remove the user from the user list
                    for (var i in $scope.user)
                    {
                        if ($scope.user[i] === user)
                        {
                            $scope.user.splice(i, 1);
                        }
                    }
                });
            } else
            {
                // Otherwise, use the user '$remove' method to delete the user
                $scope.user.$remove(function ()
                {
                    $location.path('user');
                });
            }
        };

        self.sendRequestViaMultiFriendSelector = function ()
        {
            console.log('sending request');

            FB.ui({
                method: 'apprequests',
                message: 'Awesome application try it once'
            }, function ()
            {
                $window.location.href = 'https://poised-shuttle-122514.appspot.com/';
            });
        };

        self.initFB = function ()
        {
            FB.init({
                appId: '1528748510753908',
                frictionlessRequests: true
            });
            console.log("FB init");
        };

        self.initFB();
    }]);
