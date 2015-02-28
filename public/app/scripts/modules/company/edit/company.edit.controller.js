(function() {

    'use strict';

    angular
        .module('wp.company')
        .controller('CompanyEditController', CompanyEditController);

    function CompanyEditController(companyService, $stateParams) {

        var vm = this;

        activate();

        function activate()
        {
            vm.company = companyService.getById($stateParams.companyId).$object;
        }

    }

})();