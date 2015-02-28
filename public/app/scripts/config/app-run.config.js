(function() {

    'use strict';

    angular
        .module('app')
        .run(run);

    function run(Restangular) {

        Restangular.addResponseInterceptor(function(data, operation, what, response, deferred)
        {
            console.log('++++++++++ addResponseInterceptor ++++++++++');
            console.log('---------- Data ----------');
            console.log(data);
            console.log('---------- Operation ----------');
            console.log(operation);
            console.log('---------- What ----------');
            console.log(what);
            console.log('---------- Response ----------');
            console.log(response);
            console.log('---------- Deferred ----------');
            console.log(deferred);
            console.log('++++++++++++++++++++++++++++++++++++++++++++');

            return data.data;
        });
    }

})();