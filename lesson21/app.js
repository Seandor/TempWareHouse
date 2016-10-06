(function () {
"use strict";

angular.module('ShoppingListComponentApp', [])
.controller('ShoppingListController', ShoppingListController)
.factory('ShoppingListFactory', ShoppingListFactory)
.component('shoppingList', {
	templateUrl: 'shoppingList.html',
	controller: ShoppingListComponentController,
	bindings: {
		items: '<',
		title: '@',
		onRemove: '&'
	}
});

ShoppingListComponentController.$inject = ['$element'];
function ShoppingListComponentController($element) {
	var $ctrl = this;
	var totalItems;

	$ctrl.cookiesInList = function () {
		for (var i = 0; i < $ctrl.items.length; i++) {
			var name = $ctrl.items[i].name;
			if (name.toLowerCase().indexOf("cookie") !== -1) {
				return true;
			}
		}

		return false;
	};

	$ctrl.remove = function (myIndex) {
		$ctrl.onRemove({index: myIndex});
	};

	$ctrl.$onInit = function () {
		totalItems = 0;
	};

	$ctrl.$onChanges = function (changeObj) {
		console.log("Changes: ", changeObj);
	};

	$ctrl.$doCheck = function () {
		if ($ctrl.items.length !== totalItems) {
			console.log("# of items changed, checking for cookies!");
			totalItems = $ctrl.items.length;
			if ($ctrl.cookiesInList()) {
				console.log("cookies found!");
				var warningElem = $element.find('div.error');
				warningElem.slideDown(900);
			}
			else {
				console.log("no cookies.");
				var warningElem = $element.find('div.error');
				warningElem.slideUp(900);
			}
		}
	};
	// $ctrl.$postLink = function () {
	// 	$scope.$watch('$ctrl.cookiesInList()', function (newValue, oldValue) {
	// 		console.log("The element is: ", $element);
	// 		console.log("Old value: ", oldValue);
	// 		console.log("New value: ", newValue);
	// 		if (newValue === true) {
	// 			// Show warning
	// 			var warningElem = $element.find('div.error');
	// 			warningElem.slideDown(900);
	// 		}
	// 		else {
	// 			// Hide warning
	// 			var warningElem = $element.find('div.error');
	// 			warningElem.slideUp(900);
	// 		}
	// 	});
	// };
}

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

function ShoppingListFactory() {
	var factory = function (maxItems) {
		return new ShoppingListService(maxItems);
	};
	return factory;
}

})();
