angular.module('scoreApp').controller('TeamAddCtrl', ['$scope', '$routeParams', '$http', '$modalInstance', 'states', function($scope, $routeParams, $http, $modalInstance, states) {
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
	$scope.form = {};
	$scope.tournamentID = $routeParams.tournamentID;
	$scope.states = states.getStates();
	
	$scope.form.state = $scope.states[0];
	$scope.divisions = ['A', 'B', 'C'];
	$scope.form.division = $scope.divisions[0];
	$scope.createTeam = function() {
		$http({
			method:'POST',
			url:'/tournament/' + $routeParams.tournamentID + '/addteam',
			data:$scope.form
		}).success(function(result) {
			console.log('Added the team');
		}).error(function(err) {
			console.log('Unable to add team');	
		});
	};
}]);