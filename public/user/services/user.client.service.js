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

        login: function (user) {
            return $http.post('api/auth/local', user)
                .then(function (response) {
                    service.isLoggedIn = true;
                    service.userDetails = response.data;
                    return response;
                });
        }
    };
    return service;
  }]);
