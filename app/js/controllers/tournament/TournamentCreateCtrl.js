angular.module('scoreApp').controller('TournamentCreateCtrl', ['$scope', '$http', 'dropdowns', 'alert', '$window', function($scope, $http, dropdowns, alert, $window) {
	$scope.form = {};

	dropdowns.getTournamentLevels().then(function(data) {
		$scope.types = data;
		$scope.form.type = data[0];
	});

	$scope.createTournament = function() {
		$http({
			method: 'POST',
			url: '/tournament/create',
			data: $scope.form
		}).success(function(res) {
			alert.success('Successfully created tournament');
		}).error(function(err) {
			alert.danger(err);
		});
	};
}]);