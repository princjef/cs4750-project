angular.module('scoreApp').controller('TournamentEditCtrl', ['$scope', '$http', '$modalInstance', 'tournament', 'dropdowns', function($scope, $http, $modalInstance, tournament, dropdowns) {
	$scope.form = {};
	dropdowns.getTournamentLevels().then(function(data) {
		$scope.types = data;
	});
	$scope.editTournament = tournament.get();
	
	$scope.form.name = $scope.editTournament.name;
	$scope.form.date = $scope.editTournament.date;
	$scope.form.location = $scope.editTournament.location;
	$scope.form.type = $scope.editTournament.type;
	$scope.form.id = $scope.editTournament.id;
	$scope.form.eventMedalCount = $scope.editTournament.eventMedalCount;
	$scope.form.overallTrophyCount = $scope.editTournament.overallTrophyCount;
	$scope.form.oneTrophyPerSchool = $scope.editTournament.oneTrophyPerSchool;

	$scope.updateTournament = function() {
		$http({
			method:'POST',
			url:'/tournament/update',
			data:$scope.form
		}).success(function(data) {
			$scope.editTournament.name = $scope.form.name;
			$scope.editTournament.date = $scope.form.date;
			$scope.editTournament.location = $scope.form.location;
			$scope.editTournament.type = $scope.form.type;
			$scope.editTournament.id = $scope.form.id;
			$scope.editTournament.eventMedalCount = $scope.form.eventMedalCount;
			$scope.editTournament.overallTrophyCount = $scope.form.overallTrophyCount;
			$scope.editTournament.oneTrophyPerSchool = $scope.form.oneTrophyPerSchool;
			$modalInstance.dismiss('success');
		}).error(function(err) {
			console.log('Error editing tournament');
		});
	};
	
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
}]);