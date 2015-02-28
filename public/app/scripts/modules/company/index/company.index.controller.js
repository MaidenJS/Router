(function() {

    'use strict';

    angular
        .module('wp.company')
        .controller('CompanyIndexController', CompanyIndexController);

    function CompanyIndexController(companyService) {

        var vm = this;

        activate();

        function activate()
        {
            vm.companies = companyService.getAll().$object;
        }

        vm.deleteCompany = function(companyId)
        {
            console.log(companyId);
        }

    }

})();