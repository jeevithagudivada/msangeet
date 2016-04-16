// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'login' controller
angular.module('user').controller('ChildController', ['$scope', '$mdBottomSheet', 'SessionService', 'UserService', '$location',
	function ($scope, $mdBottomSheet, SessionService, UserService, $location) {
        // Expose the authentication service
        var self = this;
        self.userDetails = SessionService.userDetails;
        //        self.children = self.userDetails.children;
        self.children = [
            {
                fullName: "Gautham BA",
                username: "gautham"
            }, {
                fullName: "Harshit G",
                username: "harshit"
            }, {
                fullName: "Anusha S",
                username: "anusha"
            }
        ];

        self.childDetails = {
            parent: {
                id: undefined,
                profilePhoto: undefined,
                username: undefined,
                firstName: undefined,
                lastName: undefined
            },
            isChildUser: true
        };
        self.childDetails.personas = ['Sishya'];
        self.goToChild = function (username) {
            console.log(username);
            $location.path('/user/' + username);
        }
        self.showCreateChild = function () {
            $mdBottomSheet.show({
                templateUrl: 'user/views/create-child.client.view.html',
                controller: 'ListBottomSheetCtrl'
            }).then(function () {
                console.log('create user');
                console.log(self.childDetails);
            });
        };
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
]).controller('ListBottomSheetCtrl', function ($scope, $mdBottomSheet) {
    $scope.listItemClick = function ($index) {
        var clickedItem = $scope.items[$index];
        $mdBottomSheet.hide(clickedItem);
    };
});
