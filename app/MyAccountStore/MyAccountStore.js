'use strict';
// хранилище для данных myAccount
angular
    .module('myApp')
    .factory('MyAccountStore', function() {

        let store = {};

        return {
            getItem()  {          
                return angular.copy(store);
            },
            saveItem(item) {
                store = angular.copy(item);             
            },
            clearItem(itemId) {
                store = {};
            }
        };
    })
