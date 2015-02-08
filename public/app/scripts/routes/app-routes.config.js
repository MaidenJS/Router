(function() {

    'use strict';

    angular
        .module('app')
        .config(config);

    function config($urlRouterProvider, $stateProvider, RestangularProvider) {

        RestangularProvider.setBaseUrl('/api/v1');

        $urlRouterProvider
            .otherwise('/');

        $stateProvider
            .state('main', {
                abstract: true,
                url : '',
                controller: 'AuthenticationController',
                resolve: {
                    hi: 1
                }
            })
            .state('home', {
                url : '/',
                templateUrl : 'app/scripts/modules/layout/pages/page.home.html'
            });

    }

})();

