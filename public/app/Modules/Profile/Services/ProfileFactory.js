(function() {

    'use strict';

    var ProfileFactory = function($http) {

        return {

            getAll : function()
            {
                return $http.get('/api/v1/profiles');
            },

            getById : function(id)
            {
                return $http.get('/api/v1/profiles' + id);
            },

            create : function(commentData)
            {
                return $http({
                    method: 'POST',
                    url: 'api/comments',
                    headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
                    data: $.param(commentData)
                });
            },

            delete : function(id)
            {
                return $http.delete('/api/v1/profiles' + id);
            }

        }
    };

    ProfileFactory.$inject = ['$http'];

    angular
        .module('WiseprojectApp', [])
        .factory('ProfileFactory', ProfileFactory);

}());