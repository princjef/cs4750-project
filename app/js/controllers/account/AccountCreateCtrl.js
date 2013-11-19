angular.module('scoreApp').controller('AccountCreateCtrl', ['%scope', '$http', '$window', function($scope, $http, $window) {
	$scope.form = {};

	$scope.createAccount = function() {
		$http({
			method: 'POST',
			url: '/account/create',
			data: $scope.form
		}).success(function(res) {
			$window.alert('Successfully created account');
		}).error(function(err) {
			console.log(err);
		});
	};
}]);

