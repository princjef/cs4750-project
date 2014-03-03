angular.module('scoreApp').controller('EventScoringCtrl', ['$scope', '$http', '$routeParams', '$location', '$window', '$q', 'alert', 'dropdowns', 'underscore', function($scope, $http, $routeParams, $location, $window, $q, alert, dropdowns, underscore) {
	$scope.form = {};

	$scope.focusCell = {
		row: 0,
		col: 0
	};

	$scope.dirty = false;
	
	dropdowns.getScoreCodes().then(function(data) {
		$scope.scoreCodes = data;
	});

	$scope.rankConflicts = [];

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
		$scope.participators.forEach(function(participant) {
			switch(participant.scoreCode) {
				case "NS":
					participant.rawDisplay = 'ns';
					break;
				case "DQ":
					participant.rawDisplay = 'dq';
					break;
				case "P":
					participant.rawDisplay = 'p';
					break;
				default:
					participant.rawDisplay = participant.score || '';
					break;
			}
		});
		$scope.updateRankings(0);
	}).error(function(err) {
		alert.danger(err);
	});

	var compareParticipators = function(a, b) {
		// Deal with other score codes
		if(a.scoreCode !== 'participated') {
			if(b.scoreCode !== 'participated') {
				return 0;
			} else {
				return 1;
			}
		} else if(b.scoreCode !== 'participated') {
			return -1;
		}

		// Tiers first
		var tierA = isNumber(a.tier) ? Number(a.tier) : 1;
		var tierB = isNumber(b.tier) ? Number(b.tier) : 1;

		var scoreA = isNumber(a.score) ? Number(a.score) : null;
		var scoreB = isNumber(b.score) ? Number(b.score) : null;

		var tiebreakA = isNumber(a.tiebreak) ? Number(a.tiebreak) : null;
		var tiebreakB = isNumber(b.tiebreak) ? Number(b.tiebreak) : null;
		if(tierA < tierB) {
			return -1;
		} else if(tierA > tierB) {
			return 1;
		} else {	// Same tier
			if(scoreA !== null && scoreB === null) {
				return -1;
			} else if(scoreA === null && scoreB !== null) {
				return 1;
			} else if(scoreA > scoreB) {
				if($scope.event.highScoreWins) {
					return -1;
				} else {
					return 1;
				}
			} else if(scoreA < scoreB) {
				if($scope.event.highScoreWins) {
					return 1;
				} else {
					return -1;
				}
			} else {	// tie
				console.log("tiebreak!");
				if(tiebreakA !== null && tiebreakB === null) {
					return -1;
				} else if(tiebreakA === null && tiebreakB !== null) {
					return 1;
				} else if(tiebreakA > tiebreakB) {
					if($scope.event.highTiebreakWins) {
						return -1;
					} else {
						return 1;
					}
				} else if(tiebreakA < tiebreakB) {
					if($scope.event.highTiebreakWins) {
						return 1;
					} else {
						return -1;
					}
				} else {
					console.log("tie!");
					$scope.rankConflicts[a.index] = true;
					$scope.rankConflicts[b.index] = true;
					return 0;	// This is an issue, this should never be hit
				}
			}
		}
	};

	$scope.updateScoreOrder = function() {
		$scope.updateRankings(0);
		$scope.saveEvent();
	};

	$scope.saveScores = function() {
		var d = $q.defer();
		$http({
			method: 'POST',
			url: '/scoring/' + $routeParams.tournamentID + '/' + $routeParams.eventDivision + '/' + $routeParams.eventName + '/save',
			data: {
				participants: $scope.participators,
				event: $scope.event
			}
		}).success(function(res) {
			alert.success('Scoring information successfully saved');
			$scope.dirty = false;
			d.resolve();
		}).error(function(err) {
			alert.danger(err);
			d.reject();
		});
		return d.promise;
	};

	var isNumber = function(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	};

	$scope.updateRankings = function(index) {
		$scope.dirty = true;
		if(index !== undefined && index !== null) {
			// console.log($scope.participators, "index:",index);
			if($scope.participators[index].rawDisplay) {
				switch(isNumber($scope.participators[index].rawDisplay) ? $scope.participators[index].rawDisplay : $scope.participators[index].rawDisplay.toLowerCase()) {
					case "ns":
						$scope.participators[index].scoreCode = "NS";
						$scope.participators[index].place = $scope.participators.length + 1;
						$scope.participators[index].tier = null;
						$scope.participators[index].tiebreak = null;
						break;
					case "dq":
						$scope.participators[index].scoreCode = "DQ";
						$scope.participators[index].place = $scope.participators.length + 2;
						$scope.participators[index].tier = null;
						$scope.participators[index].tiebreak = null;
						break;
					case "p":
						$scope.participators[index].scoreCode = "P";
						$scope.participators[index].place = $scope.participators.length;
						$scope.participators[index].tier = null;
						$scope.participators[index].tiebreak = null;
						break;
					default:
						if(isNumber($scope.participators[index].rawDisplay)) {
							$scope.participators[index].scoreCode = "participated";
							$scope.participators[index].score = parseFloat($scope.participators[index].rawDisplay);
						} else {
							$scope.participators[index].scoreCode = null;
							$scope.participators[index].score = null;
						}

						break;
				}
			} else {
				console.log("empty raw display");
				$scope.participators[index].scoreCode = null;
				$scope.participators[index].place = null;
			}

			var teams = $scope.participators.slice(0);
			var started = false;
			var finished = true;
			var conflicts = false;
			for(var i = $scope.participators.length - 1; i >= 0; i--) {
				teams[i].index = i;
				if(teams[i].scoreCode === null || teams[i].scoreCode === undefined) {
					finished = false;
				} else {
					started = true;
				}
			}

			$scope.rankConflicts = [];
			teams.sort(compareParticipators);
			var currentPlace = 1;

			teams.forEach(function(team, i) {
				$scope.participators[team.index].rankConflict = false;
				if(team.scoreCode === 'participated') {
					if(i > 0 && compareParticipators(team, teams[i - 1]) === 0) {
						$scope.participators[team.index].place = $scope.participators[teams[i-1].index].place;
						$scope.participators[team.index].rankConflict = true;
						$scope.participators[teams[i-1].index].rankConflict = true;
						conflicts = true;
					} else {
						$scope.participators[team.index].place = currentPlace++;
					}
				} else if(team.scoreCode === null) {
					$scope.participators[team.index].place = null;
				}
			});

			var oldStatus = $scope.event.status;
			if(!started) {
				$scope.event.status = 'Not Started';
			} else if(started && (!finished || conflicts)) {
				$scope.event.status = 'In Progress';
			} else {
				$scope.event.status = 'Completed';
			}

			if($scope.event.status !== oldStatus) {
				$scope.saveEvent();
			}
		}
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

	$window.onbeforeunload = function() {
		console.log("Leaving page");
		if($scope.dirty) {
			return "You have not saved your changes. All unsaved changes will be lost when you leave this page.";
		}
	};
}]);