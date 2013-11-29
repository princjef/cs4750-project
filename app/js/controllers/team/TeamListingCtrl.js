angular.module('scoreApp').controller('TeamListingCtrl', ['$scope', '$window', '$http', '$routeParams', '$modal', 'tournament', 'alert', 'team', function($scope, $window, $http, $routeParams, $modal, tournament, alert, team) {	
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
	
	$scope.removeTeam = function(t) {
		$http({
			method:'POST',
			url:'/tournament/' + $routeParams.tournamentID + '/removeteam',
			data:t
		}).success(function(data) {
			var i = $scope.teams.indexOf(t);
			$scope.teams.splice(i, 1);
		}).error(function(err) {
			alert.danger('There was an error. Could not remove ' + t.name + '!');
		});
	};
	
	$scope.editTeamWindow = function(t) {
		team.set(t);
		$modal.open({
			templateUrl:'/partials/team/editteam.html',
			controller:'TeamEditCtrl'
		});
		
	};
}]);