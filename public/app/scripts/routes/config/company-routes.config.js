(function() {

    'use strict';

    angular
        .module('app')
        .config(config);

    function config($stateProvider) {

        var local_url = 'app/scripts/modules/company/views/';

        $stateProvider
            .state('companies', {
                url : '/companies',
                templateUrl : local_url + 'company.index.html',
                controller: 'CompanyController'
            })
            .state('companyShow', {
                url : '/companies/:companyId',
                templateUrl : local_url + 'company.show.html',
                controller: 'CompanyController'
            })
            .state('companyEdit', {
                url : '/companies/:companyId/edit',
                templateUrl : local_url + 'company.edit.html',
                controller: 'CompanyController'
            });

    }

})();