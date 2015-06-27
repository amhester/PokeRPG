/**
 * Created by GS60 on 6/27/2015.
 */
(function () {

    'use strict';

    angular
        .module('PokeRPG')
        .controller('starterSelectController', starterSelectController);

    starterSelectController.$inject = ['$scope', '$mdDialog'];
    function starterSelectController(scope, mdDialog) {
        var vm = this;

        vm.Pokemon = [
            {
                pokeName: 'Charmander',
                pokeType: 'Fire'
            },
            {
                pokeName: 'Bulbasaur',
                pokeType: 'Grass'
            },
            {
                pokeName: 'Squirtle',
                pokeType: 'Water'
            }
        ];

        vm.PokemonStats = ["HP", "ATT", "DEF", "SP ATT", "SP DEF", "SPEED"];

        vm.test = function(ev, name)
        {
            mdDialog.show(
                mdDialog.alert()
                    .parent(angular.element(document.body))
                    .title('This is an alert title')
                    .content('You selected ' + name)
                    .ok('Got it!')
                    .targetEvent(ev)
            );

        }

    }

})();