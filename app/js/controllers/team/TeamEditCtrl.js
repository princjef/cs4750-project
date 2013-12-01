angular.module('scoreApp').controller('TeamEditCtrl', ['$scope', '$modalInstance', '$http', 'team', 'states', 'dropdowns', function($scope, $modalInstance, $http, team, states, dropdowns) {
	var print = function(a) {
		var s = " a: ";
		a.forEach(function(entry) { s = s + entry.value + " ";});
		return s;
	};
	
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
	
	var printStatus = function() {
		var addString = "Coaches To Add: ";
		var removeString = "Coaches To Remove: ";
		coachesToAdd.forEach(function(entry) {
			addString = addString + ", " + entry.name;
		});
		coachesToRemove.forEach(function(entry) {
			removeString = removeString + ", " + entry.name;
		});
		console.log(addString);
		console.log(removeString);
	};
	
	$scope.form.tournamentID = $scope.editTeam.tournamentID;
	$scope.form.number = $scope.editTeam.number;
	$scope.form.division = $scope.editTeam.division;
	$scope.form.name = $scope.editTeam.name;
	$scope.form.state = $scope.editTeam.state;
	$scope.form.school = $scope.editTeam.school;
	
	console.log('/team/' + $scope.form.number + '/getcoaches  ' + $scope.form.tournamentID);
	
	$http({
		method:'GET',
		url:'/team/' + $scope.form.tournamentID + '/' + $scope.form.division + '/' + $scope.form.number + '/getcoaches'
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
			$scope.coaches.add(coach);
		}).error(function(err) {
			$scope.errorMessage = 'Could not add coach ' + coach.name;
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
			console.log('Removed Coach ' + entry.name);
			var i = indexOfID($scope.coaches, coach);
			$scope.coaches.splice(i, 1);
		}).error(function(err) {
			$scope.errorMessage = 'Could not remove ' + entry.name;
		});
	};
	
	$scope.updateTeam = function() {
		$http({
			method:'POST',
			url:'/tournament/' + $scope.editTeam.tournamentID + '/updateteam',
			data:$scope.form
		}).success(function(data) {
			$scope.editTeam.name = $scope.form.name;
			$scope.editTeam.state = $scope.form.state;
			$scope.editTeam.school = $scope.form.school;
			$modalInstance.dismiss('success');
		}).error(function(err) {

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
		printStatus();
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
		printStatus();
	};
}]);