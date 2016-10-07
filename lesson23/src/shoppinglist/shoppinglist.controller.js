(function () {
'use strict';

angular.module('ShoppingList')
.controller('ShoppingListController', ShoppingListController);

ShoppingListController.$inject = ['ShoppingListFactory'];
function ShoppingListController(ShoppingListFactory) {
	var list = this;

	// use factory to create new shopping list service
	var shoppingList = ShoppingListFactory();

	list.items = shoppingList.getItems();
	var origTitle = "Shopping List #1";
	list.title = origTitle + " (" + list.items.length + " items )";

	list.itemName = "";
	list.itemQuantity = "";

	list.addItem = function () {
		shoppingList.addItem(list.itemName, list.itemQuantity);
		list.title = origTitle + " (" + list.items.length + " items )";
	};

	list.removeItem = function (itemIndex) {
		list.lastRemoved = "Last item removed was " + list.items[itemIndex].name;
		shoppingList.removeItem(itemIndex);
		list.title = origTitle + " (" + list.items.length + " items )";
	};
}

function ShoppingListService(maxItems) {
	var service = this;

	// List of shopping items
	var items = [];

	service.addItem = function (itemName, quantity) {
		if ((maxItems === undefined) ||
			(maxItems !== undefined) && (items.length < maxItems)) {
			var item = {
				name: itemName,
				quantity: quantity
			};
			items.push(item);
		}
		else {
			throw new Error("Max items (" + maxItems + ") reached.");
		}
	};

	service.getItems = function () {
		return items;
	};

	service.removeItem = function(itemIndex) {
		items.splice(itemIndex, 1);
	};
}

})();
