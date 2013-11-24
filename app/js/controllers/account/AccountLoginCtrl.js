angular.module('scoreApp').controller('AccountLoginCtrl', ['$scope', '$http', 'alert', function($scope, $http, alert) {
	$scope.form = {};

	$scope.login = function() {
		$http({
			method: 'POST',
			url: '/account/login',
			data: $scope.form
		}).success(function(res) {
			if (res.status) {
				alert.success('Successfully logged in!');
				console.log(res.user);
			}
			else {
				alert.danger('Invalid login!');
			}
		}).error(function(err) {
			console.log(err);
		});
	};
}]);
