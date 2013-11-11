var app = angular.module('scoreApp', ['ui.bootstrap', 'ngCookies']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/tournament/new', {
				templateUrl: '/partials/tournament/new.html',
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
}]);

app.controller('TournamentCreateCtrl', ['$scope', '$http', '$dropdowns', '$window', function($scope, $http, $dropdowns, $window) {
	$scope.form = {};

	$dropdowns.getTournamentLevels().then(function(data) {
		$scope.types = data;
		$scope.form.type = data[0];
	});

	$scope.createTournament = function() {
		$http({
			method: 'POST',
			url: '/tournament/create',
			data: $scope.form
		}).success(function(res) {
			$window.alert('Successfully created tournament');
		}).error(function(err) {
			console.log(err);
		});
	};
}]);
