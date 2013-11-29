angular.module('scoreApp').controller('TournamentEditCtrl', ['$scope', '$http', 'tournament', function($scope, $http, tournament) {
	$scope.editTournament = tournament.get();
	
	$scope.updateTournament = function() {
		$http({
			method:'POST',
			url:'/tournament/update',
			data:$scope.editTournament
		}).success(function(data) {
			
		}).error(function(err) {
			console.log('Error editing tournament');
		});
	};
	
	$scope.cancel = function() {
		
	};
}]);