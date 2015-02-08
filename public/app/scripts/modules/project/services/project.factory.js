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

})();