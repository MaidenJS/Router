(function() {

    'use strict';

    angular
        .module('app', [
            // wiseproject(wp) sub modules/dependencies
            'wp.company',

            // external dependencies
            'ui.router',
            'restangular'
            //'ngAnimate'
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

    function CompanyCreateController(companyService) {

        var vm = this;

        vm.companyData = {};

        vm.createCompany = function()
        {
            console.log('creating a company now');

            companyService.create(vm.companyData);
        }

    }
    CompanyCreateController.$inject = ["companyService"];

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
         * /api/v1/companies
         *
         */
        var _companyService = Restangular.all('companies');

        return {
            getAll: getAll,
            getById: getById,
            create: create,
            update: update,
            destroy: destroy
        };

        /**
         * GET /api/v1/companies
         *
         */
        function getAll()
        {
            return _companyService.getList();
        }

        /**
         * GET /api/v1/companies/{id}
         *
         * @param id
         *
         */
        function getById(id)
        {
            return _companyService.get(id);
        }

        /**
         * POST /api/v1/companies
         *
         * @param data
         *
         */
        function create(data)
        {
            return _companyService.post(data)
                .then(function(data) {
                    return data.data
                });
        }

        /**
         * PUT /api/v1/companies/{id}
         *
         * @param id
         *
         */
        function update(id, data)
        {
            _companyService.get(id).then(function (data) {
                var editBlog = Restangular.copy(data);
                editBlog.title = "NEWER title";
                editBlog.put(); // or save
            });

            return $http.put(base_url + local_url + id);
        }

        /**
         * DELETE /api/v1/companies/{id}
         *
         * @param company
         *
         */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJtb2R1bGVzL2NvbXBhbnkvY29tcGFueS5tb2R1bGUuanMiLCJjb25maWcvYXBwLXJvdXRlcy5jb25maWcuanMiLCJjb25maWcvYXBwLXJ1bi5jb25maWcuanMiLCJtb2R1bGVzL2NvbXBhbnkvY29tcGFueS1yb3V0ZXMuY29uZmlnLmpzIiwibW9kdWxlcy9wcm9qZWN0L3Byb2plY3Qtcm91dGVzLmNvbmZpZy5qcyIsIm1vZHVsZXMvdXNlci91c2VyLXJvdXRlcy5jb25maWcuanMiLCJtb2R1bGVzL2NvbXBhbnkvY3JlYXRlL2NvbXBhbnkuY3JlYXRlLmNvbnRyb2xsZXIuanMiLCJtb2R1bGVzL2NvbXBhbnkvZWRpdC9jb21wYW55LmVkaXQuY29udHJvbGxlci5qcyIsIm1vZHVsZXMvY29tcGFueS9pbmRleC9jb21wYW55LmluZGV4LmNvbnRyb2xsZXIuanMiLCJtb2R1bGVzL2NvbXBhbnkvc2hvdy9jb21wYW55LnNob3cuY29udHJvbGxlci5qcyIsIm1vZHVsZXMvcHJvamVjdC9jb250cm9sbGVycy9wcm9qZWN0LmNvbnRyb2xsZXIuanMiLCJtb2R1bGVzL3VzZXIvY29udHJvbGxlcnMvYXV0aGVudGljYXRpb24uY29udHJvbGxlci5qcyIsIm1vZHVsZXMvY29tcGFueS9zZXJ2aWNlcy9jb21wYW55LmZhY3RvcnkuanMiLCJtb2R1bGVzL3Byb2plY3Qvc2VydmljZXMvcHJvamVjdC5mYWN0b3J5LmpzIiwibW9kdWxlcy91c2VyL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLmZhY3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsQ0FBQSxXQUFBOztJQUVBOztJQUVBO1NBQ0EsT0FBQSxPQUFBOztZQUVBOzs7WUFHQTtZQUNBOzs7OztBQ1hBLENBQUEsV0FBQTs7SUFFQTs7SUFFQTtTQUNBLE9BQUEsY0FBQTtZQUNBO1lBQ0E7Ozs7QUNQQSxDQUFBLFdBQUE7O0lBRUE7O0lBRUE7U0FDQSxPQUFBO1NBQ0EsT0FB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Ozs7Ozs7OztLQU9BIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcclxuXHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcCcsIFtcclxuICAgICAgICAgICAgLy8gd2lzZXByb2plY3Qod3ApIHN1YiBtb2R1bGVzL2RlcGVuZGVuY2llc1xyXG4gICAgICAgICAgICAnd3AuY29tcGFueScsXHJcblxyXG4gICAgICAgICAgICAvLyBleHRlcm5hbCBkZXBlbmRlbmNpZXNcclxuICAgICAgICAgICAgJ3VpLnJvdXRlcicsXHJcbiAgICAgICAgICAgICdyZXN0YW5ndWxhcidcclxuICAgICAgICAgICAgLy8nbmdBbmltYXRlJ1xyXG4gICAgICAgIF0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCd3cC5jb21wYW55JywgW1xyXG4gICAgICAgICAgICAndWkucm91dGVyJyxcclxuICAgICAgICAgICAgJ3Jlc3Rhbmd1bGFyJ1xyXG4gICAgICAgIF0pO1xyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAnKVxyXG4gICAgICAgIC5jb25maWcoY29uZmlnKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjb25maWcoJHVybFJvdXRlclByb3ZpZGVyLCAkc3RhdGVQcm92aWRlciwgUmVzdGFuZ3VsYXJQcm92aWRlcikge1xyXG5cclxuICAgICAgICBSZXN0YW5ndWxhclByb3ZpZGVyLnNldEJhc2VVcmwoJy9hcGkvdjEnKTtcclxuXHJcbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyXHJcbiAgICAgICAgICAgIC5vdGhlcndpc2UoJy8nKTtcclxuXHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLnN0YXRlKCdtYWluJywge1xyXG4gICAgICAgICAgICAgICAgYWJzdHJhY3Q6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB1cmwgOiAnJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdBdXRoZW50aWNhdGlvbkNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZToge1xyXG4gICAgICAgICAgICAgICAgICAgIGhpOiAxXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnaG9tZScsIHtcclxuICAgICAgICAgICAgICAgIHVybCA6ICcvJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsIDogJ2FwcC9zY3JpcHRzL21vZHVsZXMvbGF5b3V0L3BhZ2VzL3BhZ2UuaG9tZS5odG1sJ1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG59KSgpO1xyXG5cclxuIiwiKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwJylcclxuICAgICAgICAucnVuKHJ1bik7XHJcblxyXG4gICAgZnVuY3Rpb24gcnVuKFJlc3Rhbmd1bGFyKSB7XHJcblxyXG4gICAgICAgIFJlc3Rhbmd1bGFyLmFkZFJlc3BvbnNlSW50ZXJjZXB0b3IoZnVuY3Rpb24oZGF0YSwgb3BlcmF0aW9uLCB3aGF0LCByZXNwb25zZSwgZGVmZXJyZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnKysrKysrKysrKyBhZGRSZXNwb25zZUludGVyY2VwdG9yICsrKysrKysrKysnKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJy0tLS0tLS0tLS0gRGF0YSAtLS0tLS0tLS0tJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tLS0tLS0tLSBPcGVyYXRpb24gLS0tLS0tLS0tLScpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhvcGVyYXRpb24pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tLS0tLS0tLSBXaGF0IC0tLS0tLS0tLS0nKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cod2hhdCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCctLS0tLS0tLS0tIFJlc3BvbnNlIC0tLS0tLS0tLS0nKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnLS0tLS0tLS0tLSBEZWZlcnJlZCAtLS0tLS0tLS0tJyk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRlZmVycmVkKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrJyk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZGF0YS5kYXRhO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCd3cC5jb21wYW55JylcclxuICAgICAgICAuY29uZmlnKGNvbmZpZyk7XHJcblxyXG4gICAgZnVuY3Rpb24gY29uZmlnKCRzdGF0ZVByb3ZpZGVyKSB7XHJcblxyXG4gICAgICAgIHZhciBkaXJlY3RvcnkgPSAnYXBwL3NjcmlwdHMvbW9kdWxlcy9jb21wYW55Lyc7XHJcblxyXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnY29tcGFuaWVzJywge1xyXG4gICAgICAgICAgICAgICAgdXJsIDogJy9jb21wYW5pZXMnLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmwgOiBkaXJlY3RvcnkgKyAnaW5kZXgvY29tcGFueS5pbmRleC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDb21wYW55SW5kZXhDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhdGUoJ2NvbXBhbnlDcmVhdGUnLCB7XHJcbiAgICAgICAgICAgICAgICB1cmwgOiAnL2NvbXBhbmllcy9jcmVhdGUnLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmwgOiBkaXJlY3RvcnkgKyAnY3JlYXRlL2NvbXBhbnkuY3JlYXRlLmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NvbXBhbnlDcmVhdGVDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhdGUoJ2NvbXBhbnlTaG93Jywge1xyXG4gICAgICAgICAgICAgICAgdXJsIDogJy9jb21wYW5pZXMvOmNvbXBhbnlJZCcsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybCA6IGRpcmVjdG9yeSArICdzaG93L2NvbXBhbnkuc2hvdy5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDb21wYW55U2hvd0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnY29tcGFueUVkaXQnLCB7XHJcbiAgICAgICAgICAgICAgICB1cmwgOiAnL2NvbXBhbmllcy86Y29tcGFueUlkL2VkaXQnLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmwgOiBkaXJlY3RvcnkgKyAnZWRpdC9jb21wYW55LmVkaXQuaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQ29tcGFueUVkaXRDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJ1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuXHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ2FwcCcpXHJcbiAgICAgICAgLmNvbmZpZyhjb25maWcpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNvbmZpZygkc3RhdGVQcm92aWRlcikge1xyXG5cclxuICAgICAgICB2YXIgbG9jYWxfdXJsID0gJ2FwcC9zY3JpcHRzL21vZHVsZXMvcHJvamVjdC92aWV3cy8nO1xyXG5cclxuICAgICAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgICAgICAuc3RhdGUoJ3Byb2plY3RzJywge1xyXG4gICAgICAgICAgICAgICAgdXJsIDogJy9wcm9qZWN0cycsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybCA6IGxvY2FsX3VybCArICdwcm9qZWN0LmluZGV4Lmh0bWwnLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ1Byb2plY3RDb250cm9sbGVyJ1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuc3RhdGUoJ3Byb2plY3RTaG93Jywge1xyXG4gICAgICAgICAgICAgICAgdXJsIDogJy9wcm9qZWN0cy86cHJvamVjdElkJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsIDogbG9jYWxfdXJsICsgJ3Byb2plY3Quc2hvdy5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdQcm9qZWN0Q29udHJvbGxlcidcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnN0YXRlKCdwcm9qZWN0RWRpdCcsIHtcclxuICAgICAgICAgICAgICAgIHVybCA6ICcvcHJvamVjdHMvOnByb2plY3RJZC9lZGl0JyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsIDogbG9jYWxfdXJsICsgJ3Byb2plY3QuZWRpdC5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdQcm9qZWN0Q29udHJvbGxlcidcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAnKVxyXG4gICAgICAgIC5jb25maWcoY29uZmlnKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjb25maWcoJHN0YXRlUHJvdmlkZXIpIHtcclxuXHJcbiAgICAgICAgdmFyIGxvY2FsX3VybCA9ICdhcHAvc2NyaXB0cy9tb2R1bGVzL3VzZXIvdmlld3MvJztcclxuXHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLnN0YXRlKCdyZWdpc3RlcicsIHtcclxuICAgICAgICAgICAgICAgIHVybCA6ICcvcmVnaXN0ZXInLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmwgOiBsb2NhbF91cmwgKyAndXNlci5yZWdpc3Rlci5odG1sJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdBdXRoZW50aWNhdGlvbkNvbnRyb2xsZXInXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5zdGF0ZSgnbG9naW4nLCB7XHJcbiAgICAgICAgICAgICAgICB1cmwgOiAnL2xvZ2luJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsIDogbG9jYWxfdXJsICsgJ3VzZXIubG9naW4uaHRtbCcsXHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQXV0aGVudGljYXRpb25Db250cm9sbGVyJ1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuXHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3dwLmNvbXBhbnknKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdDb21wYW55Q3JlYXRlQ29udHJvbGxlcicsIENvbXBhbnlDcmVhdGVDb250cm9sbGVyKTtcclxuXHJcbiAgICBmdW5jdGlvbiBDb21wYW55Q3JlYXRlQ29udHJvbGxlcihjb21wYW55U2VydmljZSkge1xyXG5cclxuICAgICAgICB2YXIgdm0gPSB0aGlzO1xyXG5cclxuICAgICAgICB2bS5jb21wYW55RGF0YSA9IHt9O1xyXG5cclxuICAgICAgICB2bS5jcmVhdGVDb21wYW55ID0gZnVuY3Rpb24oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NyZWF0aW5nIGEgY29tcGFueSBub3cnKTtcclxuXHJcbiAgICAgICAgICAgIGNvbXBhbnlTZXJ2aWNlLmNyZWF0ZSh2bS5jb21wYW55RGF0YSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnd3AuY29tcGFueScpXHJcbiAgICAgICAgLmNvbnRyb2xsZXIoJ0NvbXBhbnlFZGl0Q29udHJvbGxlcicsIENvbXBhbnlFZGl0Q29udHJvbGxlcik7XHJcblxyXG4gICAgZnVuY3Rpb24gQ29tcGFueUVkaXRDb250cm9sbGVyKGNvbXBhbnlTZXJ2aWNlLCAkc3RhdGVQYXJhbXMpIHtcclxuXHJcbiAgICAgICAgdmFyIHZtID0gdGhpcztcclxuXHJcbiAgICAgICAgYWN0aXZhdGUoKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWN0aXZhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdm0uY29tcGFueSA9IGNvbXBhbnlTZXJ2aWNlLmdldEJ5SWQoJHN0YXRlUGFyYW1zLmNvbXBhbnlJZCkuJG9iamVjdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCd3cC5jb21wYW55JylcclxuICAgICAgICAuY29udHJvbGxlcignQ29tcGFueUluZGV4Q29udHJvbGxlcicsIENvbXBhbnlJbmRleENvbnRyb2xsZXIpO1xyXG5cclxuICAgIGZ1bmN0aW9uIENvbXBhbnlJbmRleENvbnRyb2xsZXIoY29tcGFueVNlcnZpY2UpIHtcclxuXHJcbiAgICAgICAgdmFyIHZtID0gdGhpcztcclxuXHJcbiAgICAgICAgYWN0aXZhdGUoKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWN0aXZhdGUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdm0uY29tcGFuaWVzID0gY29tcGFueVNlcnZpY2UuZ2V0QWxsKCkuJG9iamVjdDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZtLmRlbGV0ZUNvbXBhbnkgPSBmdW5jdGlvbihjb21wYW55SWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhjb21wYW55SWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuXHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3dwLmNvbXBhbnknKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdDb21wYW55U2hvd0NvbnRyb2xsZXInLCBDb21wYW55U2hvd0NvbnRyb2xsZXIpO1xyXG5cclxuICAgIGZ1bmN0aW9uIENvbXBhbnlTaG93Q29udHJvbGxlcihjb21wYW55U2VydmljZSwgJHN0YXRlUGFyYW1zKSB7XHJcblxyXG4gICAgICAgIHZhciB2bSA9IHRoaXM7XHJcblxyXG4gICAgICAgIGFjdGl2YXRlKCk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFjdGl2YXRlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZtLmNvbXBhbnkgPSBjb21wYW55U2VydmljZS5nZXRCeUlkKCRzdGF0ZVBhcmFtcy5jb21wYW55SWQpLiRvYmplY3Q7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwJylcclxuICAgICAgICAuY29udHJvbGxlcignUHJvamVjdENvbnRyb2xsZXInLCBwcm9qZWN0Q29udHJvbGxlcik7XHJcblxyXG4gICAgZnVuY3Rpb24gcHJvamVjdENvbnRyb2xsZXIoJHNjb3BlKSB7XHJcblxyXG4gICAgfVxyXG5cclxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXJcclxuICAgICAgICAubW9kdWxlKCdhcHAnKVxyXG4gICAgICAgIC5jb250cm9sbGVyKCdBdXRoZW50aWNhdGlvbkNvbnRyb2xsZXInLCBhdXRoZW50aWNhdGlvbkNvbnRyb2xsZXIpO1xyXG5cclxuICAgIGZ1bmN0aW9uIGF1dGhlbnRpY2F0aW9uQ29udHJvbGxlcigkc2NvcGUpIHtcclxuXHJcbiAgICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuXHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3dwLmNvbXBhbnknKVxyXG4gICAgICAgIC5mYWN0b3J5KCdjb21wYW55U2VydmljZScsIGNvbXBhbnlTZXJ2aWNlKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjb21wYW55U2VydmljZShSZXN0YW5ndWxhcikge1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiAvYXBpL3YxL2NvbXBhbmllc1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdmFyIF9jb21wYW55U2VydmljZSA9IFJlc3Rhbmd1bGFyLmFsbCgnY29tcGFuaWVzJyk7XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGdldEFsbDogZ2V0QWxsLFxyXG4gICAgICAgICAgICBnZXRCeUlkOiBnZXRCeUlkLFxyXG4gICAgICAgICAgICBjcmVhdGU6IGNyZWF0ZSxcclxuICAgICAgICAgICAgdXBkYXRlOiB1cGRhdGUsXHJcbiAgICAgICAgICAgIGRlc3Ryb3k6IGRlc3Ryb3lcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBHRVQgL2FwaS92MS9jb21wYW5pZXNcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldEFsbCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gX2NvbXBhbnlTZXJ2aWNlLmdldExpc3QoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdFVCAvYXBpL3YxL2NvbXBhbmllcy97aWR9XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0gaWRcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldEJ5SWQoaWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gX2NvbXBhbnlTZXJ2aWNlLmdldChpZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQT1NUIC9hcGkvdjEvY29tcGFuaWVzXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0gZGF0YVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlKGRhdGEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gX2NvbXBhbnlTZXJ2aWNlLnBvc3QoZGF0YSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5kYXRhXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFBVVCAvYXBpL3YxL2NvbXBhbmllcy97aWR9XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0gaWRcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZShpZCwgZGF0YSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIF9jb21wYW55U2VydmljZS5nZXQoaWQpLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBlZGl0QmxvZyA9IFJlc3Rhbmd1bGFyLmNvcHkoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBlZGl0QmxvZy50aXRsZSA9IFwiTkVXRVIgdGl0bGVcIjtcclxuICAgICAgICAgICAgICAgIGVkaXRCbG9nLnB1dCgpOyAvLyBvciBzYXZlXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnB1dChiYXNlX3VybCArIGxvY2FsX3VybCArIGlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERFTEVURSAvYXBpL3YxL2NvbXBhbmllcy97aWR9XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0gY29tcGFueVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZGVzdHJveShjb21wYW55KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29tcGFueS5yZW1vdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdibG9nIGRlbGV0ZWQnKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwJylcclxuICAgICAgICAuZmFjdG9yeSgnUHJvamVjdFNlcnZpY2UnLCBwcm9qZWN0U2VydmljZSk7XHJcblxyXG4gICAgZnVuY3Rpb24gcHJvamVjdFNlcnZpY2UoUmVzdGFuZ3VsYXIpIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR0VUIC9hcGkvdjEvcHJvamVjdHNcclxuICAgICAgICAgKi9cclxuICAgICAgICB2YXIgX3Byb2plY3RTZXJ2aWNlID0gUmVzdGFuZ3VsYXIuYWxsKCdwcm9qZWN0cycpO1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG5cclxuICAgICAgICAgICAgZ2V0QWxsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX3Byb2plY3RTZXJ2aWNlLmdldExpc3QoKTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGdldEJ5SWQ6IGZ1bmN0aW9uIChpZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9wcm9qZWN0U2VydmljZS5nZXQoaWQpO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgY3JlYXRlOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9wcm9qZWN0U2VydmljZS5wb3N0KGRhdGEpLnRoZW4oZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgdXBkYXRlOiBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICAgICAgICAgIF9wcm9qZWN0U2VydmljZS5nZXQoaWQpLnRoZW4oZnVuY3Rpb24gKGJsb2cpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZWRpdEJsb2cgPSBSZXN0YW5ndWxhci5jb3B5KGJsb2cpO1xyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRCbG9nLnRpdGxlID0gXCJORVdFUiB0aXRsZVwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGVkaXRCbG9nLnB1dCgpOyAvLyBvciBzYXZlXHJcblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwLnB1dChiYXNlX3VybCArIGxvY2FsX3VybCArIGlkKTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGRlbGV0ZTogZnVuY3Rpb24gKGJsb2cpIHtcclxuICAgICAgICAgICAgICAgIGJsb2cucmVtb3ZlKCkudGhlbihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2Jsb2cgZGVsZXRlZCcpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyXHJcbiAgICAgICAgLm1vZHVsZSgnYXBwJylcclxuICAgICAgICAuZmFjdG9yeSgnQXV0aGVudGljYXRpb25TZXJ2aWNlJywgYXV0aGVudGljYXRpb25TZXJ2aWNlKTtcclxuXHJcbiAgICBmdW5jdGlvbiBhdXRoZW50aWNhdGlvblNlcnZpY2UoUmVzdGFuZ3VsYXIpIHtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR0VUIC9hcGkvdjEvdXNlcnNcclxuICAgICAgICAgKi9cclxuICAgICAgICB2YXIgX2F1dGhlbnRpY2F0aW9uU2VydmljZSA9IFJlc3Rhbmd1bGFyLmFsbCgndXNlcnMnKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuXHJcbiAgICAgICAgICAgIHJlZ2lzdGVyIDogZnVuY3Rpb24oY3JlZGVudGlhbHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfYXV0aGVudGljYXRpb25TZXJ2aWNlLnBvc3QoZGF0YSkudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgbG9naW4gOiBmdW5jdGlvbihjcmVkZW50aWFscylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9hdXRoZW50aWNhdGlvblNlcnZpY2UucG9zdChkYXRhKS50aGVuKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBsb2dvdXQgOiBmdW5jdGlvbigpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfYXV0aGVudGljYXRpb25TZXJ2aWNlLnBvc3QoZGF0YSkudGhlbihmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgZ2V0QXV0aFVzZXIgOiBmdW5jdGlvbigpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgfVxyXG5cclxufSkoKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=