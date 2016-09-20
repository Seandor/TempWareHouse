(function () {
"use strict";

angular.module('CounterApp', [])
.controller('CounterController', CounterController);

CounterController.$inject = ['$scope'];
function CounterController($scope) {
	$scope.onceCounter = 0;
	$scope.counter = 0;
	$scope.name = "Sean";
	
	$scope.showNumberOfWatchers = function () {
		console.log("# of Watchers: ", $scope.$$watchersCount);
	}
	
	$scope.countOnce = function () {
		$scope.onceCounter = 1;
	}
	
	$scope.upCounter = function () {
		$scope.counter++;
	}
	
	// The first parameter function is supposed to return a property to watch.
	// Every time through the loop the digest cycle will want to figure out what
	// property is that and execute the function.
	$scope.$watch(function () {
		console.log("Digest Loop Fired!");
	})
	
//	$scope.$watch('onceCounter', function (oldValue, newValue) {
//		console.log("old value", oldValue);
//		console.log("new value", newValue);
//	});
//	
//	$scope.$watch('counter', function (oldValue, newValue) {
//		console.log("counter old value", oldValue);
//		console.log("counter new value", newValue);
//	});
}

})();