(function() {

    'use strict';

    var app = angular.module('MewApp', [
        'ngRoute',
        'ngAnimate',
        'restangular'
    ]);

    app.config(function ($routeProvider, RestangularProvider) {

        RestangularProvider.setBaseUrl('/api/v1');

        $routeProvider
            .when('/profiles',
            {
                controller: 'ProfilesController',
                templateUrl: 'app/Modules/Profile/Views/profiles.html'
            })
            .when('/profiles/:id',
            {
                controller: 'ProfilesController',
                templateUrl: 'app/Modules/Profile/Views/profile.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

}());