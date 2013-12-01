angular.module('scoreApp').controller('TeamEditCtrl', ['$scope', '$modalInstance', '$http', 'team', 'states', 'dropdowns', function($scope, $modalInstance, $http, team, states, dropdowns) {
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
			$scope.coaches.push({
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
	
	$scope.removeCoach = function(coach) {
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
			var i = $scope.coaches.indexOf(coach);
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
				if($scope.coaches.indexOf(coachValid) === -1) {
					$scope.coaches.push(coachValid);
					$scope.form.coach = undefined;
				}
			} else {
				$scope.errorMessage = 'This coach does not exist. Create new official? (The current team will be lost)';
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
	};
}]);