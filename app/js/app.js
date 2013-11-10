var app = angular.module('scoreApp', ['ui.bootstrap', 'ngCookies']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/tournament/create', {
				templateUrl: '/partials/tournament/create.html',
				controller: 'TournamentCreateCtrl'
			});

	$locationProvider.html5Mode(true).hashPrefix('!');
}]);

app.service('$dropdowns', ['$q', '$http', function($q, $http) {
	return {
		getTournamentLevels: function() {
			var d = $q.defer();
			$http({
				method: 'GET',
				url: '/tournament/levels',
				cache: true
			}).success(function(data) {
				d.resolve(data);
			}).error(function(err) {
				d.reject(err);
			});
			return d.promise;
		}
	};
}]);

app.controller('PageCtrl', ['$scope', function($scope) {
	$scope.text = 'Hello World';
	console.log('Hello World');
}]);

app.controller('TournamentCreateCtrl', ['$scope', '$dropdowns', function($scope, $dropdowns) {
	$dropdowns.getTournamentLevels().then(function(data) {
		$scope.levels = data;
	});
}]);
