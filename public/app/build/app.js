(function() {

    'use strict';

    angular
        .module('app', [
            'ui.router',
            'restangular',
            'angularUtils.directives.dirPagination'
        ]);

})();
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
    config.$inject = ["$urlRouterProvider", "$stateProvider", "RestangularProvider"];

})();


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
    config.$inject = ["$stateProvider"];

})();
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
    config.$inject = ["$stateProvider"];

})();
(function() {

    'use strict';

    angular
        .module('app')
        .config(config);

    function config($stateProvider) {

        var local_url = 'app/scripts/modules/user/views/';

        $stateProvider
            .state('register', {
                url : '/register',
                templateUrl : local_url + 'user.register.html',
                controller: 'AuthenticationController'
            })
            .state('login', {
                url : '/login',
                templateUrl : local_url + 'user.login.html',
                controller: 'AuthenticationController'
            });

    }
    config.$inject = ["$stateProvider"];

})();
(function() {

    'use strict';

    angular
        .module('app')
        .controller('CompanyController', companyController);

    function companyController($scope) {

    }
    companyController.$inject = ["$scope"];

})();
(function() {

    'use strict';

    angular
        .module('app')
        .controller('ProjectController', projectController);

    function projectController($scope) {

    }
    projectController.$inject = ["$scope"];

})();
(function() {

    'use strict';

    angular
        .module('app')
        .controller('AuthenticationController', authenticationController);

    function authenticationController($scope) {

    }
    authenticationController.$inject = ["$scope"];

})();
(function() {

    'use strict';

    angular
        .module('app')
        .factory('CompanyService', companyService);

    function companyService(Restangular) {

        /**
         * GET /api/v1/companies
         */
        var _companyService = Restangular.all('companies');

        return {

            getAll: function () {
                return _companyService.getList();
            },

            getById: function (id) {
                return _companyService.get(id);
            },

            create: function (data) {
                return _companyService.post(data).then(function () {
                    console.log(data);
                });

            },

            update: function (id) {
                _companyService.get(id).then(function (blog) {
                    var editBlog = Restangular.copy(blog);
                    editBlog.title = "NEWER title";
                    editBlog.put(); // or save

                });

                return $http.put(base_url + local_url + id);
            },

            delete: function (blog) {
                blog.remove().then(function () {
                    console.log('blog deleted');
                });
            }

        }

    }
    companyService.$inject = ["Restangular"];

})();
(function() {

    'use strict';

    angular
        .module('app')
        .factory('ProjectService', projectService);

    function projectService(Restangular) {

        /**
         * GET /api/v1/projects
         */
        var _projectService = Restangular.all('projects');

        return {

            getAll: function () {
                return _projectService.getList();
            },

            getById: function (id) {
                return _projectService.get(id);
            },

            create: function (data) {
                return _projectService.post(data).then(function () {
                    console.log(data);
                });

            },

            update: function (id) {
                _projectService.get(id).then(function (blog) {
                    var editBlog = Restangular.copy(blog);
                    editBlog.title = "NEWER title";
                    editBlog.put(); // or save

                });

                return $http.put(base_url + local_url + id);
            },

            delete: function (blog) {
                blog.remove().then(function () {
                    console.log('blog deleted');
                });
            }

        }

    }
    projectService.$inject = ["Restangular"];

})();
(function() {

    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', authenticationService);

    function authenticationService(Restangular) {

        /**
         * GET /api/v1/users
         */
        var _authenticationService = Restangular.all('users');

        return {

            register : function(credentials)
            {
                return _authenticationService.post(data).then(function() {
                    console.log(data);
                });
            },

            login : function(credentials)
            {
                return _authenticationService.post(data).then(function() {
                    console.log(data);
                });
            },

            logout : function()
            {
                return _authenticationService.post(data).then(function() {
                    console.log(data);
                });
            },

            getAuthUser : function()
            {
                return null;
            }

        };

    }
    authenticationService.$inject = ["Restangular"];

})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb25maWcuanMiLCJyb3V0ZXMvYXBwLXJvdXRlcy5jb25maWcuanMiLCJyb3V0ZXMvY29uZmlnL2NvbXBhbnktcm91dGVzLmNvbmZpZy5qcyIsInJvdXRlcy9jb25maWcvcHJvamVjdC1yb3V0ZXMuY29uZmlnLmpzIiwicm91dGVzL2NvbmZpZy91c2VyLXJvdXRlcy5jb25maWcuanMiLCJtb2R1bGVzL2NvbXBhbnkvY29udHJvbGxlcnMvY29tcGFueS5jb250cm9sbGVyLmpzIiwibW9kdWxlcy9wcm9qZWN0L2NvbnRyb2xsZXJzL3Byb2plY3QuY29udHJvbGxlci5qcyIsIm1vZHVsZXMvdXNlci9jb250cm9sbGVycy9hdXRoZW50aWNhdGlvbi5jb250cm9sbGVyLmpzIiwibW9kdWxlcy9jb21wYW55L3NlcnZpY2VzL2NvbXBhbnkuZmFjdG9yeS5qcyIsIm1vZHVsZXMvcHJvamVjdC9zZXJ2aWNlcy9wcm9qZWN0LmZhY3RvcnkuanMiLCJtb2R1bGVzL3VzZXIvc2VydmljZXMvYXV0aGVudGljYXRpb24uZmFjdG9yeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxDQUFBLFdBQUE7O0lBRUE7O0lBRUE7U0FDQSxPQUFBLE9BQUE7WUFDQTtZQUNBO1lBQ0E7Ozs7QUNSQSxDQUFBLFdBQUE7O0lBRUE7O0lBRUE7U0FDQSxPQUFBO1NBQ0EsT0FBQTs7SUFFQSxTQUFBLE9BQUEsb0JBQUEsZ0JBQUEscUJBQUE7O1FBRUEsb0JBQUEsV0FBQTs7UUFFQTthQUNBLFVBQUE7O1FBRUE7YUFDQSxNQUFBLFFBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxNQUFBO2dCQUNBLFlBQUE7Z0JBQ0EsU0FBQTtvQkFDQSxJQUFBOzs7YUFHQSxNQUFBLFFBQUE7Z0JBQ0EsTUFBQTtnQkFDQSxjQUFBOzs7Ozs7Ozs7QUMxQkEsQ0FBQSxXQUFBOztJQUVBOztJQUVBO1NBQ0EsT0FBQTtTQUNBLE9BQUE7O0lBRUEsU0FBQSxPQUFBLGdCQUFBOztRQUVBLElBQUEsWUFBQTs7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QUE7Z0JBQ0EsS0FBQSxTQUFBLEtBQUEsWUFBQTtvQkFDQSxRQUFBLElBQUE7Ozs7Ozs7Ozs7QUM3Q0EsQ0FBQSxXQUFBOztJQUVBOztJQUVBO1NBQ0EsT0FBQTtTQUNBLFFBQUEseUJBQUE7O0lBRUEsU0FBQSxzQkFBQSxhQUFBOzs7OztRQUtBLElBQUEseUJBQUEsWUFBQSxJQUFBOztRQUVBLE9BQUE7O1lBRUEsV0FBQSxTQUFBO1lBQ0E7Z0JBQ0EsT0FBQSx1QkFBQSxLQUFBLE1BQUEsS0FBQSxXQUFBO29CQUNBLFFBQUEsSUFBQTs7OztZQUlBLFFBQUEsU0FBQTtZQUNBO2dCQUNBLE9BQUEsdUJBQUEsS0FBQSxNQUFBLEtBQUEsV0FBQTtvQkFDQSxRQUFBLElBQUE7Ozs7WUFJQSxTQUFBO1lBQ0E7Z0JBQ0EsT0FBQSx1QkFBQSxLQUFBLE1BQUEsS0FBQSxXQUFBO29CQUNBLFFBQUEsSUFBQTs7OztZQUlBLGNBQUE7WUFDQTtnQkFDQSxPQUFBOzs7Ozs7OztLQU9BIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcclxuXHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcCcsIFtcclxuICAgICAgICAgICAgJ3VpLnJvdXRlcicsXHJcbiAgICAgICAgICAgICdyZXN0YW5ndWxhcicsXHJcbiAgICAgICAgICAgICdhbmd1bGFyVXRpbHMuZGlyZWN0aXZlcy5kaXJQYWdpbmF0aW9uJ1xyXG4gICAgICAgIF0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAnKVxyXG4gICAgICAgIC5jb25maWcoY29uZmlnKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjb25maWcoJHVybFJvdXRlclByb3ZpZGVyLCAkc3RhdGVQcm92aWRlciwgUmVzdGFuZ3VsYXJQcm92aWRlcikge1xyXG5cclxuICAgICAgICBSZXN0YW5ndWxhclByb3ZpZGVyLnNldEJhc2VVcmwoJy9hcGkvdjEnKTtcclxuXHJcbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyXHJcbiAgICAgICAgICAgIC5vdGhlcndpc2UoJy8nKTtcclxuXHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLnN0YXRlKCdtYWluJywge1xyXG4gICAgICAgICAgICAgICAgYWJzdHJhY3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB1cmwgOiAnJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdBdXRoZW50aWNhdGlvbkNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGhpOiAxXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnaG9tZScsIHtcclxuICAgICAgICAgICAgICAgIHVybCA6ICcvJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsIDogJ2FwcC9zY3JpcHRzL21vZHVsZXMvbGF5b3V0L3BhZ2VzL3BhZ2UuaG9tZS5odG1sJ1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG59KSgpO1xyXG5cclxuIiwiKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwJylcclxuICAgICAgICAuY29uZmlnKGNvbmZpZyk7XHJcblxyXG4gICAgZnVuY3Rpb24gY29uZmlnKCRzdGF0ZVByb3ZpZGVyKSB7XHJcblxyXG4gICAgICAgIHZhciBsb2NhbF91cmwgPSAnYXBwL3NjcmlwdHMvbW9kdWxlcy9jb21wYW55L3ZpZXdzLyc7XHJcblxyXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnY29tcGFuaWVzJywge1xyXG4gICAgICAgICAgICAgICAgdXJsIDogJy9jb21wYW5pZXMnLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmwgOiBsb2NhbF91cmwgKyAnY29tcGFueS5pbmRleC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDb21wYW55Q29udHJvbGxlcidcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXRlKCdjb21wYW55U2hvdycsIHtcclxuICAgICAgICAgICAgICAgIHVybCA6ICcvY29tcGFuaWVzLzpjb21wYW55SWQnLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmwgOiBsb2NhbF91cmwgKyAnY29tcGFueS5zaG93Lmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NvbXBhbnlDb250cm9sbGVyJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhdGUoJ2NvbXBhbnlFZGl0Jywge1xyXG4gICAgICAgICAgICAgICAgdXJsIDogJy9jb21wYW5pZXMvOmNvbXBhbnlJZC9lZGl0JyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsIDogbG9jYWxfdXJsICsgJ2NvbXBhbnkuZWRpdC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDb21wYW55Q29udHJvbGxlcidcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAnKVxyXG4gICAgICAgIC5jb25maWcoY29uZmlnKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjb25maWcoJHN0YXRlUHJvdmlkZXIpIHtcclxuXHJcbiAgICAgICAgdmFyIGxvY2FsX3VybCA9ICdhcHAvc2NyaXB0cy9tb2R1bGVzL3Byb2plY3Qvdmlld3MvJztcclxuXHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLnN0YXRlKCdwcm9qZWN0cycsIHtcclxuICAgICAgICAgICAgICAgIHVybCA6ICcvcHJvamVjdHMnLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmwgOiBsb2NhbF91cmwgKyAncHJvamVjdC5pbmRleC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdQcm9qZWN0Q29udHJvbGxlcidcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXRlKCdwcm9qZWN0U2hvdycsIHtcclxuICAgICAgICAgICAgICAgIHVybCA6ICcvcHJvamVjdHMvOnByb2plY3RJZCcsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybCA6IGxvY2FsX3VybCArICdwcm9qZWN0LnNob3cuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnUHJvamVjdENvbnRyb2xsZXInXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgncHJvamVjdEVkaXQnLCB7XHJcbiAgICAgICAgICAgICAgICB1cmwgOiAnL3Byb2plY3RzLzpwcm9qZWN0SWQvZWRpdCcsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybCA6IGxvY2FsX3VybCArICdwcm9qZWN0LmVkaXQuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnUHJvamVjdENvbnRyb2xsZXInXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwJylcclxuICAgICAgICAuY29uZmlnKGNvbmZpZyk7XHJcblxyXG4gICAgZnVuY3Rpb24gY29uZmlnKCRzdGF0ZVByb3ZpZGVyKSB7XHJcblxyXG4gICAgICAgIHZhciBsb2NhbF91cmwgPSAnYXBwL3NjcmlwdHMvbW9kdWxlcy91c2VyL3ZpZXdzLyc7XHJcblxyXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgIC5zdGF0ZSgncmVnaXN0ZXInLCB7XHJcbiAgICAgICAgICAgICAgICB1cmwgOiAnL3JlZ2lzdGVyJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsIDogbG9jYWxfdXJsICsgJ3VzZXIucmVnaXN0ZXIuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQXV0aGVudGljYXRpb25Db250cm9sbGVyJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhdGUoJ2xvZ2luJywge1xyXG4gICAgICAgICAgICAgICAgdXJsIDogJy9sb2dpbicsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybCA6IGxvY2FsX3VybCArICd1c2VyLmxvZ2luLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0F1dGhlbnRpY2F0aW9uQ29udHJvbGxlcidcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAnKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdDb21wYW55Q29udHJvbGxlcicsIGNvbXBhbnlDb250cm9sbGVyKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjb21wYW55Q29udHJvbGxlcigkc2NvcGUpIHtcclxuXHJcbiAgICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuXHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcCcpXHJcbiAgICAgICAgLmNvbnRyb2xsZXIoJ1Byb2plY3RDb250cm9sbGVyJywgcHJvamVjdENvbnRyb2xsZXIpO1xyXG5cclxuICAgIGZ1bmN0aW9uIHByb2plY3RDb250cm9sbGVyKCRzY29wZSkge1xyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwJylcclxuICAgICAgICAuY29udHJvbGxlcignQXV0aGVudGljYXRpb25Db250cm9sbGVyJywgYXV0aGVudGljYXRpb25Db250cm9sbGVyKTtcclxuXHJcbiAgICBmdW5jdGlvbiBhdXRoZW50aWNhdGlvbkNvbnRyb2xsZXIoJHNjb3BlKSB7XHJcblxyXG4gICAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAnKVxyXG4gICAgICAgIC5mYWN0b3J5KCdDb21wYW55U2VydmljZScsIGNvbXBhbnlTZXJ2aWNlKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjb21wYW55U2VydmljZShSZXN0YW5ndWxhcikge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHRVQgL2FwaS92MS9jb21wYW5pZXNcclxuICAgICAgICAgKi9cclxuICAgICAgICB2YXIgX2NvbXBhbnlTZXJ2aWNlID0gUmVzdGFuZ3VsYXIuYWxsKCdjb21wYW5pZXMnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuXHJcbiAgICAgICAgICAgIGdldEFsbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jb21wYW55U2VydmljZS5nZXRMaXN0KCk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBnZXRCeUlkOiBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfY29tcGFueVNlcnZpY2UuZ2V0KGlkKTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfY29tcGFueVNlcnZpY2UucG9zdChkYXRhKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgICAgICAgICBfY29tcGFueVNlcnZpY2UuZ2V0KGlkKS50aGVuKGZ1bmN0aW9uIChibG9nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVkaXRCbG9nID0gUmVzdGFuZ3VsYXIuY29weShibG9nKTtcclxuICAgICAgICAgICAgICAgICAgICBlZGl0QmxvZy50aXRsZSA9IFwiTkVXRVIgdGl0bGVcIjtcclxuICAgICAgICAgICAgICAgICAgICBlZGl0QmxvZy5wdXQoKTsgLy8gb3Igc2F2ZVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cC5wdXQoYmFzZV91cmwgKyBsb2NhbF91cmwgKyBpZCk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBkZWxldGU6IGZ1bmN0aW9uIChibG9nKSB7XHJcbiAgICAgICAgICAgICAgICBibG9nLnJlbW92ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdibG9nIGRlbGV0ZWQnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuXHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcCcpXHJcbiAgICAgICAgLmZhY3RvcnkoJ1Byb2plY3RTZXJ2aWNlJywgcHJvamVjdFNlcnZpY2UpO1xyXG5cclxuICAgIGZ1bmN0aW9uIHByb2plY3RTZXJ2aWNlKFJlc3Rhbmd1bGFyKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdFVCAvYXBpL3YxL3Byb2plY3RzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdmFyIF9wcm9qZWN0U2VydmljZSA9IFJlc3Rhbmd1bGFyLmFsbCgncHJvamVjdHMnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuXHJcbiAgICAgICAgICAgIGdldEFsbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9wcm9qZWN0U2VydmljZS5nZXRMaXN0KCk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBnZXRCeUlkOiBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfcHJvamVjdFNlcnZpY2UuZ2V0KGlkKTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfcHJvamVjdFNlcnZpY2UucG9zdChkYXRhKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgICAgICAgICBfcHJvamVjdFNlcnZpY2UuZ2V0KGlkKS50aGVuKGZ1bmN0aW9uIChibG9nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVkaXRCbG9nID0gUmVzdGFuZ3VsYXIuY29weShibG9nKTtcclxuICAgICAgICAgICAgICAgICAgICBlZGl0QmxvZy50aXRsZSA9IFwiTkVXRVIgdGl0bGVcIjtcclxuICAgICAgICAgICAgICAgICAgICBlZGl0QmxvZy5wdXQoKTsgLy8gb3Igc2F2ZVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cC5wdXQoYmFzZV91cmwgKyBsb2NhbF91cmwgKyBpZCk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBkZWxldGU6IGZ1bmN0aW9uIChibG9nKSB7XHJcbiAgICAgICAgICAgICAgICBibG9nLnJlbW92ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdibG9nIGRlbGV0ZWQnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuXHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcCcpXHJcbiAgICAgICAgLmZhY3RvcnkoJ0F1dGhlbnRpY2F0aW9uU2VydmljZScsIGF1dGhlbnRpY2F0aW9uU2VydmljZSk7XHJcblxyXG4gICAgZnVuY3Rpb24gYXV0aGVudGljYXRpb25TZXJ2aWNlKFJlc3Rhbmd1bGFyKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdFVCAvYXBpL3YxL3VzZXJzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdmFyIF9hdXRoZW50aWNhdGlvblNlcnZpY2UgPSBSZXN0YW5ndWxhci5hbGwoJ3VzZXJzJyk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcblxyXG4gICAgICAgICAgICByZWdpc3RlciA6IGZ1bmN0aW9uKGNyZWRlbnRpYWxzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX2F1dGhlbnRpY2F0aW9uU2VydmljZS5wb3N0KGRhdGEpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGxvZ2luIDogZnVuY3Rpb24oY3JlZGVudGlhbHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfYXV0aGVudGljYXRpb25TZXJ2aWNlLnBvc3QoZGF0YSkudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgbG9nb3V0IDogZnVuY3Rpb24oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX2F1dGhlbnRpY2F0aW9uU2VydmljZS5wb3N0KGRhdGEpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGdldEF1dGhVc2VyIDogZnVuY3Rpb24oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9