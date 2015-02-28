(function() {

    'use strict';

    angular
        .module('app')
        .config(config);

    function config($stateProvider) {

        var local_url = 'app/scripts/modules/user/views/';

        $stateProvider
            .state('register', {
                url : '/register',
                templateUrl : local_url + 'user.register.html',
                controller: 'AuthenticationController'
            })
            .state('login', {
                url : '/login',
                templateUrl : local_url + 'user.login.html',
                controller: 'AuthenticationController'
            });

    }

})();