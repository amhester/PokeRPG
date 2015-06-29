/**
* Created by amhes_000 on 6/24/2015.
* Starting point for entire app. Also the main module used to house the application.
*/
(function () {

    'use strict';

    angular
        .module('PokeRPG', ['ngRoute', 'ngMaterial'])
        .value('apiUrl', '')
        .config(config);

    config.$inject = ['$routeProvider', '$httpProvider'];
    function config(routeProvider, httpProvider) {
        routeProvider
            .when('/', {
                templateUrl: '../views/signin.html',
                controller: 'signInController',
                controllerAs: 'vm'
            })
            .when('/start', {
                templateUrl: '../views/starterSelect.html',
                controller: 'starterSelectController',
                controllerAs: 'vm'
            })
            .otherwise("/");

        httpProvider.interceptors.push('authInjector');
    }
})();