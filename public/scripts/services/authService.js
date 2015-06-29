/**
 * Created by amhes_000 on 6/29/2015.
 */
(function () {
    'use strict';

    angular
        .module('PokeRGP')
        .factory('authInjector', authInjector);

    authInjector.$inject = ['$rootScope', 'localStorageService'];
    function authInjector(rootScope, ls) {
        var authInject = {
            request: function (config) {
                if(ls.get('badAssToken')) {
                    config.headers['Authorization'] = 'Basic ' + ls.get('badAssToken');
                }
                return config;
            }
        };
        return authInject;
    }

    authService.$inject = ['$rootScope', '$http', 'apiUrl', '$q', 'localStorageService'];
    function authService(rootScope, http, apiUrl, q, ls) {
        return {
            signIn: authenticate,
            signOut: function (){}
        };

        function authenticate(email, password) {
            var deferred = q.defer();
                http
                    .post(apiUrl, { email: email, password: password })
                    .success(function (data) {
                        ls.set('badAssToken', data);
                        deferred.resolve(data);
                    })
                    .error(function (msg, code) {
                        deferred.reject(msg);
                    });
            return deferred;
        }
    }
})();