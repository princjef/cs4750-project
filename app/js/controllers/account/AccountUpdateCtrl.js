angular.module('scoreApp').controller('AccountUpdateCtrl',
	['$scope', '$http', 'alert', 'user', function($scope, $http, alert, user) {

	$scope.form = {};

	$scope.updateAccount = function() {
		$http({
			method: 'POST',
			url: '/account/update',
			data: $scope.form
		}).success(function(res) {
			if (res.status) {
				alert.success('Successfully updated account!');
			}
			else {
				alert.danger('Account update not successful!');
			}
		}).error(function(err) {
			alert.danger(err);
		});
	};
}]);