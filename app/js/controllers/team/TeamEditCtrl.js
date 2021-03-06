angular.module('scoreApp').controller('TeamEditCtrl', ['$scope', '$modalInstance', '$http', 'team', 'states', 'dropdowns', 'alert', function($scope, $modalInstance, $http, team, states, dropdowns, alert) {
	var indexOfID = function(a, toCheck) {
		var index = 0;
		var returnV = -1;
		a.forEach(function(entry) {
			if(entry.value === toCheck.value) {
				returnV =  index;
			} else {
				index = index + 1;
			}
		});
		return returnV;
	};
	
	dropdowns.getOfficials().then(function(data) {
		var names = [];
		data.forEach(function(entry) {
			var entryName = entry.name_first + ' ' + entry.name_last + ' (' + entry.officialID + ')';
			names.push({
				name:entryName,
				value:entry.officialID
			});
		});
		$scope.officials = names;
	});
	
	$scope.form = {};
	$scope.states = states.getStates();
	$scope.editTeam = team.get();
	$scope.coaches = []; 
	var originalCoaches = [];
	var coachesToAdd = [];
	var coachesToRemove = [];
	
	
	var queryCounter;
	var numQuery;
	var startCounting = function() {
		queryCounter = 0;
		numQuery = coachesToAdd.length + coachesToRemove.length + 1;
	};
	var signalFinished = function() {
		console.log('Success');
		queryCounter++;
		if(queryCounter === numQuery) {
			$modalInstance.dismiss('success');
			alert.success('Team successfully updated!');
		}
	};
	
	$scope.form.tournamentID = $scope.editTeam.tournamentID;
	$scope.form.teamNumber = $scope.editTeam.number;
	$scope.form.number = $scope.editTeam.number;
	$scope.form.division = $scope.editTeam.division;
	$scope.form.name = $scope.editTeam.name;
	$scope.form.state = $scope.editTeam.state;
	$scope.form.school = $scope.editTeam.school;
	
	console.log('/team/' + $scope.form.teamNumber + '/getcoaches  ' + $scope.form.tournamentID);
	
	$http({
		method:'GET',
		url:'/team/' + $scope.form.tournamentID + '/' + $scope.form.division + '/' + $scope.form.teamNumber + '/getcoaches'
	}).success(function(data) {
		console.log(' ' + data.length);
		data.forEach(function(entry) {
			var o = {
				name:entry.name_first + ' ' + entry.name_last + ' (' + entry.officialID + ')',
				value:entry.officialID
			};
			$scope.coaches.push(o);
			originalCoaches.push({
				name:entry.name_first + ' ' + entry.name_last + ' (' + entry.officialID + ')',
				value:entry.officialID
			});
		});
	}).error(function(err) {
		$scope.errorMessage = 'Error getting team coaches';
	});
	
	var addCoach = function(coach) {
		$http({
			method:'POST',
			url:'/team/addcoach',
			data:{
				tournamentID:$scope.form.tournamentID,
				division:$scope.form.division,
				teamNumber:$scope.form.teamNumber,
				officialID:coach.value
			}
		}).success(function(data) {
			coachesToAdd.splice(indexOfID(coachesToAdd, coach), 1);
			signalFinished();
		}).error(function(err) {
			if(!$scope.errorMessage) {
				$scope.errorMessage = 'Could not add ' + coach.name;
			} else {
				$scope.errorMessage = $scope.errorMessage + '\nCould not add ' + coach.name;
			}
		});
	};
	
	var removeCoach = function(coach) {
		$http({
			method:'POST',
			url:'/team/removecoach',
			data:{
				tournamentID:$scope.form.tournamentID,
				division:$scope.form.division,
				teamNumber:$scope.form.teamNumber,
				officialID:coach.value
			}
		}).success(function(data) {
			console.log('Removed Coach ' + coach.name + " " + data);
			coachesToRemove.splice(indexOfID(coachesToRemove, coach), 1);
			signalFinished();
		}).error(function(err) {
			if(!$scope.errorMessage) {
				$scope.errorMessage = 'Could not remove ' + coach.name;
			} else {
				$scope.errorMessage = $scope.errorMessage + '\nCould not remove ' + coach.name;
			}
		});
	};
	
	$scope.updateTeam = function() {
		startCounting();
		$http({
			method:'POST',
			url:'/tournament/' + $scope.editTeam.tournamentID + '/updateteam',
			data:$scope.form
		}).success(function(data) {
			$scope.editTeam.name = $scope.form.name;
			$scope.editTeam.state = $scope.form.state;
			$scope.editTeam.school = $scope.form.school;
			signalFinished();
		}).error(function(err) {
			if(!$scope.errorMessage) {
				$scope.errorMessage = "Failed to update Team";
			} else {
				$scope.errorMessage = $scope.errorMessage + "\nFailed to update Team";
			}
		});
		coachesToAdd.forEach(function(entry) {
			addCoach(entry);
		});
		coachesToRemove.forEach(function(entry) {
			removeCoach(entry);
		});
	};
	
	$scope.cancel = function(path) {
		$modalInstance.dismiss('cancel');
		if(path){
			$location.path(path);
		}
	};
	
	$scope.checkCoach = function() {
		if(!$scope.form.coach) {
			console.log('No Coach');
		} else {
			console.log('Yes coach');
			var coachValid = null;
			$scope.officials.forEach(function(entry) {
				if(entry.name === $scope.form.coach) {
					coachValid = entry;
				}
			});
			if(coachValid) {
				if(indexOfID($scope.coaches, coachValid) === -1) {
					$scope.coaches.push(coachValid);
					if(indexOfID(originalCoaches, coachValid, true) === -1) {
						coachesToAdd.push(coachValid);
					}
					var removeIndex = indexOfID(coachesToRemove, coachValid);
					if(removeIndex !== -1) {
						coachesToRemove.splice(removeIndex, 1);
					}
					$scope.form.coach = undefined;
				}
			} else {
				$scope.errorMessage = 'This coach does not exist. Create new official? (The current team will not be updated)';
				$scope.badCoach = true;
			}
		}
	};
	
	$scope.cancelCoach = function() {
		$scope.badCoach = false;
		$scope.form.coach = undefined;
		$scope.errorMessage = undefined;
	};
	
	$scope.removeCoach = function(coach) {
		var displayIndex = indexOfID($scope.coaches, coach);
		var toAddIndex = indexOfID(coachesToAdd, coach);
		$scope.coaches.splice(displayIndex, 1);
		if(toAddIndex === -1) {
			coachesToRemove.push(coach);
		} else {
			coachesToAdd.splice(toAddIndex, 1);
		}
	};
}]);