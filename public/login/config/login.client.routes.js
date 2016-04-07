// Invoke 'strict' JavaScript mode
'use strict';

// Configure the 'login' module routes
angular.module('login').config(['$routeProvider',
	function ($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'login/views/login.client.view.html',
            resolve: {
                auth: ['$q', '$location', 'UserService',
                       function ($q, $location, UserService) {
                        return UserService.session().then(
                            function (success) {
                                console.log(UserService.userDetails.hasRegistered);
                                $location.path('/home');
                                $location.replace();
                            },
                            function (err) {
                                //return $q.reject(err);
                            });
                       }]
            }
        }).
        when('/registration', {
            templateUrl: 'login/views/registration.client.view.html',
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
        otherwise({
            redirectTo: '/'
        });
	}
]);
