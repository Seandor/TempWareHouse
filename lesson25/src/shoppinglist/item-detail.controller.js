(function () {
'use strict';

angular.module('ShoppingList')
.controller('ItemDetailController', ItemDetailController);

ItemDetailController.$inject = ['items', '$stateParams'];
function ItemDetailController(items, $stateParams) {
  var itemdetail = this;
  var item = items[$stateParams.itemId];
  itemdetail.name = item.name;
  itemdetail.quantity = item.quantity;
  itemdetail.description = item.description;
}

})();
