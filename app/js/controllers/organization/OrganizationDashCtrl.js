angular.module('scoreApp').controller('OrganizationDashCtrl', ['$scope', '$http', '$routeParams', '$modal', 'alert', function($scope, $http, $routeParams, $modal, alert) {
	$http({
		method: 'GET',
		url: '/organization/' + $routeParams.organizationID + '/info'
	}).success(function(res) {
		$scope.organization = res;
	}).error(function(err) {
		alert.danger(err);
	});

	$http({
		method: 'GET',
		url: '/organization/' + $routeParams.organizationID + '/admins'
	}).success(function(res) {
		$scope.admins = res;
	}).error(function(err) {
		alert.danger(err);
	});

	$http({
		method: 'GET',
		url: '/organization/' + $routeParams.organizationID + '/tournaments'
	}).success(function(res) {
		$scope.tournaments = res;
	}).error(function(err) {
		alert.danger(err);
	});

	$scope.addTournament = function() {
		var newTournament = $modal.open({
			templateUrl: '/partials/tournament/new.html',
			controller: 'TournamentCreateCtrl',
			resolve: {
				organizationID: function() {
					return $routeParams.organizationID;
				}
			}
		});

		newTournament.result.then(function(tournament) {
			$scope.tournaments.push(tournament);
		});
	};
}]);