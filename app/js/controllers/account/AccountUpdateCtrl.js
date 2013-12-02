angular.module('scoreApp').controller('AccountUpdateCtrl',
	['$scope', '$http', 'alert', 'user', function($scope, $http, alert, user) {

	$scope.form = {};

	$scope.updatePassword = function() {
		$http({
			method: 'POST',
			url: '/account/updatePassword',
			data: $scope.form
		}).success(function(res) {
			if (res.status) {
				alert.success('Successfully updated password!');
			}
			else {
				alert.danger('Password update not successful!');
			}
		}).error(function(err) {
			alert.danger(err);
		});
	};

	$scope.updateEmail = function() {
		$http({
			method: 'POST',
			url: '/account/updateEmail',
			data: $scope.form
		}).success(function(res) {
			if (res.status) {
				alert.success('Successfully updated email!');
			}
			else {
				alert.danger('Email update not successful!');
			}
		}).error(function(err) {
			alert.danger(err);
		});
	};
}]);