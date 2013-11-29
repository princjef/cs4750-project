angular.module('scoreApp').controller('EventListingCtrl', ['$scope', '$http', '$routeParams', '$filter', '$modal', '$window', 'alert', 'tournament', function($scope, $http, $routeParams, $filter, $modal, $window, alert, tournament) {
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

	$scope.removeEvent = function($event, event) {
		if($window.confirm('Are you sure you want to remove ' + event.eventName + '?')) {
			$http({
				method: 'POST',
				url: '/event/remove',
				data: {
					tournamentID: $routeParams.tournamentID,
					eventName: event.eventName,
					division: event.division
				}
			}).success(function(res) {
				$scope.divisions.forEach(function(division) {
					for(var i = division.events.length - 1; i >= 0; i++) {
						if(division.events[i].eventName === event.eventName &&
							division.events[i].division === event.division) {
							division.events.splice(i, 1);
						}
					}
				});
				alert.success(event.eventName + ' successfully removed');
			}).error(function(err) {
				alert.danger(err);
			});
		}

		if ($event.stopPropagation) $event.stopPropagation();
		if ($event.preventDefault) $event.preventDefault();
		$event.cancelBubble = true;
		$event.returnValue = false;
	};
}]);