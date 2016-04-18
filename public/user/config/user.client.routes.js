// Invoke 'strict' JavaScript mode
'use strict';

// Configure the 'user' module routes
angular.module('user').config(['$routeProvider',
	function ($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'user/views/home.client.view.html',
            resolve: {
                auth: ['$q', '$location', 'SessionService',
                       function ($q, $location, SessionService) {
                        return SessionService.session().then(
                            function (success) {
                                if (!SessionService.userDetails.hasRegistered) {
                                    $location.path('/registration');
                                    $location.replace();
                                } else {
                                    $location.path('/home');
                                    $location.replace();
                                }
                            },
                            function (err) {
                                //return $q.reject(err);
                            });
                       }]
            }
        }).
        when('/registration', {
            templateUrl: 'user/views/registration.client.view.html',
            resolve: {
                auth: ['$q', '$location', 'SessionService',
                       function ($q, $location, SessionService) {
                        return SessionService.session().then(
                            function (success) {
                                if (SessionService.userDetails.hasRegistered) {
                                    $location.path('/home');
                                    $location.replace();
                                }
                            },
                            function (err) {
                                $location.path('/login');
                                $location.replace();
                                return $q.reject(err);
                            });
                       }]
            }
        }).
        when('/child', {
            templateUrl: 'user/views/child-accounts.client.view.html'
        }).
        when('/user/:username', {
            templateUrl: 'user/views/profile-view.client.view.html',
            resolve: {
                auth: ['$q', '$location', 'SessionService',
                  function ($q, $location, SessionService) {
                        return SessionService.session().then(
                            function (success) {},
                            function (err) {
                                $location.path('/login');
                                $location.replace();
                                return $q.reject(err);
                            });
                    }]
            }
        }).
//        when('/user/:username', {
            //            templateUrl: 'user/views/profile-view.client.view.html',
            //            resolve: {
            //                auth: ['$q', '$location', 'UserService',
            //                  function ($q, $location, SessionService) {
            //                        return SessionService.getUser().then(
            //                            function (success) {
            //                                console.log(success);
            //                            },
            //                            function (err) {});
            //                    }]
            //            }
            //        }).
        when('/user/:username/edit', {
            templateUrl: 'user/views/profile-update.client.view.html'
        }).
        when('/home', {
            templateUrl: 'user/views/home.client.view.html',
            resolve: {
                auth: ['$q', '$location', 'SessionService',
                       function ($q, $location, SessionService) {
                        return SessionService.session().then(
                            function (success) {},
                            function (err) {
                                $location.path('/login');
                                $location.replace();
                                return $q.reject(err);
                            });
                       }]
            }
        }).
        when('/profile', { //temporary for demo
            templateUrl: 'user/views/profile-view.client.view.html',
            resolve: {
                auth: ['$q', '$location', 'SessionService',
                       function ($q, $location, SessionService) {
                        return SessionService.session().then(
                            function (success) {
                                $location.path('/user/' + SessionService.userDetails.username);
                            },
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
