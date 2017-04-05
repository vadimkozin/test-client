'use strict';

angular
    .module('myApp')
    .component('menuComponent', {
        templateUrl: 'MenuComponent/MenuComponent.html',
        controller: function() {
            this.menuItems = [
                {key:'list', text: 'Список'}, 
                {key:'createNewPokemon', text:'Добавить нового'}, 
                {key:'myaccount', text:'Личный кабинет'}
            ];
        }
    })