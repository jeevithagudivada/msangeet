// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'login' controller
angular.module('user').controller('RegistrationController', ['$scope', 'SessionService', 'UserService', '$location',
	function ($scope, SessionService, UserService, $location) {
        // Expose the authentication service
        var self = this;
        self.page = 1;
        self.personas = {};
        self.mobileVC = undefined;
        self.emailVC = undefined;
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
        self.sendMobileVerificationCode = function () {

        };
        self.sendEmailVerificationCode = function () {

        };
        self.checkVC = function () {
            console.log(self.mobileVC, self.emailVC);
            self.page = 2;
        };
        self.regNext = function () {
            self.page = 2;
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
