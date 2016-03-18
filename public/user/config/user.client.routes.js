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
            templateUrl: 'user/views/profile-view.view.html',
            resolve: {
                auth: ['$q', '$location', 'UserService',
                  function ($q, $location, UserService) {
                        return UserService.session().then(
                            function (success) {},
                            function (err) {
                                $location.path('/login');
                                $location.replace();
                                return $q.reject(err);
                            });
                    }]
            }
        }).
        when('/user/:username/edit', {
            templateUrl: 'user/views/profile-update.view.html'
        }).
        when('/home', {
            templateUrl: 'user/views/home.view.html',
            resolve: {
                auth: ['$q', '$location', 'UserService',
                       function ($q, $location, UserService) {
                        return UserService.session().then(
                            function (success) {},
                            function (err) {
                                $location.path('/login');
                                $location.replace();
                                return $q.reject(err);
                            });
                       }]
            }
        }).
        when('/user', { //temporary for demo
            templateUrl: 'user/views/profile-view.view.html',
            resolve: {
                auth: ['$q', '$location', 'UserService',
                       function ($q, $location, UserService) {
                        return UserService.session().then(
                            function (success) {},
                            function (err) {
                                $location.path('/login');
                                $location.replace();
                                return $q.reject(err);
                            });
                       }]
            }
        });
	}
]);
