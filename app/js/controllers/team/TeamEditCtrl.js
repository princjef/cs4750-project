angular.module('scoreApp').controller('TeamEditCtrl', ['$scope', '$modalInstance', '$http', 'team', 'states', function($scope, $modalInstance, $http, team, states) {
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
	
	$scope.form.tournamentID = $scope.editTeam.tournamentID;
	$scope.form.number = $scope.editTeam.number;
	$scope.form.division = $scope.editTeam.division;
	$scope.form.name = $scope.editTeam.name;
	$scope.form.state = $scope.editTeam.state;
	$scope.form.school = $scope.editTeam.school;
	
	var addCoaches = function() {
		var err = false;
		var added = 0;
		$scope.coaches.forEach(function(entry) {
			$http({
				method:'POST',
				url:'/team/addcoach',
				data:{
					tournamentID:$scope.form.tournamentID,
					division:$scope.form.division,
					teamNumber:$scope.form.teamNumber,
					officialID:entry.value
				}
			}).success(function(data) {
				added = added + 1;
				console.log('Added Coach ' + entry.name);
				if(!err && added === $scope.coaches.length) {
					$scope.cancel();
				}
			}).error(function(err) {
				if(!$scope.errorMessage) {
					$scope.errorMessage = 'Team created, but could not add coach(es): ' + entry.name;
				} else {
					$scope.errorMessage = $scope.errorMessage + ', ' + entry.name;
				}
				err = true;
			});
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