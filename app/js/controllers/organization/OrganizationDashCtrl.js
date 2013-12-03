angular.module('scoreApp').controller('OrganizationDashCtrl', ['$scope', '$http', '$routeParams', '$modal', '$window', 'alert', function($scope, $http, $routeParams, $modal, $window, alert) {
	$http({
		method: 'GET',
		url: '/organization/' + $routeParams.organizationID + '/info'
	}).success(function(res) {
		$scope.organization = res;
	}).error(function(err) {
		alert.danger(err);
	});

	$http({
		method: 'GET',
		url: '/organization/' + $routeParams.organizationID + '/admins'
	}).success(function(res) {
		$scope.admins = res;
	}).error(function(err) {
		alert.danger(err);
	});

	$http({
		method: 'GET',
		url: '/organization/' + $routeParams.organizationID + '/tournaments'
	}).success(function(res) {
		$scope.tournaments = res;
	}).error(function(err) {
		alert.danger(err);
	});

	$scope.addTournament = function() {
		var newTournament = $modal.open({
			templateUrl: '/partials/tournament/new.html',
			controller: 'TournamentCreateCtrl',
			resolve: {
				organizationID: function() {
					return $routeParams.organizationID;
				}
			}
		});

		newTournament.result.then(function(tournament) {
			$scope.tournaments.push(tournament);
		});
	};

	$scope.newAdmin = {
		active: false,
		username: '',
		submit: function() {
			$http({
				method: 'POST',
				url: '/organization/' + $routeParams.organizationID + '/admins/add',
				data: {
					username: $scope.newAdmin.username
				}
			}).success(function(account) {
				$scope.admins.push(account);
				$scope.newAdmin.active = false;
			}).error(function(err) {
				alert.danger(err);
			});
		}
	};

	$scope.removeAdmin = function(account) {
		if($window.confirm('Are you sure you want to remove ' + account.username + ' from ' + $scope.organization.name + '?')) {
			$http({
				method: 'POST',
				url: '/organization/' + $routeParams.organizationID + '/admins/remove',
				data: {
					username: account.username
				}
			}).success(function(account) {
				for(var i = 0; i < $scope.admins.length; i++) {
					if($scope.admins[i].username === account.username) {
						$scope.admins.splice(i, 1);
					}
				}
				alert.success(account.username + ' successfully removed');
			}).error(function(err) {
				alert.danger(err);
			});
		}
	};

	$scope.removeTournament = function($event, tournament) {
		if($window.confirm('Are you sure you want to remove ' + tournament.name + ' from ' + $scope.organization.name + '? This cannot be undone!')) {
			$http({
				method: 'POST',
				url: '/tournament/remove',
				data: {
					tournamentID: tournament.id
				}
			}).success(function() {
				for(var i = 0; i < $scope.tournaments.length; i++) {
					if($scope.tournaments[i].id === tournament.id) {
						$scope.tournaments.splice(i, 1);
					}
				}
				alert.success(tournament.name + ' successfully removed');
			}).error(function(err) {
				alert.danger(err);
			});
		}

		if ($event.stopPropagation) $event.stopPropagation();
		if ($event.preventDefault) $event.preventDefault();
		$event.cancelBubble = true;
		$event.returnValue = false;
	};
}]);