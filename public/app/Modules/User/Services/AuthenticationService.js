(function() {

    'use strict';

    var AuthenticationService = function($http) {

        return {

            register: function(credentials)
            {
                var register = $http.post("/users/register", credentials);

                return SessionService.get('authenticated');
            },

            login: function(credentials)
            {
                var login = $http.post("/users/login", credentials);
                login.success(cacheSession);
                login.success(FlashService.clear);
                login.error(loginError);

                return login;
            },

            logout: function()
            {
                var logout = $http.post("/users/logout");

                return logout;
            }

        };

    };

    AuthenticationService.$inject = ['$http'];

    angular
        .module('WiseprojectApp', [])
        .factory('AuthenticationService', AuthenticationService);

}());