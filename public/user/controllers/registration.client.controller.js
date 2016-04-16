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
            var verify = VerificationService.sendVerificationCode({
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
                console.log(response);
                self.page = 2;
            }, function (errorResponse) {
                self.invalidVC = true;
            });
        };
        self.regNext = function () {
            self.checkVC();
            //self.page = 2;
        };
        self.regFinish = function () {
            self.page = 3;
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
