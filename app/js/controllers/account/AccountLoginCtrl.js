angular.module('scoreApp').controller('AccountLoginCtrl',
	['$scope', '$rootScope', '$http', 'alert', 'user',
		function($scope, $rootScope, $http, alert, user) {
	
	$scope.form = {};

	$scope.login = function() {
		$http({
			method: 'POST',
			url: '/account/login',
			data: $scope.form
		}).success(function(res) {
			if (res.status) {
				alert.success('Successfully logged in!');
				user.current();	// Update current user.
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
				user.clear();	// Clear current user.
			}
			else {
				alert.danger('Logout not successful!');
			}
		}).error(function(err) {
			console.log(err);
		});
	};

}]);
