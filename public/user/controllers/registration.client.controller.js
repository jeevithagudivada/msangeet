// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'login' controller
angular.module('user').controller('RegistrationController', ['$scope', 'UserService', '$location',
	function ($scope, UserService, $location) {
        // Expose the authentication service
        var self = this;
        self.page = 1;
        self.personas = {};
        self.mobileVC = undefined;
        self.emailVC = undefined;
        for (var i = 1; i < 10; ++i) self.personas[i] = false;
        self.login = function (provider) {
            UserService.login(self.user).then(function (success) {
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
        self.userDetails = UserService.userDetails;
        console.log(self.userDetails);
        self.sendMobileVerificationCode = function () {

        };
        self.sendEmailVerificationCode = function () {

        };
        self.checkVC = function () {
            console.log(self.mobileVC, self.emailVC);
            self.page = 2;
        };
        self.register = function () {
            console.log(self.personas);
            $location.path('/home');
        };
	}
]);
