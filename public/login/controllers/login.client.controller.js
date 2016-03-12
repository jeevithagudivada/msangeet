// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'login' controller
angular.module('login').controller('LoginController', ['$scope', 'Authentication',
	function ($scope, Authentication) {
        // Expose the authentication service
        var self = this;
        self.username = "dpkm95";
        $scope.authentication = Authentication;
	}
]);
