angular.module('scoreApp').controller('EventListingCtrl', ['$scope', '$http', '$routeParams', '$filter', '$modal', 'alert', function($scope, $http, $routeParams, $filter, $modal, alert) {
	$http({
		method: 'GET',
		url: '/tournament/' + $routeParams.tournamentID + '/events'
	}).success(function(events) {
		$scope.divisions = {
			A: $filter('division')(events, 'A'),
			B: $filter('division')(events, 'B'),
			C: $filter('division')(events, 'C')
		};
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