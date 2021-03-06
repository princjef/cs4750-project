angular.module('scoreApp').controller('TournamentCreateCtrl', ['$scope', '$http', '$modalInstance', 'dropdowns', 'alert', 'organizationID', function($scope, $http, $modalInstance, dropdowns, alert, organizationID) {
	$scope.form = {};
	$scope.form.organizationID = organizationID;

	dropdowns.getTournamentLevels().then(function(data) {
		$scope.types = data;
		$scope.form.type = data[0];
	});

	$scope.createTournament = function() {
		$http({
			method: 'POST',
			url: '/tournament/create',
			data: $scope.form
		}).success(function(tournament) {
			$modalInstance.close(tournament);
			alert.success('Successfully created tournament');
		}).error(function(err) {
			alert.danger(err);
		});
	};

	$scope.close = function() {
		$modalInstance.dismiss('cancel');
	};
}]);