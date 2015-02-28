(function() {

    'use strict';

    angular
        .module('wp.company')
        .config(config);

    function config($stateProvider) {

        var directory = 'app/scripts/modules/company/';

        $stateProvider
            .state('companies', {
                url : '/companies',
                templateUrl : directory + 'index/company.index.html',
                controller: 'CompanyIndexController',
                controllerAs: 'vm'
            })
            .state('companyCreate', {
                url : '/companies/create',
                templateUrl : directory + 'create/company.create.html',
                controller: 'CompanyCreateController',
                controllerAs: 'vm'
            })
            .state('companyShow', {
                url : '/companies/:companyId',
                templateUrl : directory + 'show/company.show.html',
                controller: 'CompanyShowController',
                controllerAs: 'vm'
            })
            .state('companyEdit', {
                url : '/companies/:companyId/edit',
                templateUrl : directory + 'edit/company.edit.html',
                controller: 'CompanyEditController',
                controllerAs: 'vm'
            });

    }

})();