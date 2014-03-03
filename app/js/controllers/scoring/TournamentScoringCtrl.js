angular.module('scoreApp').controller('TournamentScoringCtrl', ['$scope', '$http', '$routeParams', 'alert', function($scope, $http, $routeParams, alert) {
	$scope.division = $routeParams.division;

	var sortByEventName = function(a, b) {
		if(a.eventName < b.eventName) {
			b.
			return -1;
		} else if(a.eventName > b.eventName) {
			return 1;
		} else {
			return 0;
		}
	};

	var sum = function(acc, element) {
		return acc + Number(element.place);
	};

	var sortByTotalScore = function(a, b) {
		if(a.totalScore < b.totalScore) {
			return -1;
		} else if(a.totalScore > b.totalScore) {
			return 1;
		} else {
			var aPlaceCount = {};
			a.events.forEach(function(evt) {
				if(aPlaceCount[evt.place] == null) {
					aPlaceCount[evt.place] = 1;
				} else {
					aPlaceCount[evt.place]++;
				}
			});
			var bPlaceCount = {};
			b.events.forEach(function(evt) {
				if(bPlaceCount[evt.place] == null) {
					bPlaceCount[evt.place] = 1;
				} else {
					bPlaceCount[evt.place]++;
				}
			});

			if(aPlaceCount["1"] > bPlaceCount["1"]) {
				return -1;
			} else if(aPlaceCount["1"] < bPlaceCount["1"]) {
				return 1;
			} else {
				return 0;
			}
		}
	};

	$scope.tournament = {};

	$http({
		method: 'GET',
		url: '/tournament/' + $routeParams.tournamentID + '/info'
	}).success(function(data) {
		$scope.tournament = data;
	}).error(function(err) {
		console.log('Error getting tournament info');
	});

	$http({
		method: 'GET',
		url: '/scoring/' + $routeParams.tournamentID + '/' + $routeParams.division + '/ranks'
	}).success(function(res) {
		$scope.teams = [];
		$scope.events = [];
		res.forEach(function(entry) {
			var teamExists = false;
			$scope.teams.forEach(function(team) {
				if(team.team.number === entry.team.number) {
					teamExists = true;
					team.events.push({
						eventName: entry.event.name,
						place: entry.place
					});
				}
			});
			if(!teamExists) {
				$scope.teams.push({
					team: entry.team,
					events: [{
						eventName: entry.event.name,
						place: entry.place
					}]
				});
			}

			if(!$scope.events.some(function(evt) { return evt.eventName === entry.event.name; })) {
				$scope.events.push({
					eventName: entry.event.name,
					incomplete: (entry.place === null || entry.place === undefined) ? true : false
				});
			} else if(entry.place === null || entry.place === undefined) {
				$scope.events.forEach(function(evt) {
					if(evt.eventName === entry.event.name) {
						evt.incomplete = true;
					}
				});
			}
		});

		$scope.teams.forEach(function(team) {
			team.totalScore = team.events.reduce(sum, 0);
		});
		
		$scope.teams.sort(sortByTotalScore);

		var currentRank = 1;
		$scope.teams.forEach(function(team) {
			team.finalRank = currentRank++;
		});

	}).error(function(err) {
		alert.danger(err);
	});
}]);