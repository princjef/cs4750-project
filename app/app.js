var app = angular.module('scoreApp', []);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	// Routes will go here
}]);

app.controller('PageCtrl', ['$scope', function($scope) {
	$scope.text = 'Hello World';
	console.log('Hello World');
}]);
