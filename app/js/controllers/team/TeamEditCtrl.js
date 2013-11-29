angular.module('scoreApp').controller('TeamEditCtrl', ['$scope', '$modalInstance', '$http', 'team', function($scope, $modalInstance, $http, team) {
	$scope.states = ['AL','AK','AZ','AR','CA','CO','CT','DC','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME',
					'MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI',
					'SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
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