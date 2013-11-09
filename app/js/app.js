var app = angular.module('scoreApp', ['ui.bootstrap', 'ngCookies']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/tournament/create', {
				templateUrl: '/partials/tournament/create.html',
				controller: 'TournamentCreateCtrl'
			});

	$locationProvider.html5Mode(true).hashPrefix('!');
}]);

app.controller('PageCtrl', ['$scope', function($scope) {
	$scope.text = 'Hello World';
	console.log('Hello World');
}]);

app.contorller('TournamentCreateCtrl', ['$scope', function($scope) {

}]);
