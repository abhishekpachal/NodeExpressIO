/* Controllers */

apps.controller('StockListCtrl', function($scope, express) { 
  $scope.stocks = [];
  express.on('msg', function(data) {// Listening in Socket in Angular Controller
		$scope.stocks = JSON.parse(data.msg);
		//$scope.notes.push(data);
	});
  
});
//Getting value from server data change event
apps.factory('express', function($rootScope) {
	var express = io.connect();// Connection to the server
	express.emit('ready');
	return {
		on: function(eventName, callback) {// Return callback to the actual function to manipulate it.
			express.on(eventName, function() {
				var args = arguments;
				$rootScope.$apply(function() {
					callback.apply(express, args);
					
				});
			});
		}
	};
});