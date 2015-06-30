/**
 * Created by amhes_000 on 6/30/2015.
 */
(function () {
    'use strict';

    angular
        .module('PokeRPG')
        .controller('registerController', registerController);

    registerController.$inject = ['$scope', '$rootScope', 'authService'];
    function registerController() {
        var vm = this;
    }
})();