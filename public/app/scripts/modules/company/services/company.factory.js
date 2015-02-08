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

})();