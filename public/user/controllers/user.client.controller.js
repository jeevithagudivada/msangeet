// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'user' controller
angular.module('user').controller('UserController', ['$scope', '$routeParams', '$location', '$window', 'SessionService', 'UserService', 'SearchService', 'MarkerCreatorService',
    function ($scope, $routeParams, $location, $window, SessionService, UserService, SearchService, MarkerCreatorService)

    {
        var self = this;
        self.userDetails = SessionService.userDetails;
        self.fullName = self.userDetails.firstName + " " + self.userDetails.lastName;
        self.profilePhoto = self.userDetails.profilePhoto;

        console.log("user details:");
        console.log(self.userDetails)
        if (!self.userDetails.residenceLocation) self.userDetails.residenceLocation = {
            'addressText': ''
        };
        if (!self.userDetails.interests) self.userDetails.interests = [];
        if (!self.userDetails.influences) self.userDetails.influences = [];
        if (!self.userDetails.aboutSummary) self.userDetails.aboutSummary = '';

        self.generaldetails = {
            'Location': self.userDetails.residenceLocation.addressText,
            'Musical Interests': self.userDetails.interests.join(),
            'Influences': self.userDetails.influences.join()
        };

        self.about = self.userDetails.aboutSummary;

        self.about_short = self.about.substring(0, 100);
        self.read_about = false;

        self.qualification = {};
        var qual = self.userDetails.qualification;
        for (var i in qual) {
            var skill = qual[i].musicForm.genre + " " + qual[i].musicForm.medium;
            self.qualification[qual[i].qualificationName] = skill + "-" + qual[i].awardingOrg + "-" + qual[i].qualificationYear.toString();
        }

        console.log("qual");
        console.log(self.qualification)
        self.training = {};
        var _training = self.userDetails.training;
        for (var i in _training) {
            var teacher_name = _training[i].teacher.firstName + " " + _training[i].teacher.lastName;
            var skill = _training[i].musicForm.genre + " " + _training[i].musicForm.medium;
            var duration = _training[i].fromYear.toString() + " to " + _training[i].toYear.toString();
            self.training[teacher_name] = skill + "-" + qual[i].awardingOrg + "-" + qual[i].qualificationYear.toString();
        }

        self.awards = {};
        var _awards = self.userDetails.awards;
        for (var i in _awards) {
            self.awards[_awards[i].awardName] = _awards[i].awardingOrg + "-" + _awards[i].awardYear.toString();
        }
        self.performances = {};
        var _performances = self.userDetails.performances;
        for (var i in _performances) {
            self.performances[_performances[i].eventName] = _performances[i].hostorg + "-" + _performances[i].eventYear.toString();
        }
        self.books = {};
        var _books = self.userDetails.books;
        for (var i in _books) {
            self.books[_books[i].bookName] = _books[i].publisherName + "-" + _books[i].publicationYear.toString();
        }
        self.albums = {};
        var _albums = self.userDetails.albums;
        for (var i in _albums) {
            var date = new Date(_albums[i].releaseYear)
            self.albums[_albums[i].albumTitle] = _albums[i].publisherName + "-" + _albums[i].releaseYear;
        }
        self.albums = {};
        var _albums = self.userDetails.albums;
        for (var i in _albums) {
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
        for (var i in _teaching) {
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

        self.redirect = function (site) {

        }
        self.openInfoWindow = function (e, selectedMarker) {
            console.log(selectedMarker);
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        }

        self.searchGuru = function () {
            console.log('searchGuru')
            $scope.searchDetails = self.searchDetails;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    $scope.$apply(function () {
                        $scope.searchDetails.latitude = position.coords.latitude;
                        $scope.searchDetails.longitude = position.coords.longitude;
                        console.log($scope.searchDetails);
                        var check = new SearchService($scope.searchDetails);
                        check.$save(function (response) {
                            SessionService.searchResults = response.data;
                            self.searchResults = response.data;
                            console.log(response.data);
                            var mapOptions = {
                                zoom: 10,
                                center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                                mapTypeId: google.maps.MapTypeId.TERRAIN
                            }

                            $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

                            $scope.markers = [];

                            var infoWindow = new google.maps.InfoWindow();

                            var createMarker = function (info) {
                                var marker = new google.maps.Marker({
                                    map: $scope.map,
                                    options: {
                                        animation: 1,
                                        labelAnchor: "28 -5",
                                        labelClass: 'marker_labels'
                                    },
                                    position: new google.maps.LatLng(info.location.latitude, info.location.longitude),
                                    title: info.name
                                });
                                marker.content = '<div class="infoWindowContent">' +
                                    ' Address: ' + info.location.locationName + '</br>' +
                                    ' Distance: ' + Math.round(info.distance / 1000 * 100) / 100 + '</br></div>';

                                google.maps.event.addListener(marker, 'click', function () {
                                    infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                                    infoWindow.open($scope.map, marker);
                                });

                                $scope.markers.push(marker);
                            }

                            for (i = 0; i < self.searchResults.length; i++) {
                                createMarker(self.searchResults[i]);
                            }

                        }, function (errorResponse) {

                        });
                    });
                });
            }
        }


        self.viewProfile = function () {

            console.log(SessionService.userDetails.username);
            $location.path('/users/' + SessionService.userDetails.username);
        };

        self.children = function () {
            console.log(SessionService.userDetails.username);
            $location.path('/users/' + SessionService.userDetails.username);
        };

        // Create a new controller method for creating new user
        $scope.create = function () {
            // Use the form fields to create a new user $resource object
            var user = new User({
                title: this.title,
                content: this.content
            });

            // Use the user '$save' method to send an appropriate POST request
            user.$save(function (response) {
                // If an user was created successfully, redirect the user to the user's page 
                $location.path('user/' + response._id);
            }, function (errorResponse) {
                // Otherwise, present the user with the error message
                $scope.error = errorResponse.data.message;
            });
        };

        // Create a new controller method for retrieving a list of user
        $scope.find = function () {
            // Use the user 'query' method to send an appropriate GET request
            $scope.user = UserService.query();

        };

        // Create a new controller method for retrieving a single user
        self.findOne = function () {
            // Use the user 'get' method to send an appropriate GET request
            $scope.user = UserService.get({
                username: $routeParams.username
            });
            console.log($scope.user);
            //SessionService.userDetails = $scope.user;
        };

        // Create a new controller method for updating a single user
        $scope.update = function () {
            // Use the user '$update' method to send an appropriate PUT request
            $scope.user.$update(function () {
                // If an user was updated successfully, redirect the user to the user's page 
                $location.path('user/' + $scope.user._id);
            }, function (errorResponse) {
                // Otherwise, present the user with the error message
                $scope.error = errorResponse.data.message;
            });
        };

        // Create a new controller method for deleting a single user
        $scope.delete = function (user) {
            // If an user was sent to the method, delete it
            if (user) {
                // Use the user '$remove' method to delete the user
                user.$remove(function () {
                    // Remove the user from the user list
                    for (var i in $scope.user) {
                        if ($scope.user[i] === user) {
                            $scope.user.splice(i, 1);
                        }
                    }
                });
            } else {
                // Otherwise, use the user '$remove' method to delete the user
                $scope.user.$remove(function () {
                    $location.path('user');
                });
            }
        };

        self.sendRequestViaMultiFriendSelector = function () {
            console.log('sending request');

            FB.ui({
                method: 'apprequests',
                message: 'Awesome application try it once'

            }, function () {

            });
        };

        self.initFB = function () {
            FB.init({
                appId: '1528748510753908',
                frictionlessRequests: true
            });
            console.log("FB init");
        };

        self.shareProfile = function () {
            FB.ui({
                method: 'share_open_graph',
                action_type: 'og.likes',
                action_properties: JSON.stringify({
                    object: 'https://poised-shuttle-122514.appspot.com/#!/',
                })
            }, function (response) {
                // Debug response (optional)
                console.log(response);
            });
        }
        self.Launch = function (url) {
            window.location.assign(url)
        }


        self.tutorshipEdit = false;
        self.discipleshipEdit = false;
        self.artistryEdit = false;
        self.setEditOption = function (option) {
            if (option == 'DISCIPLESHIP') self.discipleshipEdit = true;
            if (option == 'ARTISTRY') self.artistryEdit = true;
            if (option == 'TUTORSHIP') self.tutorshipEdit = true;
        }
        self.resetEditOption = function (option) {
            if (option == 'DISCIPLESHIP') self.discipleshipEdit = false;
            if (option == 'ARTISTRY') self.artistryEdit = false;
            if (option == 'TUTORSHIP') self.tutorshipEdit = false;
        }

        self.getEditVar = function (cardHead) {
            if (cardHead == 'DISCIPLESHIP') return self.discipleshipEdit;
            if (cardHead == 'ARTISTRY') return self.artistryEdit;
            if (cardHead == 'TUTORSHIP') return self.tutorshipEdit;

        }

        function isEmpty(obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop))
                    return false;
            }
            return true;
        }

        self.fillFormData = function (field) {
            console.log("fill form for " + field);
            // fetching data from form goes here..
            var form = document.forms['editForm'];
            if (field == 'DISCIPLESHIP') {
                console.log(form[0].value + form[1].value);
                // store form[0].value in self.userDetails.qualification
                // store form[1].value in self.userDetails.training
            } else if (field == "ARTISTRY") {
                console.log(form[0].value + form[1].value + form[2].value + form[3].value);
            }


            self.resetEditOption(field);
        }

        self.initFB();
    }]);
