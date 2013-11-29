angular.module('scoreApp').controller('AccountLoginCtrl',
	['$scope', '$rootScope', '$http', '$modalInstance', 'alert', 'user',
		function($scope, $rootScope, $http, $modalInstance, alert, user) {
	
	$scope.form = {};

	$scope.login = function() {
		$http({
			method: 'POST',
			url: '/account/login',
			data: $scope.form
		}).success(function(res) {
			if (res.status) {
				alert.success('Successfully logged in!');
				user.current().then(function(res) {
					$modalInstance.close();
				});
			}
			else {
				alert.danger('Invalid login!');
			}
		}).error(function(err) {
			alert.danger(err);
		});
	};

	$scope.close = function() {
		$modalInstance.dismiss('cancel');
	};

}]);
