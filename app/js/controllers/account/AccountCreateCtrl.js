angular.module('scoreApp').controller('AccountCreateCtrl', ['%scope', '$http', function($scope, $http) {
	$scope.form = {};

	$scope.createAccount = function() {
		$http({
			method: 'POST',
			url: '/tournament/create',
			data: $scope.form
		}).success(function(res) {
			console.log('Successfully created account');
		}).error(function(err) {
			console.log(err):
		});
	};
}]);

