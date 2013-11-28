angular.module('scoreApp').controller('NavbarCtrl', ['$scope', '$modal', 'user', function($scope, $modal, user) {
	$scope.user = {};

	$scope.getUser = function() {
		user.current().then(function(user) {
			$scope.user = user;
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
}]);