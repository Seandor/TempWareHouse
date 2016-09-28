(function () {
"use strict";

angular.module('ShoppingListDirectiveApp', [])
.controller('ShoppingListController1', ShoppingListController1)
// .controller('ShoppingListDirectiveController', ShoppingListDirectiveController)
.factory('ShoppingListFactory', ShoppingListFactory)
.directive('shoppingList', ShoppingList);

function ShoppingList() {
	var ddo = {
		templateUrl: 'shoppingList.html',
		// < means one-way binding
		scope: {
			items: '<',
			title: '@'
		},
		// controller: 'ShoppingListDirectiveController as list',
		controller: ShoppingListDirectiveController,
		controllerAs: 'list',
		// bind the declared properties above in the scope to the controller instance
		bindToController: true
	};

	return ddo;
}

function ShoppingListDirectiveController() {
	var list = this;

	list.cookiesInList = function () {
		for (var i = 0; i < list.items.length; i++) {
			var name = list.items[i].name;
			if (name.toLowerCase().indexOf("cookie") !== -1) {
				return true;
			}
		}

		return false;
	};
}

ShoppingListController1.$inject = ['ShoppingListFactory'];
function ShoppingListController1(ShoppingListFactory) {
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

function ShoppingListFactory() {
	var factory = function (maxItems) {
		return new ShoppingListService(maxItems);
	};
	return factory;
}

})();
