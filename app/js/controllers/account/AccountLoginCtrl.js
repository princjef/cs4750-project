angular.module('scoreApp').controller('AccountLoginCtrl',
	['$scope', '$rootScope', 'api', '$modalInstance', 'alert', 'user',
		function($scope, $rootScope, api, $modalInstance, alert, user) {
	
	$scope.form = {};

	$scope.login = function() {
		api.login($scope.form).then(function(msg) {
			alert.success(msg);
			user.current().then(function(res) {
				$modalInstance.close();
			});
		}, function(err) {
			alert.danger(err);
		});
	};

	$scope.close = function() {
		$modalInstance.dismiss('cancel');
	};

}]);
