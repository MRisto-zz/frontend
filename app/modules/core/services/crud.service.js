(function () {
    'use strict';

    angular
        .module('core.services')
        .factory('crud', crud);

    crud.$inject = ['$rootScope', 'CustomNotify', '$http', '$state'];


    function crud($rootScope, CustomNotify, $http, $state) {


        return {
            get: get, //GetAll or GetOne depends on the url
            post: post, //Create
            put: put, //Update
            delete: deleteItem //Delete
        };

        function get(url) {
            return $http.get($rootScope.serverUrl + url);
        }

        function post(url, payload, callback, notify) {
            return $http.post($rootScope.serverUrl + url, payload)
                .then(function (response) {
                    success(response, callback, notify)
                }).catch(function (response) {
                    error(response, callback, notify);
                });
        }

        function put(url, payload, callback, notify) {
            return $http.put($rootScope.serverUrl + url, payload)
                .then(function (response) {
                    success(response, callback, notify)
                }).catch(function (response) {
                    error(response, callback, notify);
                });
        }

        function deleteItem(url, callback, notify) {
            return $http.delete($rootScope.serverUrl + url)
                .then(function (response) {
                    success(response, callback, notify)
                }).catch(function (response) {
                    error(response, callback, notify);
                });
        }

        function success(response, callback, notify) {
            if (response.data.msg !== null && (notify || notify === undefined))
                CustomNotify.serversuccess(response.data.msg);
            if (callback !== undefined) {
                callback(response);
            } else {
                $state.reload();
            }
        }

        function error(response, callback, notify) {
            if (response.data !== null && response.data.msg !== null && (notify || notify === undefined))
                CustomNotify.servererror(response.data.msg);
            if (callback !== undefined) {
                callback(response);
            } else {
                $state.reload();
            }
        }
    }
}());