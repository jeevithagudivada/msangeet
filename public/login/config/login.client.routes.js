// Invoke 'strict' JavaScript mode
'use strict';

// Configure the 'login' module routes
angular.module('login').config(['$routeProvider',
	function ($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'login/views/login.client.view.html'
        }).
        otherwise({
            redirectTo: '/'
        });
	}
]);
