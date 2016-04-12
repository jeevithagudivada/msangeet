// Invoke 'strict' JavaScript mode
'use strict';

angular.module('user').factory('UserService', ['$resource', '$http',
    function ($resource, $http) {
        return $resource('/api/user/:username', {
            username: '@username'
        }, {
            update: {
                method: 'PUT'
            }
        })
    }
]);
