/**
* Created by amhes_000 on 6/24/2015.
* Starting point for entire app. Also the main module used to house the application.
*/
(function () {

    'use strict';

    angular
        .module('PokeRPG', ['ngRoute', 'ngMaterial'])
        .config(config);

    config.$inject = ['$routeProvider'];
    function config(routeProvider) {
        routeProvider
            .when('/', {
                templateUrl: '../views/signin.html',
                controller: 'signInController',
                controllerAs: 'vm'
            })
            .otherwise("/");
    }
})();