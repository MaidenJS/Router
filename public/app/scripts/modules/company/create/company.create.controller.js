(function() {

    'use strict';

    angular
        .module('wp.company')
        .controller('CompanyCreateController', CompanyCreateController);

    function CompanyCreateController(companyService) {

        var vm = this;

        vm.companyData = {};

        vm.createCompany = function()
        {
            console.log('creating a company now');

            companyService.create(vm.companyData);
        }

    }

})();