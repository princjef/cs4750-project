angular.module('scoreApp').controller('TeamEditCtrl', ['$scope', '$modalInstance', '$http', 'team', 'states', function($scope, $modalInstance, $http, team, states) {
	$scope.states = states.getStates();
	$scope.editTeam = team.get(); 
	$scope.updateTeam = function() {
		$http({
			method:'POST',
			url:'/tournament/' + $scope.editTeam.tournamentID + '/updateteam',
			data:$scope.editTeam
		}).success(function(data) {
			$modalInstance.dismiss('success');
		}).error(function(err) {

		});
	};
	
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
}]);