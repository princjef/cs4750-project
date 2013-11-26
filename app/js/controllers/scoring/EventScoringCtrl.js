angular.module('scoreApp').controller('EventScoringCtrl', ['$scope', '$http', '$routeParams', 'alert', 'dropdowns', function($scope, $http, $routeParams, alert, dropdowns) {
	$scope.form = {};

	// These need to change
	$scope.highScoreWins = true;
	$scope.highTiebreakWins = true;
	
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
		console.log(res);
		$scope.event = res;
	}).error(function(err) {
		alert.danger(err);
	});

	$http({
		method: 'GET',
		url: '/scoring/' + $routeParams.tournamentID + '/' + $routeParams.eventDivision + '/' + $routeParams.eventName + '/participators'
	}).success(function(res) {
		$scope.participators = res.participators;
		console.log($scope.participators);
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
				if($scope.highScoreWins) {
					return -1;
				} else {
					return 1;
				}
			} else if(a.score < b.score) {
				if($scope.highScoreWins) {
					return 1;
				} else {
					return -1;
				}
			} else {	// tie
				if(a.tiebreak > b.tiebreak) {
					if($scope.highTiebreakWins) {
						return -1;
					} else {
						return 1;
					}
				} else if(a.tiebreak < b.tiebreak) {
					if($scope.highTiebreakWins) {
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

	$scope.updateRankings = function() {
		var teams = $scope.participators.slice(0);
		for(var i = teams.length - 1; i >= 0; i--) {
			teams[i].index = i;
			if(teams[i].scoreCode === null ||
					(teams[i].scoreCode === 'participated' && teams[i].score === null)) {
				$scope.participators[i].place = null;
				teams.splice(i, 1);
			} else if(teams[i].scoreCode === 'NS') {
				$scope.participators[i].place = $scope.participators.length + 1;
				teams.splice(i, 1);
			} else if(teams[i].scoreCode === 'DQ') {
				$scope.participators[i].place = $scope.participators.length + 2;
				teams.splice(i, 1);
			}
		}
		teams.sort(compareParticipators);
		var currentPlace = 1;

		teams.forEach(function(team) {
			$scope.participators[team.index].place = currentPlace++;
		});
	};

	$scope.saveScores = function() {
		console.log($scope.participators);
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
}]);