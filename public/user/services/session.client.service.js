// Invoke 'strict' JavaScript mode
'use strict';

angular.module('user').factory('SessionService', ['$resource', '$http',
    function ($resource, $http) {
        var service = {
            userDetails: undefined,
            searchResults: undefined,
            session: function () {
                return $http.get('api/session')
                    .then(function (response) {
                        service.userDetails = response.data.user;
                        return response;
                    });
            },
            sendVerificationCode: function (codeDetails) {
                console.log(codeDetails);
                return $http.post('api/verification/create', codeDetails)
                    .then(function (response) {
                        console.log(response);
                        return response;
                    });
            }
        };
        return service;
  }]);
