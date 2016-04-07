// Invoke 'strict' JavaScript mode
'use strict';

// Set the main application name
var mainApplicationModuleName = 'mSangeetApp';

// Create the main application
var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngMdIcons', 'ngRoute', 'ngMaterial', 'ngMessages', 'ngResource', 'user']);

// Configure the hashbang URLs using the $locationProvider services 
mainApplicationModule.config(['$locationProvider',
	function ($locationProvider) {
        $locationProvider.hashPrefix('!');
	}
]);

// Fix Facebook's OAuth bug
if (window.location.hash === '#_=_') window.location.hash = '#!';

// Manually bootstrap the AngularJS application
angular.element(document).ready(function () {
    angular.bootstrap(document, [mainApplicationModuleName]);
});

// Create the 'login' controller
angular.module(mainApplicationModuleName).controller('MainController', ['$scope', '$location',
	function ($scope, $location) {
        // Expose the authentication service
        var self = this;
	}
]);
