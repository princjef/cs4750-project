angular.module('scoreApp').controller('AccountLoginPageCtrl', ['$scope', '$http', '$location', '$routeParams', '$rootScope', 'alert', function($scope, $http, $location, $routeParams, $rootScope, alert) {
	$scope.form = {};

	$scope.login = function() {
		$http({
			method: 'POST',
			url: '/account/login',
			data: $scope.form
		}).success(function(res) {
			if (res.status) {
				alert.success('Successfully logged in!');
				if($routeParams.redirect) {
					$location.url($routeParams.redirect);
				} else {
					console.log('no redirect :(');
				}
				$rootScope.$emit('login');
			}
			else {
				alert.danger('Invalid login!');
			}
		}).error(function(err) {
			alert.danger(err);
		});
	};
}]);