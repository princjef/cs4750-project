angular.module('scoreApp').controller('TeamListingCtrl', ['$scope', '$window', '$http', '$routeParams', '$modal', 'tournament', function($scope, $window, $http, $routeParams, $modal, tournament) {
	$http({
		method:'GET',
		url:'/tournament/' + $routeParams.tournamentID + '/teams',
		cache:true
	}).success(function(data) {
		$scope.teams = data;
	}).error(function(err) {
		console.log('Error getting teams');
	});

	$scope.addTeam = function() {
		$modal.open({
			templateUrl:'/partials/team/newteam.html',
			controller:'TeamAddCtrl'
		});
	};
}]);