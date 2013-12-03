angular.module('scoreApp').controller('OfficialCreateCtrl', ['$scope', '$window', '$http', '$modalInstance', 'alert', function($scope, $window, $http, $modalInstance, alert) {
	$scope.form = {};
	
	$scope.createOfficial = function() {
		$http({
			method:'POST',
			url:'/official/create',
			data:$scope.form
		}).success(function(res) {
			$modalInstance.dismiss('success');
			alert.success('New official created successfully!');
		}).error(function(err) {
			console.log(err);
			$scope.errorMessage = err;
		});
	};
	
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
}]);