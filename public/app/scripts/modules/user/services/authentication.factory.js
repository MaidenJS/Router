(function() {

    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', authenticationService);

    function authenticationService(Restangular) {

        /**
         * GET /api/v1/users
         */
        var _authenticationService = Restangular.all('users');

        return {

            register : function(credentials)
            {
                return _authenticationService.post(data).then(function() {
                    console.log(data);
                });
            },

            login : function(credentials)
            {
                return _authenticationService.post(data).then(function() {
                    console.log(data);
                });
            },

            logout : function()
            {
                return _authenticationService.post(data).then(function() {
                    console.log(data);
                });
            },

            getAuthUser : function()
            {
                return null;
            }

        };

    }

})();