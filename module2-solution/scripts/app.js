(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
	var toBuyList = this;
	
	toBuyList.toBuyItems = ShoppingListCheckOffService.getToBuyItems();
	
	toBuyList.buyItem = function (itemIndex) {
		ShoppingListCheckOffService.buyItem(itemIndex);
		toBuyList.isEmpty = ShoppingListCheckOffService.isToBuyItemsEmpty();
	}
	
}

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
	var boughtList = this;
	
	boughtList.boughtItems = ShoppingListCheckOffService.getBoughtItems();
}

function ShoppingListCheckOffService() {
	var service = this;
	
	var toBuyItems = [
		{
			name: "cookies",
			quantity: 10
		},
		{
			name: "donuts",
			quantity: 5
		},
		{
			name: "nut ice cream",
			quantity: 2
		},
		{
			name:"chips",
			quantity: 10
		},
		{
			name: "chocolates",
			quantity: 6
		}
		
	];
	
	var boughtItems = [];
	
	service.getToBuyItems = function () {
		return toBuyItems;
	}
	
	service.getBoughtItems = function () {
		return boughtItems;
	}
	
	service.buyItem = function (itemIndex) {
		boughtItems.push(toBuyItems[itemIndex]);
		toBuyItems.splice(itemIndex, 1);
	}

}

})();