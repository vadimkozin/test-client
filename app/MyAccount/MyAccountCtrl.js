'use strict';

angular
    .module('myApp')
    .controller('MyAccountCtrl', function(MyAccountStore) {

    var vm = this;
    vm.newAccount = MyAccountStore.getItem();
    vm.btnText = (!Object.keys(vm.newAccount).length) ? "Добавить" : "Обновить";
   
    vm.addAccount = function(myAccount) {
        MyAccountStore.saveItem(myAccount);
        vm.newAccount = {};
        vm.accountForm.$setPristine();
    };
});
