angular.module('scoreApp').controller('EventScoringCtrl', ['$scope', '$http', '$routeParams', 'alert', 'dropdowns', function($scope, $http, $routeParams, alert, dropdowns) {
	$scope.form = {};
	
	dropdowns.getScoreCodes().then(function(data) {
		$scope.scoreCodes = data;
	});

	dropdowns.getTiers().then(function(data) {
		$scope.tiers = data;
	});

	$http({
		method: 'GET',
		url: '/tournament/' + $routeParams.tournamentID + '/info',
	}).success(function(res) {
		$scope.tournament = res;
	}).error(function(err) {
		alert.danger(err);
	});

	$http({
		method: 'GET',
		url: '/event/info',
		params: {
			tournamentID: $routeParams.tournamentID,
			name: $routeParams.eventName,
			division: $routeParams.eventDivision
		}
	}).success(function(res) {
		$scope.event = res;
	}).error(function(err) {
		alert.danger(err);
	});

	$http({
		method: 'GET',
		url: '/scoring/' + $routeParams.tournamentID + '/' + $routeParams.eventDivision + '/' + $routeParams.eventName + '/participators'
	}).success(function(res) {
		$scope.participators = res.participators;
		$scope.updateRankings();
	}).error(function(err) {
		alert.danger(err);
	});

	var compareParticipators = function(a, b) {
		a.tier = Number(a.tier);
		b.tier = Number(b.tier);
		if(a.tier < b.tier) {
			return -1;
		} else if(a.tier > b.tier) {
			return 1;
		} else {	// Same tier
			if(a.score > b.score) {
				if($scope.event.highScoreWins) {
					return -1;
				} else {
					return 1;
				}
			} else if(a.score < b.score) {
				if($scope.event.highScoreWins) {
					return 1;
				} else {
					return -1;
				}
			} else {	// tie
				if(a.tiebreak > b.tiebreak) {
					if($scope.event.highTiebreakWins) {
						return -1;
					} else {
						return 1;
					}
				} else if(a.tiebreak < b.tiebreak) {
					if($scope.event.highTiebreakWins) {
						return 1;
					} else {
						return -1;
					}
				} else {
					return 0;	// This is an issue, this should never be hit
				}
			}
		}
	};

	$scope.updateScoreOrder = function() {
		$scope.updateRankings();
		$scope.saveEvent();
	};

	$scope.updateRankings = function() {
		var teams = $scope.participators.slice(0);
		var started = false;
		var finished = true;
		for(var i = teams.length - 1; i >= 0; i--) {
			teams[i].index = i;
			if(teams[i].scoreCode === null ||
					(teams[i].scoreCode === 'participated' && (teams[i].score === null || teams[i].score.length === 0))) {
				$scope.participators[i].place = null;
				teams.splice(i, 1);
				finished = false;
			} else if(teams[i].scoreCode === 'NS') {
				$scope.participators[i].place = $scope.participators.length + 1;
				teams.splice(i, 1);
				started = true;
			} else if(teams[i].scoreCode === 'DQ') {
				$scope.participators[i].place = $scope.participators.length + 2;
				teams.splice(i, 1);
				started = true;
			} else if(teams[i].scoreCode === 'participated' && teams[i].score !== null && teams[i].score.length === 0) {
				started = true;
			}
		}
		teams.sort(compareParticipators);
		var currentPlace = 1;

		teams.forEach(function(team) {
			$scope.participators[team.index].place = currentPlace++;
		});

		var oldStatus = $scope.event.status;
		if(!started) {
			$scope.event.status = 'Not Started';
		} else if(started && !finished) {
			$scope.event.status = 'In Progress';
		} else {
			$scope.event.status = 'Completed';
		}

		if($scope.event.status !== oldStatus) {
			$scope.saveEvent();
		}
	};

	$scope.saveScores = function() {
		$http({
			method: 'POST',
			url: '/scoring/' + $routeParams.tournamentID + '/' + $routeParams.eventDivision + '/' + $routeParams.eventName + '/save',
			data: {
				participants: $scope.participators,
				event: $scope.event
			}
		}).success(function(res) {
			alert.success('Scoring information successfully saved');
		}).error(function(err) {
			alert.danger(err);
		});
	};

	$scope.saveEvent = function() {
		$http({
			method: 'POST',
			url: '/event/save',
			data: $scope.event
		}).error(function(err) {
			alert.danger(err);
		});
	};
}]);