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
