(function() {

    'use strict';

    angular
        .module('app')
        .config(config);

    function config($stateProvider) {

        var local_url = 'app/scripts/modules/project/views/';

        $stateProvider
            .state('projects', {
                url : '/projects',
                templateUrl : local_url + 'project.index.html',
                controller: 'ProjectController'
            })
            .state('projectShow', {
                url : '/projects/:projectId',
                templateUrl : local_url + 'project.show.html',
                controller: 'ProjectController'
            })
            .state('projectEdit', {
                url : '/projects/:projectId/edit',
                templateUrl : local_url + 'project.edit.html',
                controller: 'ProjectController'
            });

    }

})();