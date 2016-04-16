// Invoke 'strict' JavaScript mode
'use strict';

angular.module('user').factory('VerificationService', ['$resource', '$http',
    function ($resource, $http) {
        return $resource('/api/verification/check', {
            username: '@username'
        }, {
            update: {
                method: 'PUT'
            }
        })
    }
]);
