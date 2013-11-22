angular.module('scoreApp').controller('TournamentCreateCtrl', ['$scope', '$http', 'dropdowns', '$window', function($scope, $http, dropdowns, $window) {
	$scope.form = {};

	$dropdowns.getTournamentLevels().then(function(data) {
		$scope.types = data;
		$scope.form.type = data[0];
	});

	$scope.createTournament = function() {
		$http({
			method: 'POST',
			url: '/tournament/create',
			data: $scope.form
		}).success(function(res) {
			$window.alert('Successfully created tournament');
		}).error(function(err) {
			console.log(err);
		});
	};
}]);