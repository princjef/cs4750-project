angular.module('scoreApp').controller('TeamAddCtrl', ['$scope', '$routeParams', '$http', '$modalInstance', '$location', 'states', 'dropdowns', function($scope, $routeParams, $http, $modalInstance, $location, states, dropdowns) {
	$scope.cancel = function(path) {
		$modalInstance.dismiss('cancel');
		if(path){
			$location.path(path);
		}
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
	$scope.coaches = [];
	$scope.badCoach = false;
	$scope.form.tournamentID = $routeParams.tournamentID;
	$scope.states = states.getStates();
	
	$scope.form.state = $scope.states[0];
	$scope.divisions = ['A', 'B', 'C'];
	$scope.form.division = $scope.divisions[0];
	
	var addCoaches = function() {
		var err = false;
		var added = 0;
		$scope.coaches.forEach(function(entry) {
			$scope.form.officialID = entry.value;
			console.log("ooooo " + entry.value);
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
	
	$scope.createTeam = function() {
		$http({
			method:'POST',
			url:'/tournament/' + $routeParams.tournamentID + '/addteam',
			data:$scope.form
		}).success(function(result) {
			console.log('Added the team');
			addCoaches();
		}).error(function(err) {
			$scope.errorMessage = 'Unable to add team';
			console.log('Unable to add team');	
		});
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
		var i = $scope.coaches.indexOf(coach);
		$scope.coaches.splice(i, 1);
	};
}]);