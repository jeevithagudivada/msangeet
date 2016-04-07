// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'login' controller
angular.module('user').controller('ChildController', ['$scope', 'UserService', '$location',
	function ($scope, UserService, $location) {
        // Expose the authentication service
        var self = this;
        self.childDetails = {};
        self.childDetails.personas = ['Sishya'];
        self.createChild = function () {
            console.log(self);
            //$location.path('/home');
        };
	}
]);
