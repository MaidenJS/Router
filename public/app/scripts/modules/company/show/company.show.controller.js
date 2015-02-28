(function() {

    'use strict';

    angular
        .module('wp.company')
        .controller('CompanyShowController', CompanyShowController);

    function CompanyShowController(companyService, $stateParams) {

        var vm = this;

        activate();

        function activate()
        {
            vm.company = companyService.getById($stateParams.companyId).$object;
        }

    }

})();