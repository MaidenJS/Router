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

})();