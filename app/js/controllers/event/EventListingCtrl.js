angular.module('scoreApp').controller('EventListingCtrl', ['$scope', '$http', '$routeParams', '$modal', 'alert', function($scope, $http, $routeParams, $modal, alert) {
	$http({
		method: 'GET',
		url: '/tournament/' + $routeParams.tournamentID + '/events'
	}).success(function(events) {
		$scope.events = events;
	}).error(function(err) {
		alert.danger(err);
	});

	$scope.addEvent = function() {
		var addEventModal = $modal.open({
			templateUrl: '/partials/tournament/newevent.html',
			controller: 'TournamentAddEventCtrl',
			resolve: {
				tournamentID: function() {
					return $routeParams.tournamentID;
				}
			}
		});

		addEventModal.result.then(function(event) {
			$scope.events.push(event);
		});
	};
}]);