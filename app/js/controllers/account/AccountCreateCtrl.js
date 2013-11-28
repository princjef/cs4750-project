angular.module('scoreApp').controller('AccountCreateCtrl',
	['$scope', '$http', 'alert', 'user', function($scope, $http, alert, user) {

	$scope.form = {};

	$scope.createAccount = function() {
		$http({
			method: 'POST',
			url: '/account/create',
			data: $scope.form
		}).success(function(res) {
			if (res.status) {
				alert.success('Successfully created account!');
				user.current();	// Update current user.
			}
			else {
				alert.danger('Account creation not successful!');
			}
		}).error(function(err) {
			alert.danger(err);
		});
	};
}]);