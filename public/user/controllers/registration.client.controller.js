// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'login' controller
angular.module('user').controller('RegistrationController', ['$scope', 'VerificationService', 'SessionService', 'UserService', '$location',
	function ($scope, VerificationService, SessionService, UserService, $location) {
        // Expose the authentication service
        var self = this;
        self.page = 1;
        self.personas = {};
        self.mobileVC = undefined;
        self.emailVC = undefined;
        self.invalidVC = false;
        self.dp = undefined;
        for (var i = 1; i < 10; ++i) self.personas[i] = false;

        self.showdp = function () {
            console.log(self.dp);
        }
        self.login = function (provider) {
            SessionService.login(self.user).then(function (success) {
                if (success.data.hasRegistered)
                    $location.path('/home');
                else {
                    console.log(success.data.hasRegistered);
                    $location.path('/registration');
                }
            }, function (error) {
                self.errorMessage = error.data.msg;
            })
        };
        self.userDetails = SessionService.userDetails;
        console.log(self.userDetails);
        self.sendVerificationCode = function () {
            // Use the form fields to create a new user $resource object
            console.log(self.userDetails.phoneNumber);
            var verify = SessionService.sendVerificationCode({
                phone: self.userDetails.phoneNumber,
                username: self.userDetails.username
            });
            console.log(verify);
        };
        self.checkVC = function () {
            console.log(self.mobileVC);
            var check = new VerificationService({
                code: self.mobileVC,
                username: self.userDetails.username
            });
            check.$save(function (response) {
                if (response.data == "success") self.page = 2;
                else self.invalidVC = true;
            }, function (errorResponse) {
                console.log('checkVC $save error');
            });
        };
        self.updateUserDetails = function () {
            var user = new UserService(self.userDetails);

            // Use the user '$save' method to send an appropriate POST request
            user.$update(function (response) {
                // If an user was created successfully, redirect the user to the user's page 
                console.log(response);
                if (response.$resolved) {
                    Session.userDetails = resopnse;
                    self.page = 3;
                } else {
                    console.log('registration error');
                }

            }, function (errorResponse) {
                // Otherwise, present the user with the error message
                $scope.error = errorResponse.data.message;
            });
            console.log($scope.user);
        };
        self.regNext = function () {
            //            self.checkVC();
            self.page = 2;
        };
        self.regFinish = function () {
            var dob = self.userDetails.dateOfBirth;
            self.userDetails.dateOfBirth = new Date(dob).toISOString();

            var _personas = [];
            for (var i in self.personas)
                if (self.personas[i]) _personas.push(i);
            self.userDetails.personas = _personas;

            self.updateUserDetails();
            //            self.page = 3;
        };
        self.gotoHome = function () {
            $location.path('/home');
        };
        self.gotoProfile = function () {
            $location.path('/profile');
        };
        self.gotoChild = function () {
            $location.path('/child');
        };
        self.gotoInvite = function () {
            $location.path('/invite');
        };
	}
]);
