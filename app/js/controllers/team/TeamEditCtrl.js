angular.module('scoreApp').controller('TeamEditCtrl', ['$scope', '$modalInstance', '$http', 'team', 'states', function($scope, $modalInstance, $http, team, states) {
	$scope.form = {};
	$scope.states = states.getStates();
	$scope.editTeam = team.get(); 
	
	$scope.form.tournamentID = $scope.editTeam.tournamentID;
	$scope.form.number = $scope.editTeam.number;
	$scope.form.division = $scope.editTeam.division;
	$scope.form.name = $scope.editTeam.name;
	$scope.form.state = $scope.editTeam.state;
	$scope.form.school = $scope.editTeam.school;
	
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
	
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
}]);