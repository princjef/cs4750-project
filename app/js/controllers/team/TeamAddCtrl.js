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
	$scope.badCoach = false;
	$scope.form.tournamentID = $routeParams.tournamentID;
	$scope.states = states.getStates();
	
	$scope.form.state = $scope.states[0];
	$scope.divisions = ['A', 'B', 'C'];
	$scope.form.division = $scope.divisions[0];
	
	var addCoach = function() {
		$http({
			method:'POST',
			url:'/team/addcoach',
			data:$scope.form
		}).success(function(data) {
			console.log('Added Coach');
			$scope.cancel();
		}).error(function(err) {
			$scope.errorMessage = 'Team created, but coach failed';
		});
	};
	
	var createTeam = function(andCoach) {
		$http({
			method:'POST',
			url:'/tournament/' + $routeParams.tournamentID + '/addteam',
			data:$scope.form
		}).success(function(result) {
			console.log('Added the team');
			if(andCoach) {
				addCoach();
			} else {
				$scope.cancel();
			}
		}).error(function(err) {
			console.log('Unable to add team');	
		});
	};
	
	$scope.checkCoach = function() {
		if(!$scope.form.coach) {
			console.log('No Coach');
			createTeam(false);
		} else {
			console.log('Yes coach');
			var coachValid = false;
			$scope.officials.forEach(function(entry) {
				if(entry.name === $scope.form.coach) {
					coachValid = true;
					$scope.form.officialID = entry.value;
				}
			});
			if(coachValid) {
				createTeam(true);
			} else {
				$scope.errorMessage = 'This coach does not exist. Create new official? (The current team will be lost)';
				$scope.badCoach = true;
			}
		}
	};
	
	$scope.removeCoach = function() {
		$scope.badCoach = false;
		$scope.form.coach = undefined;
		$scope.errorMessage = undefined;
	};
}]);