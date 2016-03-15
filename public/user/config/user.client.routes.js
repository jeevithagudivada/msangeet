// Invoke 'strict' JavaScript mode
'use strict';

// Configure the 'user' module routes
angular.module('user').config(['$routeProvider',
	function ($routeProvider) {
        $routeProvider.
        when('/user/children', {
            templateUrl: 'user/views/child-accounts.view.html'
        }).
        when('/user/:username', {
            templateUrl: 'user/views/profile-view.view.html'
        }).
        when('/user/:username/edit', {
            templateUrl: 'user/views/profile-update.view.html'
        }).
        when('/user', { //temporary for demo
            templateUrl: 'user/views/profile-view.view.html'
        });
	}
]);
