/**
 * Created by amhes_000 on 6/30/2015.
 */
(function () {
    'use strict';

    angular
        .module('PokeRPG')
        .controller('registerController', registerController);

    registerController.$inject = ['$scope', '$rootScope', 'authService'];
    function registerController(scope, rootScope, authService) {
        var vm = this;

        vm.register = register;

        function register() {
            authService
                .register(vm.email, vm.password)
                .then(function (data) {
                    console.log(data);
                }, function (error) {

                });
        }
    }
})();