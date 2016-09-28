(function () {
"use strict";

angular.module('ShoppingListDirectiveApp', [])
.controller('ShoppingListController1', ShoppingListController1)
.factory('ShoppingListFactory', ShoppingListFactory)
.directive('shoppingList', ShoppingList);

function ShoppingList() {
	var ddo = {
		templateUrl: 'shoppingList.html',
		// < means one-way binding
		scope: {
			items: '<',
			title: '@',
			onRemove: '&'
		},
		controller: ShoppingListDirectiveController,
		controllerAs: 'list',
		// bind the declared properties above in the scope to the controller instance
		bindToController: true,
		link: ShoppingListDirectiveLink
	};

	return ddo;
}

function ShoppingListDirectiveLink(scope, element, attrs, controller) {
	scope.$watch('list.cookiesInList()', function (newValue, oldValue) {
		console.log("Old value: ", oldValue);
		console.log("New value: ", newValue);

		if (newValue === true) {
			displayCookieWarning();
		}
		else {
			removeCookieWarning();
		}
	});

	function displayCookieWarning() {
		// using angular jqlite
		// var warningElem = element.find('div');
		// warningElem.css('display', 'block');

		// If jQuery included before Angular
		var warningElem = element.find("div.error");
		warningElem.slideDown(900);
	}

	function removeCookieWarning() {
		// using angular jqlite
		// var warningElem = element.find('div');
		// warningElem.css('display', 'none');

		// If jQuery included before Angular
		var warningElem = element.find("div.error");
		warningElem.slideUp(900);
	}
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

function ShoppingListFactory() {
	var factory = function (maxItems) {
		return new ShoppingListService(maxItems);
	};
	return factory;
}

})();
