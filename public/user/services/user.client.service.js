// Invoke 'strict' JavaScript mode
'use strict';

// Create the 'user' service
angular.module('user').factory('User', ['$resource', function ($resource) {
    // Use the '$resource' service to return an article '$resource' object
    return $resource('api/user/:username', {
        articleId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);
angular.module('user').factory('UserService', ['$http', function ($http) {
    var service = {
        isLoggedIn: false,
        userDetails: undefined,
        session: function () {
            return $http.get('/api/session')
                .then(function (response) {
                    service.isLoggedIn = true;
                    console.log(response);
                    console.log('service')
                    service.userDetails = response.data.user;
                    return response;
                });
        },
        login: function (user) {
            return $http.post('api/auth/local', user)
                .then(function (response) {
                    service.isLoggedIn = true;
                    console.log(response);
                    console.log('login')
                    service.userDetails = response.data.user;
                    return response;
                });
        }
    };
    return service;
  }]);
