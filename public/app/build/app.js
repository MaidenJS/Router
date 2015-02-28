(function() {

    'use strict';

    angular
        .module('app', [
            // wiseproject(wp) sub modules/dependencies
            'wp.company',

            // external dependencies
            'ui.router',
            'restangular',
            'ngAnimate'
        ]);

})();
(function() {

    'use strict';

    angular
        .module('wp.company', [
            'ui.router',
            'restangular'
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
    run.$inject = ["Restangular"];

})();
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
        .module('wp.company')
        .controller('CompanyCreateController', CompanyCreateController);

    function CompanyCreateController() {

        var vm = this;

        vm.createCompany = function()
        {
            console.log('creating a company now');
        }

    }

})();
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
    CompanyEditController.$inject = ["companyService", "$stateParams"];

})();
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
    CompanyIndexController.$inject = ["companyService"];

})();
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
    CompanyShowController.$inject = ["companyService", "$stateParams"];

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
        .module('wp.company')
        .factory('companyService', companyService);

    function companyService(Restangular) {

        /**
         * GET /api/v1/companies
         */
        var _companyService = Restangular.all('companies');

        return {
            getAll: getAll,
            getById: getById,
            create: create,
            update: update,
            destroy: destroy
        };

        function getAll()
        {
            return _companyService.getList();
        }

        function getById(id)
        {
            return _companyService.get(id);
        }

        function create(data)
        {
            return _companyService.post(data)
                .then(function(data) {
                    return data.data
            });
        }

        function update(id)
        {
            _companyService.get(id).then(function (blog) {
                var editBlog = Restangular.copy(blog);
                editBlog.title = "NEWER title";
                editBlog.put(); // or save
            });

            return $http.put(base_url + local_url + id);
        }

        function destroy(company)
        {
            company.remove().then(function () {
                console.log('blog deleted');
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJtb2R1bGVzL2NvbXBhbnkvY29tcGFueS5tb2R1bGUuanMiLCJjb25maWcvYXBwLXJvdXRlcy5jb25maWcuanMiLCJjb25maWcvYXBwLXJ1bi5jb25maWcuanMiLCJtb2R1bGVzL2NvbXBhbnkvY29tcGFueS1yb3V0ZXMuY29uZmlnLmpzIiwibW9kdWxlcy9wcm9qZWN0L3Byb2plY3Qtcm91dGVzLmNvbmZpZy5qcyIsIm1vZHVsZXMvdXNlci91c2VyLXJvdXRlcy5jb25maWcuanMiLCJtb2R1bGVzL2NvbXBhbnkvY3JlYXRlL2NvbXBhbnkuY3JlYXRlLmNvbnRyb2xsZXIuanMiLCJtb2R1bGVzL2NvbXBhbnkvZWRpdC9jb21wYW55LmVkaXQuY29udHJvbGxlci5qcyIsIm1vZHVsZXMvY29tcGFueS9pbmRleC9jb21wYW55LmluZGV4LmNvbnRyb2xsZXIuanMiLCJtb2R1bGVzL2NvbXBhbnkvc2hvdy9jb21wYW55LnNob3cuY29udHJvbGxlci5qcyIsIm1vZHVsZXMvcHJvamVjdC9jb250cm9sbGVycy9wcm9qZWN0LmNvbnRyb2xsZXIuanMiLCJtb2R1bGVzL3VzZXIvY29udHJvbGxlcnMvYXV0aGVudGljYXRpb24uY29udHJvbGxlci5qcyIsIm1vZHVsZXMvY29tcGFueS9zZXJ2aWNlcy9jb21wYW55LmZhY3RvcnkuanMiLCJtb2R1bGVzL3Byb2plY3Qvc2VydmljZXMvcHJvamVjdC5mYWN0b3J5LmpzIiwibW9kdWxlcy91c2VyL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLmZhY3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQ0FBQSxXQUFBOztJQUVBOztJQUVBO1NBQ0EsT0FBQSxPQUFBOztZQUVBOzs7WUFHQTtZQUNBO1lBQ0E7Ozs7QUNaQSxDQUFBLFdBQUE7O0lBRUE7O0lBRUE7U0FDQSxPQUFBLGNBQUE7WUFDQTtZQUNBOzs7O0FDUEEsQ0FBQSxXQUFBOztJQUVBOztJQUVBO1NBQ0EsT0FBQTtTQUNB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dXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcCcsIFtcclxuICAgICAgICAgICAgLy8gd2lzZXByb2plY3Qod3ApIHN1YiBtb2R1bGVzL2RlcGVuZGVuY2llc1xyXG4gICAgICAgICAgICAnd3AuY29tcGFueScsXHJcblxyXG4gICAgICAgICAgICAvLyBleHRlcm5hbCBkZXBlbmRlbmNpZXNcclxuICAgICAgICAgICAgJ3VpLnJvdXRlcicsXHJcbiAgICAgICAgICAgICdyZXN0YW5ndWxhcicsXHJcbiAgICAgICAgICAgICduZ0FuaW1hdGUnXHJcbiAgICAgICAgXSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuXHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3dwLmNvbXBhbnknLCBbXHJcbiAgICAgICAgICAgICd1aS5yb3V0ZXInLFxyXG4gICAgICAgICAgICAncmVzdGFuZ3VsYXInXHJcbiAgICAgICAgXSk7XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuXHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcCcpXHJcbiAgICAgICAgLmNvbmZpZyhjb25maWcpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNvbmZpZygkdXJsUm91dGVyUHJvdmlkZXIsICRzdGF0ZVByb3ZpZGVyLCBSZXN0YW5ndWxhclByb3ZpZGVyKSB7XHJcblxyXG4gICAgICAgIFJlc3Rhbmd1bGFyUHJvdmlkZXIuc2V0QmFzZVVybCgnL2FwaS92MScpO1xyXG5cclxuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXJcclxuICAgICAgICAgICAgLm90aGVyd2lzZSgnLycpO1xyXG5cclxuICAgICAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgICAgICAuc3RhdGUoJ21haW4nLCB7XHJcbiAgICAgICAgICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHVybCA6ICcnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0F1dGhlbnRpY2F0aW9uQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGk6IDFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXRlKCdob21lJywge1xyXG4gICAgICAgICAgICAgICAgdXJsIDogJy8nLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmwgOiAnYXBwL3NjcmlwdHMvbW9kdWxlcy9sYXlvdXQvcGFnZXMvcGFnZS5ob21lLmh0bWwnXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7XHJcblxyXG4iLCIoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAnKVxyXG4gICAgICAgIC5ydW4ocnVuKTtcclxuXHJcbiAgICBmdW5jdGlvbiBydW4oUmVzdGFuZ3VsYXIpIHtcclxuXHJcbiAgICAgICAgUmVzdGFuZ3VsYXIuYWRkUmVzcG9uc2VJbnRlcmNlcHRvcihmdW5jdGlvbihkYXRhLCBvcGVyYXRpb24sIHdoYXQsIHJlc3BvbnNlLCBkZWZlcnJlZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCcrKysrKysrKysrIGFkZFJlc3BvbnNlSW50ZXJjZXB0b3IgKysrKysrKysrKycpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tLS0tLS0tLSBEYXRhIC0tLS0tLS0tLS0nKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tIE9wZXJhdGlvbiAtLS0tLS0tLS0tJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG9wZXJhdGlvbik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tIFdoYXQgLS0tLS0tLS0tLScpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh3aGF0KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0gUmVzcG9uc2UgLS0tLS0tLS0tLScpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tIERlZmVycmVkIC0tLS0tLS0tLS0nKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGVmZXJyZWQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysnKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhLmRhdGE7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuXHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3dwLmNvbXBhbnknKVxyXG4gICAgICAgIC5jb25maWcoY29uZmlnKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjb25maWcoJHN0YXRlUHJvdmlkZXIpIHtcclxuXHJcbiAgICAgICAgdmFyIGRpcmVjdG9yeSA9ICdhcHAvc2NyaXB0cy9tb2R1bGVzL2NvbXBhbnkvJztcclxuXHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLnN0YXRlKCdjb21wYW5pZXMnLCB7XHJcbiAgICAgICAgICAgICAgICB1cmwgOiAnL2NvbXBhbmllcycsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybCA6IGRpcmVjdG9yeSArICdpbmRleC9jb21wYW55LmluZGV4Lmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NvbXBhbnlJbmRleENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnY29tcGFueUNyZWF0ZScsIHtcclxuICAgICAgICAgICAgICAgIHVybCA6ICcvY29tcGFuaWVzL2NyZWF0ZScsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybCA6IGRpcmVjdG9yeSArICdjcmVhdGUvY29tcGFueS5jcmVhdGUuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ29tcGFueUNyZWF0ZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnY29tcGFueVNob3cnLCB7XHJcbiAgICAgICAgICAgICAgICB1cmwgOiAnL2NvbXBhbmllcy86Y29tcGFueUlkJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsIDogZGlyZWN0b3J5ICsgJ3Nob3cvY29tcGFueS5zaG93Lmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NvbXBhbnlTaG93Q29udHJvbGxlcicsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bSdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXRlKCdjb21wYW55RWRpdCcsIHtcclxuICAgICAgICAgICAgICAgIHVybCA6ICcvY29tcGFuaWVzLzpjb21wYW55SWQvZWRpdCcsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybCA6IGRpcmVjdG9yeSArICdlZGl0L2NvbXBhbnkuZWRpdC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDb21wYW55RWRpdENvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwJylcclxuICAgICAgICAuY29uZmlnKGNvbmZpZyk7XHJcblxyXG4gICAgZnVuY3Rpb24gY29uZmlnKCRzdGF0ZVByb3ZpZGVyKSB7XHJcblxyXG4gICAgICAgIHZhciBsb2NhbF91cmwgPSAnYXBwL3NjcmlwdHMvbW9kdWxlcy9wcm9qZWN0L3ZpZXdzLyc7XHJcblxyXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgIC5zdGF0ZSgncHJvamVjdHMnLCB7XHJcbiAgICAgICAgICAgICAgICB1cmwgOiAnL3Byb2plY3RzJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsIDogbG9jYWxfdXJsICsgJ3Byb2plY3QuaW5kZXguaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnUHJvamVjdENvbnRyb2xsZXInXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgncHJvamVjdFNob3cnLCB7XHJcbiAgICAgICAgICAgICAgICB1cmwgOiAnL3Byb2plY3RzLzpwcm9qZWN0SWQnLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmwgOiBsb2NhbF91cmwgKyAncHJvamVjdC5zaG93Lmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ1Byb2plY3RDb250cm9sbGVyJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhdGUoJ3Byb2plY3RFZGl0Jywge1xyXG4gICAgICAgICAgICAgICAgdXJsIDogJy9wcm9qZWN0cy86cHJvamVjdElkL2VkaXQnLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmwgOiBsb2NhbF91cmwgKyAncHJvamVjdC5lZGl0Lmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ1Byb2plY3RDb250cm9sbGVyJ1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuXHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcCcpXHJcbiAgICAgICAgLmNvbmZpZyhjb25maWcpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNvbmZpZygkc3RhdGVQcm92aWRlcikge1xyXG5cclxuICAgICAgICB2YXIgbG9jYWxfdXJsID0gJ2FwcC9zY3JpcHRzL21vZHVsZXMvdXNlci92aWV3cy8nO1xyXG5cclxuICAgICAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgICAgICAuc3RhdGUoJ3JlZ2lzdGVyJywge1xyXG4gICAgICAgICAgICAgICAgdXJsIDogJy9yZWdpc3RlcicsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybCA6IGxvY2FsX3VybCArICd1c2VyLnJlZ2lzdGVyLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0F1dGhlbnRpY2F0aW9uQ29udHJvbGxlcidcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXRlKCdsb2dpbicsIHtcclxuICAgICAgICAgICAgICAgIHVybCA6ICcvbG9naW4nLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmwgOiBsb2NhbF91cmwgKyAndXNlci5sb2dpbi5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdBdXRoZW50aWNhdGlvbkNvbnRyb2xsZXInXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnd3AuY29tcGFueScpXHJcbiAgICAgICAgLmNvbnRyb2xsZXIoJ0NvbXBhbnlDcmVhdGVDb250cm9sbGVyJywgQ29tcGFueUNyZWF0ZUNvbnRyb2xsZXIpO1xyXG5cclxuICAgIGZ1bmN0aW9uIENvbXBhbnlDcmVhdGVDb250cm9sbGVyKCkge1xyXG5cclxuICAgICAgICB2YXIgdm0gPSB0aGlzO1xyXG5cclxuICAgICAgICB2bS5jcmVhdGVDb21wYW55ID0gZnVuY3Rpb24oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NyZWF0aW5nIGEgY29tcGFueSBub3cnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCd3cC5jb21wYW55JylcclxuICAgICAgICAuY29udHJvbGxlcignQ29tcGFueUVkaXRDb250cm9sbGVyJywgQ29tcGFueUVkaXRDb250cm9sbGVyKTtcclxuXHJcbiAgICBmdW5jdGlvbiBDb21wYW55RWRpdENvbnRyb2xsZXIoY29tcGFueVNlcnZpY2UsICRzdGF0ZVBhcmFtcykge1xyXG5cclxuICAgICAgICB2YXIgdm0gPSB0aGlzO1xyXG5cclxuICAgICAgICBhY3RpdmF0ZSgpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBhY3RpdmF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2bS5jb21wYW55ID0gY29tcGFueVNlcnZpY2UuZ2V0QnlJZCgkc3RhdGVQYXJhbXMuY29tcGFueUlkKS4kb2JqZWN0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuXHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3dwLmNvbXBhbnknKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdDb21wYW55SW5kZXhDb250cm9sbGVyJywgQ29tcGFueUluZGV4Q29udHJvbGxlcik7XHJcblxyXG4gICAgZnVuY3Rpb24gQ29tcGFueUluZGV4Q29udHJvbGxlcihjb21wYW55U2VydmljZSkge1xyXG5cclxuICAgICAgICB2YXIgdm0gPSB0aGlzO1xyXG5cclxuICAgICAgICBhY3RpdmF0ZSgpO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBhY3RpdmF0ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2bS5jb21wYW5pZXMgPSBjb21wYW55U2VydmljZS5nZXRBbGwoKS4kb2JqZWN0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm0uZGVsZXRlQ29tcGFueSA9IGZ1bmN0aW9uKGNvbXBhbnlJZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGNvbXBhbnlJZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnd3AuY29tcGFueScpXHJcbiAgICAgICAgLmNvbnRyb2xsZXIoJ0NvbXBhbnlTaG93Q29udHJvbGxlcicsIENvbXBhbnlTaG93Q29udHJvbGxlcik7XHJcblxyXG4gICAgZnVuY3Rpb24gQ29tcGFueVNob3dDb250cm9sbGVyKGNvbXBhbnlTZXJ2aWNlLCAkc3RhdGVQYXJhbXMpIHtcclxuXHJcbiAgICAgICAgdmFyIHZtID0gdGhpcztcclxuXHJcbiAgICAgICAgYWN0aXZhdGUoKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWN0aXZhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdm0uY29tcGFueSA9IGNvbXBhbnlTZXJ2aWNlLmdldEJ5SWQoJHN0YXRlUGFyYW1zLmNvbXBhbnlJZCkuJG9iamVjdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAnKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdQcm9qZWN0Q29udHJvbGxlcicsIHByb2plY3RDb250cm9sbGVyKTtcclxuXHJcbiAgICBmdW5jdGlvbiBwcm9qZWN0Q29udHJvbGxlcigkc2NvcGUpIHtcclxuXHJcbiAgICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuXHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcCcpXHJcbiAgICAgICAgLmNvbnRyb2xsZXIoJ0F1dGhlbnRpY2F0aW9uQ29udHJvbGxlcicsIGF1dGhlbnRpY2F0aW9uQ29udHJvbGxlcik7XHJcblxyXG4gICAgZnVuY3Rpb24gYXV0aGVudGljYXRpb25Db250cm9sbGVyKCRzY29wZSkge1xyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnd3AuY29tcGFueScpXHJcbiAgICAgICAgLmZhY3RvcnkoJ2NvbXBhbnlTZXJ2aWNlJywgY29tcGFueVNlcnZpY2UpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNvbXBhbnlTZXJ2aWNlKFJlc3Rhbmd1bGFyKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdFVCAvYXBpL3YxL2NvbXBhbmllc1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHZhciBfY29tcGFueVNlcnZpY2UgPSBSZXN0YW5ndWxhci5hbGwoJ2NvbXBhbmllcycpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBnZXRBbGw6IGdldEFsbCxcclxuICAgICAgICAgICAgZ2V0QnlJZDogZ2V0QnlJZCxcclxuICAgICAgICAgICAgY3JlYXRlOiBjcmVhdGUsXHJcbiAgICAgICAgICAgIHVwZGF0ZTogdXBkYXRlLFxyXG4gICAgICAgICAgICBkZXN0cm95OiBkZXN0cm95XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0QWxsKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBfY29tcGFueVNlcnZpY2UuZ2V0TGlzdCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0QnlJZChpZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBfY29tcGFueVNlcnZpY2UuZ2V0KGlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZShkYXRhKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9jb21wYW55U2VydmljZS5wb3N0KGRhdGEpXHJcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuZGF0YVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZShpZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9jb21wYW55U2VydmljZS5nZXQoaWQpLnRoZW4oZnVuY3Rpb24gKGJsb2cpIHtcclxuICAgICAgICAgICAgICAgIHZhciBlZGl0QmxvZyA9IFJlc3Rhbmd1bGFyLmNvcHkoYmxvZyk7XHJcbiAgICAgICAgICAgICAgICBlZGl0QmxvZy50aXRsZSA9IFwiTkVXRVIgdGl0bGVcIjtcclxuICAgICAgICAgICAgICAgIGVkaXRCbG9nLnB1dCgpOyAvLyBvciBzYXZlXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnB1dChiYXNlX3VybCArIGxvY2FsX3VybCArIGlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGRlc3Ryb3koY29tcGFueSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbXBhbnkucmVtb3ZlKCkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnYmxvZyBkZWxldGVkJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuXHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcCcpXHJcbiAgICAgICAgLmZhY3RvcnkoJ1Byb2plY3RTZXJ2aWNlJywgcHJvamVjdFNlcnZpY2UpO1xyXG5cclxuICAgIGZ1bmN0aW9uIHByb2plY3RTZXJ2aWNlKFJlc3Rhbmd1bGFyKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdFVCAvYXBpL3YxL3Byb2plY3RzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdmFyIF9wcm9qZWN0U2VydmljZSA9IFJlc3Rhbmd1bGFyLmFsbCgncHJvamVjdHMnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuXHJcbiAgICAgICAgICAgIGdldEFsbDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9wcm9qZWN0U2VydmljZS5nZXRMaXN0KCk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBnZXRCeUlkOiBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfcHJvamVjdFNlcnZpY2UuZ2V0KGlkKTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGNyZWF0ZTogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfcHJvamVjdFNlcnZpY2UucG9zdChkYXRhKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIHVwZGF0ZTogZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgICAgICAgICBfcHJvamVjdFNlcnZpY2UuZ2V0KGlkKS50aGVuKGZ1bmN0aW9uIChibG9nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVkaXRCbG9nID0gUmVzdGFuZ3VsYXIuY29weShibG9nKTtcclxuICAgICAgICAgICAgICAgICAgICBlZGl0QmxvZy50aXRsZSA9IFwiTkVXRVIgdGl0bGVcIjtcclxuICAgICAgICAgICAgICAgICAgICBlZGl0QmxvZy5wdXQoKTsgLy8gb3Igc2F2ZVxyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cC5wdXQoYmFzZV91cmwgKyBsb2NhbF91cmwgKyBpZCk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBkZWxldGU6IGZ1bmN0aW9uIChibG9nKSB7XHJcbiAgICAgICAgICAgICAgICBibG9nLnJlbW92ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdibG9nIGRlbGV0ZWQnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuXHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcCcpXHJcbiAgICAgICAgLmZhY3RvcnkoJ0F1dGhlbnRpY2F0aW9uU2VydmljZScsIGF1dGhlbnRpY2F0aW9uU2VydmljZSk7XHJcblxyXG4gICAgZnVuY3Rpb24gYXV0aGVudGljYXRpb25TZXJ2aWNlKFJlc3Rhbmd1bGFyKSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdFVCAvYXBpL3YxL3VzZXJzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdmFyIF9hdXRoZW50aWNhdGlvblNlcnZpY2UgPSBSZXN0YW5ndWxhci5hbGwoJ3VzZXJzJyk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcblxyXG4gICAgICAgICAgICByZWdpc3RlciA6IGZ1bmN0aW9uKGNyZWRlbnRpYWxzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX2F1dGhlbnRpY2F0aW9uU2VydmljZS5wb3N0KGRhdGEpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGxvZ2luIDogZnVuY3Rpb24oY3JlZGVudGlhbHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfYXV0aGVudGljYXRpb25TZXJ2aWNlLnBvc3QoZGF0YSkudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgbG9nb3V0IDogZnVuY3Rpb24oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX2F1dGhlbnRpY2F0aW9uU2VydmljZS5wb3N0KGRhdGEpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGdldEF1dGhVc2VyIDogZnVuY3Rpb24oKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9O1xyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9