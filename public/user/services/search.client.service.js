// Invoke 'strict' JavaScript mode
'use strict';

angular.module('user').factory('SearchService', ['$http', function ($http) {
    var service = {
        searchGuru: function (searchDetails) {
            console.log(searchDetails);
            return $http.post('search/guru', searchDetails)
                .then(function (response) {
                    console.log(response);
                    return response;
                });
        }
    };
    return service;
  }]);
