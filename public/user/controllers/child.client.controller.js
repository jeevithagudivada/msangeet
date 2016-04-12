// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'login' controller
angular.module('user').controller('ChildController', ['$scope', 'SessionService', 'UserService', '$location',
	function ($scope, SessionService, UserService, $location) {
        // Expose the authentication service
        var self = this;
        self.childDetails = {};
        self.dp = undefined;
        self.childDetails.personas = ['Sishya'];
        self.createChild = function () {
            var user = new UserService(self.childDetails);

            // Use the article '$save' method to send an appropriate POST request
            user.$save(function (response) {
                // If an article was created successfully, redirect the user to the article's page 
                console.log("user successfully added");
//                SessionService.userDetails.children.append({
            //                        profilePhoto: {
            //                            data: self.childDetails.profilePhoto,
            //                            location: String,
            //                            contentType: String
            //                        },
            //                        username: self.childDetails.username,
            //                        firstName: self.childDetails.firstName,
            //                        lastName: self.childDetails.lastName
            //                    })
                    //$location.path('user/' + response.username);
            }, function (errorResponse) {
                // Otherwise, present the user with the error message
                $scope.error = errorResponse.data.message;
            });
        };
	}
]);
