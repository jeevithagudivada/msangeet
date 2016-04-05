// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'login' controller
angular.module('login').controller('LoginController', ['$scope', 'UserService', 'SigninService', '$location',
	function ($scope, UserService, SigninService, $location) {
        // Expose the authentication service
        var self = this;
        self.data = {
            selectedIndex: 0,
            secondLocked: true,
            bottom: false
        };
        self.page = 1;
        self.personas = {};
        for (var i = 1; i < 10; ++i) self.personas[i] = false;
        self.next = function () {
            self.data.selectedIndex = Math.min(self.data.selectedIndex + 1, 2);
        };
        self.previous = function () {
            self.data.selectedIndex = Math.max(self.data.selectedIndex - 1, 0);
        };
        self.states = ('Andra Pradesh,Arunachal Pradesh,Assam,Bihar,Chhattisgarh,' +
            'Goa,Gujarat,Haryana,Himachal Pradesh,Jammu and Kashmir,Jharkhand,Karnataka,' +
            'Kerala,Madya Pradesh,Maharashtra,Manipur,Meghalaya,Mizoram,Nagaland,Orissa,' +
            'Punjab,Rajasthan,Sikkim,Tamil Nadu,Tripura,Uttaranchal,Uttar Pradesh,West Bengal,').split(',').map(function (state) {
            return {
                abbrev: state
            };
        });
        self.login = function () {
            console.log(self.user);
            UserService.login(self.user).then(function (success) {
                console.log(success);
                console.log(success.data)
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
        self.authentication = UserService.isLoggedIn;
        self.register = function () {
            console.log('in register');
            $location.path('/home');
        }
	}
]);
