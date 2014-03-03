angular.module('scoreApp').controller('PresentationCtrl', ['$scope', '$http', '$routeParams', '$q', 'tournament', function($scope, $http, $routeParams, $q, tournament) {
	var element = document.getElementById("slide");

	$scope.events = {};
	$scope.currentIndex = 0;
	$scope.keysDisabled = false;
	$scope.results = {};

	var divisions = [];
	var overallDivisionIndex = 0;
	var overallRevealed = false;

	$scope.currentevent = null;

	$scope.inProgress = true;

	$http({
		method: 'GET',
		url: '/tournament/' + $routeParams.tournamentID + '/info'
	}).success(function(data) {
		$scope.tournament = data;

		$scope.placesLength = $scope.tournament.eventMedalCount;

		console.log($scope.tournament);

		$scope.entryHeight = 100/$scope.tournament.eventMedalCount - 6;
		tournament.set($scope.tournament);

		$scope.nextEvent();
	}).error(function(err) {
		console.log('Error getting tournament info');
	});

	var containsEvent = function(arr, evt, remove) {
		var foundEvent = false;
		arr.forEach(function(entry, index) {
			if(entry.eventName == evt.eventName && entry.division == evt.division) {
				console.log("Contains event:", evt.eventName);
				foundEvent = true;
				if(remove) {
					arr.splice(index, 1);
				}
			}
		});
		if(foundEvent) {
			return true;
		} else {
			return false;
		}
	};

	var getEvents = function() {
		var d = $q.defer();
		$http({
			method: 'GET',
			url: '/tournament/' + $routeParams.tournamentID + '/events'
		}).success(function(data) {
			manageEventStatuses(data);
			d.resolve();
		}).error(function(err) {
			console.log('Error getting tournament events');
			d.reject(err);
		});

		return d.promise;
	};

	var manageEventStatuses = function(events) {
		events.forEach(function(evt) {
			if($scope.events[evt.division] === undefined) {
				$scope.events[evt.division] = {
					presented: [],
					pending: [],
					unfinished: []
				};
			}
			if(evt.status === 'Completed' &&
					!containsEvent($scope.events[evt.division].presented, evt) &&
					!containsEvent($scope.events[evt.division].pending, evt)) {
				console.log("Adding", evt.eventName, "to pending");
				$scope.events[evt.division].pending.push(evt);
				$scope.events[evt.division].unfinished = $scope.events[evt.division].unfinished.filter(function(elem) {
					return elem.eventName !== evt.eventName;
				});
				containsEvent($scope.events[evt.division].unfinished, evt, true);
			} else if(evt.status !== 'Completed' && !containsEvent($scope.events[evt.division].unfinished, evt)) {
				$scope.events[evt.division].unfinished.push(evt);
			}
		});

		var sortByName = function(a, b) {
			if(a.eventName < b.eventName) return -1;
			else return 1;
		};

		divisions = [];
		for(var key in $scope.events) {
			divisions.push(key);
			$scope.events[key].pending.sort(sortByName);
		}
		divisions.sort();
	};

	$scope.nextEvent = function() {
		getEvents().then(function() {
			console.log("got events", $scope.events, "divisions", divisions);
			var iterations = 0;
			if(!$scope.currentevent) {
				for(var j = 0; j < divisions.length; j++) {
					console.log("iterating through division", divisions[j]);
					if($scope.events[divisions[j]].pending.length > 0) {
						console.log("found one");
						$scope.currentevent = $scope.events[divisions[j]].pending[0];
						if($scope.disabled) {
							$scope.disabled = false;
							element.focus();
						}
						break;
					}
				}
			} else {
				for(var p = 0; p < $scope.events[$scope.currentevent.division].pending.length; p++) {
					if($scope.events[$scope.currentevent.division].pending[p].eventName === $scope.currentevent.eventName) {
						$scope.events[$scope.currentevent.division].pending.splice(p, 1);
						console.log("removed old event", $scope.events[$scope.currentevent.division].pending);
						p--;
					}
				}
				$scope.events[$scope.currentevent.division].presented.push($scope.currentevent);
				var i = divisions.indexOf($scope.currentevent.division);
				console.log("setting null");
				$scope.currentevent = null;
				console.log($scope.events);
				for(var k = 0; k < divisions.length; k++) {
					if(++i === divisions.length) i = 0;
					if($scope.events[divisions[i]].pending.length > 0) {
						$scope.currentevent = $scope.events[divisions[i]].pending[0];
						break;
					}
				}
			}
			if($scope.currentevent !== null) {
				getCurrentEventScores();
			} else {
				var unfinished = false;
				for(var division in $scope.events) {
					console.log("pending", $scope.events[division].pending);
					console.log("unfinished", $scope.events[division].unfinished);
					if($scope.events[division].pending.length > 0 || $scope.events[division].unfinished.length > 0) {
						unfinished = true;
					}
				}
				if(unfinished) {
					$scope.disabled = true;
				} else {
					$scope.inProgress = false;
					divisions.forEach(function(division, index) {
						finalScores(division, index === 0);
					});
				}
			}
		});
	};

	var getCurrentEventScores = function() {
		$http({
			method: 'GET',
			url: '/scoring/' + $routeParams.tournamentID + '/' + $scope.currentevent.division + '/' + $scope.currentevent.eventName + '/participators'
		}).success(function(data) {
			data.participators.sort(function(a, b) {
				if(a.place < b.place) {
					return -1;
				} else if(a.place > b.place) {
					return 1;
				} else {
					return 0;
				}
			});
			$scope.currentevent.topTeams = [];
			for(var i = 0; i < Number($scope.tournament.eventMedalCount); i++) {
				data.participators[i].revealed = false;
				$scope.currentevent.topTeams.unshift(data.participators[i]);
			}
		}).error(function(err) {
			console.log('Error fetching event scores');
		});
	};

	var finalScores = function(division, setCurrent) {
		$http({
			method: 'GET',
			url: '/scoring/' + $routeParams.tournamentID + '/' + division + '/ranks'
		}).success(function(data) {
			$scope.results[division] = {};
			$scope.results[division].eventName = "Overall Results";
			$scope.results[division].division = division;
			$scope.results[division].currentIndex = 0;
			$scope.results[division].teams = [];
			data.forEach(function(entry) {
				if($scope.results[division].teams[entry.team.number] === undefined) {
					$scope.results[division].teams.push({
						name: entry.team.name,
						school: entry.team.school,
						number: entry.team.number,
						totalScore: 0,
						firsts: 0
					});
				}

				$scope.results[division].teams.forEach(function(team) {
					if(team.number === entry.team.number) {
						team.totalScore += entry.place;
						if(entry.place === 1) {
							team.firsts++;
						}
					}
				});
			});

			$scope.results[division].teams.sort(function (a, b) {
				if(a.totalScore < b.totalScore) {
					return -1;
				} else if(a.totalScore > b.totalScore) {
					return 1;
				} else if(a.firsts > b.firsts) {
					return -1;
				} else if(a.firsts < b.firsts) {
					return 1;
				} else {
					return 0;
				}
			});

			var currentIndex = 0;
			console.log($scope.results[division].teams);
			$scope.results[division].topTeams = [];
			for(var i = 1; i <= Number($scope.tournament.overallTrophyCount); i++) {
				if($scope.tournament.oneTrophyPerSchool) {
					while($scope.results[division].topTeams.some(function(elem) { return elem.school === $scope.results[division].teams[currentIndex].school; })) {
						currentIndex++;
					}
					$scope.results[division].topTeams.unshift({
						team: {
							name: $scope.results[division].teams[currentIndex++].school
						},
						place: i
					});
				} else {
					$scope.results[division].topTeams.unshift({
						revealed: false,
						team: {
							name: $scope.results[division].teams[currentIndex].name,
							division: division,
							number: $scope.results[division].teams[currentIndex].number
						},
						place: i
					});
					currentIndex++;
				}
			}

			if(setCurrent) {
				$scope.placesLength = $scope.tournament.overallTrophyCount;
				$scope.entryHeight = 100/$scope.tournament.overallTrophyCount - 6;
				$scope.currentevent = $scope.results[division];
				console.log($scope.currentevent);
			}
		});
	};

	$scope.launchFullscreen = function() {
		if(element.requestFullscreen) {
			element.requestFullscreen();
		} else if(element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if(element.webkitRequestFullscreen) {
			console.log("requesting fullscreen");
			element.webkitRequestFullscreen();
		} else if(element.msRequestFullscreen) {
			element.msRequestFullscreen();
		}

		element.focus();
	};

	$scope.reveal = function() {
		console.log("revealing");
		if($scope.inProgress) {
			$scope.currentevent.topTeams[$scope.currentIndex].revealed = true;
		} else {
			if(!overallRevealed) {
				console.log($scope.currentIndex);
				$scope.currentevent.topTeams[$scope.currentevent.currentIndex++].revealed = true;
				overallRevealed = true;
			} else if(!($scope.currentevent.division === divisions[divisions.length - 1] && $scope.currentevent.currentIndex === $scope.tournament.overallTrophyCount)) {
				if(overallDivisionIndex === divisions.length - 1) {
					overallDivisionIndex = 0;
				} else {
					overallDivisionIndex++;
				}
				overallRevealed = false;
				$scope.currentevent = $scope.results[divisions[overallDivisionIndex]];
			}
			$scope.currentIndex = 0;
		}
		console.log("Current index:", $scope.currentIndex);
	};

	$scope.nextSlide = function() {
		$scope.nextEvent();
		console.log($scope.currentevent);
	};
}]);