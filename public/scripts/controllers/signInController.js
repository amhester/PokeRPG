/**
 * Created by amhes_000 on 6/24/2015.
 */
(function () {

    'use strict';

    angular
        .module('PokeRPG')
        .controller('signInController', signInController);

    signInController.$inject = ['$scope', '$rootScope', 'authService'];
    function signInController(scope, rootScope, authService) {
        var vm = this;

        vm.signIn = signIn;
        vm.register = register;

        function signIn() {
            authService
                .signIn(vm.email, vm.password)
                .then(function (data) {
                    location.path = '/game';
                }, function (error) {
                    console.error('Error in signIn response: \n' + error);
                });
        }

        function signOut() {

        }

        function register() {
            location.path = '/register';
        }
    }

})();