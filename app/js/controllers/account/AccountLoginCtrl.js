angular.module('scoreApp').controller('AccountLoginCtrl', ['$scope', '$rootScope', '$http', 'alert',
	function($scope, $rootScope, $http, alert) {
	
	$scope.form = {};

	$scope.login = function() {
		$http({
			method: 'POST',
			url: '/account/login',
			data: $scope.form
		}).success(function(res) {
			if (res.status) {
				alert.success('Successfully logged in!');
				
				// FIX THIS WITH A SERVICE LATER
				$http({
					method: 'GET',
					url: '/account/current'
				}).success(function(res) {
					$rootScope.username = res.username;
				}).error(function(err) {
					console.log(err);	// Don't know if you can log to console from here? Ask Jeff.
				});
			}
			else {
				alert.danger('Invalid login!');
			}
		}).error(function(err) {
			console.log(err);
		});
	};

	$scope.logout = function() {
		$http({
			method: 'POST',
			url: '/account/logout',
			data: $scope.form
		}).success(function(res) {
			if (!res.status) {
				alert.success('Successfully logged out!');

				// FIX THIS WITH A SERVICE LATER
				$http({
					method: 'GET',
					url: '/account/current'
				}).success(function(res) {
					$rootScope.username = res.username;
				}).error(function(err) {
					console.log(err);	// Don't know if you can log to console from here? Ask Jeff.
				});
			}
			else {
				alert.danger('Logout not successful!');
			}
		}).error(function(err) {
			console.log(err);
		});
	};

}]);
