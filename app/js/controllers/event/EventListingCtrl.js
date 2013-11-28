angular.module('scoreApp').controller('EventListingCtrl', ['$scope', '$http', '$routeParams', '$filter', '$modal', 'alert', 'tournament', function($scope, $http, $routeParams, $filter, $modal, alert, tournament) {
	$http({
		method: 'GET',
		url: '/tournament/' + $routeParams.tournamentID + '/events'
	}).success(function(events) {
		$scope.divisions = [
			{
				level: 'A',
				events: $filter('division')(events, 'A')
			}, {
				level: 'B',
				events: $filter('division')(events, 'B')
			}, {
				level: 'C',
				events: $filter('division')(events, 'C')
			}
		];
	}).error(function(err) {
		alert.danger(err);
	});

	$scope.addEvent = function() {
		var addEventModal = $modal.open({
			templateUrl: '/partials/tournament/newevent.html',
			controller: 'TournamentAddEventCtrl'
		});

		addEventModal.result.then(function(event) {
			$scope.divisions.forEach(function(division) {
				if(division.level === event.division) {
					division.events.push(event);
				}
			});
		});
	};
}]);