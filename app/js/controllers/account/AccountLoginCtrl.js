angular.module('scoreApp').controller('AccountLoginCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {
	$scope.form = {};

	$scope.login = function() {
		$http({
			method: 'POST',
			url: '/login',
			data: $scope.form
		}).success(function(res) {
			$window.alert('Successfully logged in!');
		}).error(function(err) {
			console.log(err);
		});
	};
}]);
