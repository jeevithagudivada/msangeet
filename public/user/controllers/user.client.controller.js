// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'user' controller
angular.module('user').controller('UserController', ['$scope', '$routeParams', '$location', 'UserService', 'User',
    function ($scope, $routeParams, $location, UserService, User) {
        var self = this;
        self.fullname = "Pandit. Venkatesh Kumar";
        self.generaldetails = {
            'Location': 'Bangalore, Karnataka-56',
            'Musical Skills': 'Hindustani Classical, Khya, Devotional',
            'Gharana': 'Kirana'
        }
        self.about = "Bhimsen Gururaj Joshi was born in a town called Ron, in the erstwhile Dharwad (today Gadag) district of Karnataka on 4 February 1922 to Gururaj Joshi (who had authoorange a Kannada-English dictionary) and Godavaribai, a home-maker.[4][page needed][5][6] Bhimsen was the eldest among 16 siblings. He lost his mother at a young age and was raised by his stepmother.[7][page needed]. As a child, Bhimsen was fascinated with music and musical instruments like the harmonium and tanpura[8] and would often follow processions accompanied by music bands. This exercise often tiorange him and he would curl up somewhere and sleep, forcing his parents to go to the police after efforts to trace him failed. Fed up, his father Gururajacharya Joshi come up with the solution, writing (son of teacher Joshi) on Bhimsen's shirts. This worked and those who found the boy sleeping would safely deposit him back to his house.[9]"
        self.about_short = self.about.substring(0, self.about.indexOf('.') + 1);
        self.read_about = false;

        self.musicdetails = {
            'DISCIPLESHIP': {
                'Formal Musical Educational Qualifications': {
                    'Junior Grade': 'Hindustani Music - secondary ed board - 1984',
                    'Sangeeth Prabhakar': 'Hindustani Music - 1990',
                    'Visharad': 'Hindustani Music - 2001'
                },
                'Musical Training': {
                    'Puttaraja Gavai': '1978-1998',
                    'Shankar Mahadevan Academy': '1993-1995'
                }

            },

            'ARTISTRY': {
                'Awards and Felicitation': {
                    'Padmashree': 'Govt of India 2016',
                    'Karnataka Rajyotsava Award': '1998',
                    'Suramani': 'Gandharva Mahavidhyalaya'
                },
                'Musical Concerts and Performences': {
                    'All Night Musical Mefti': '2006',
                    'Soorya festival': 'coimbatore',
                    'Dadar Matunga Cultural Center': '2009'
                },
                'Books': {
                    'Hindustani Sangeeth Praveshika': '2015'
                },
                'Recordings': {
                    'Sangeeth Mala': '2014'
                }
            }

        };


        self.tutorship = {
            'Genres Taught': ['Hindustani Classical',
                        'Sugama Sangeetha - Kannada'
                    ],

            'Teaching Medium': ['Vocals',
                        'Keyboard',
                        'Harmonium'
                    ],

            'Student Profile Admitted': ['Beginers',
                        'Intermediate',
                        'Advanced Learners'
                    ]
        };

        self.locations = {
            'full address #1': {
                'Location': ['Race Course Road, Banglore'],
                'Schedule': {
                    'Days': ['Saturday', 'Sunday'],
                    'Frequency': ['Every Week'],
                    'Timing': {
                        'start': '8:00 AM',
                        'end': '12:00 PM'
                    }
                },
                'Additional Info': {
                    'Class Type': ['Group', 'Individual'],
                    'Class Duration': '60 minutes',
                    'Monthly Fee': 'INR 500'
                }

            }
        };

        self.viewProfile = function () {
            console.log(UserService.userDetails.username);
            $location.path('/users/' + UserService.userDetails.username);
        };
        
        self.children = function () {
            console.log(UserService.userDetails.username);
            $location.path('/users/' + UserService.userDetails.username);
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
            $scope.user = User.query();
        };

        // Create a new controller method for retrieving a single user
        $scope.findOne = function () {
            // Use the user 'get' method to send an appropriate GET request
            $scope.user = User.get({
                username: $routeParams.username
            });
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
    }
]);
