(function () {
    'use strict';

    angular
        .module('admin.core.routes')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.rule(function ($injector, $location) {
            var path = $location.path();
            var hasTrailingSlash = path.length > 1 && path[path.length - 1] === '/';

            if (hasTrailingSlash) {
                // if last character is a slash, return the same url without the slash
                var newPath = path.substr(0, path.length - 1);
                $location.replace().path(newPath);
            }
        });

        // Redirect to 404 when route not found
        $urlRouterProvider.otherwise(function ($injector, $location) {
            $injector.get('$state').transitionTo('not-found', null, {
                location: false
            });
        });
        $stateProvider
            .state('backend', {
                url: '/admin',
                abstract: true,
                templateUrl: '/modules/admin/core/views/admin-default.view.html',
                controller: 'CoreCtrl',
                controllerAs: 'vm'
            })
            .state('backend.dashboard', {
                url: '',
                templateUrl: '/modules/admin/core/views/dashboard.view.html',
                controller: 'DashboardCtrl',
                controllerAs: 'vm',
                requiredRight:['admin.enter']
            });
    }
}());
