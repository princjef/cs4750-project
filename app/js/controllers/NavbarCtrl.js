angular.module('scoreApp').controller('NavbarCtrl', ['$scope', '$http', '$modal', 'user', 'alert', function($scope, $http, $modal, user, alert) {
	$scope.user = {};

	$scope.getUser = function() {
		user.current().then(function(user) {
			$scope.user = user;
			console.log(user);
		});
	};

	$scope.getUser();

	$scope.openLogin = function() {
		var loginForm = $modal.open({
			templateUrl: '/partials/account/login.html',
			controller: 'AccountLoginCtrl'
		});

		loginForm.result.then(function() {
			$scope.getUser();
		});
	};

	$scope.logout = function() {
		$http({
			method: 'POST',
			url: '/account/logout'
		}).success(function(res) {
			if (res.status) {
				alert.success('Successfully logged out');
				$scope.getUser();
			}
			else {
				alert.danger('Logout not successful');
			}
		}).error(function(err) {
			alert.danger(err);
		});
	};
}]);