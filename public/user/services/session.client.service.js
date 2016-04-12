// Invoke 'strict' JavaScript mode
'use strict';

angular.module('user').factory('SessionService', ['$resource', '$http',
    function ($resource, $http) {
        var service = {
            userDetails: undefined,
            session: function () {
                return $http.get('api/session')
                    .then(function (response) {
                        service.userDetails = response.data.user;
                        return response;
                    });
            },
        };
        return service;
  }]);
