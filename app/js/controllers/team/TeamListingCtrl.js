angular.module('scoreApp').controller('TeamListingCtrl', ['$scope', '$window', '$http', '$routeParams', '$modal', 'tournament', 'alert', function($scope, $window, $http, $routeParams, $modal, tournament, alert) {
	$http({
		method:'GET',
		url:'/tournament/' + $routeParams.tournamentID + '/teams',
		cache:true
	}).success(function(data) {
		$scope.teams = data;
	}).error(function(err) {
		console.log('Error getting teams');
	});

	$scope.addTeam = function() {
		$modal.open({
			templateUrl:'/partials/team/newteam.html',
			controller:'TeamAddCtrl'
		});
	};
	
	$scope.removeTeam = function(team) {
		console.log('/tournament/' + $routeParams.tournamentID + '/removeteam');
		$http({
			method:'POST',
			url:'/tournament/' + $routeParams.tournamentID + '/removeteam',
			data:team
		}).success(function(data) {
			var i = $scope.teams.indexOf(team);
			$scope.teams.splice(i, 1);
		}).error(function(err) {
			alert.danger('There was an error. Could not remove ' + team.name + '!');
		});
	};
}]);