angular.module('scoreApp').controller('AccountLoginCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {
	$scope.form = {};

	$scope.login = function() {
		$http({
			method: 'POST',
			url: '/account/login',
			data: $scope.form
		}).success(function(res) {
			if (res.status) {
				$window.alert('Successfully logged in!');
				console.log(res.user);
			}
			else {
				$window.alert('Invalid login!');
			}
		}).error(function(err) {
			console.log(err);
		});
	};
}]);
