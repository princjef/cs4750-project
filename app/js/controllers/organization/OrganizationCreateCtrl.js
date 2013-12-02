angular.module('scoreApp').controller('OrganizationCreateCtrl', ['$scope', '$http', '$modalInstance', 'alert', function($scope, $http, $modalInstance, alert) {
	$scope.form = {};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

	$scope.createOrganization = function() {
		$http({
			method: 'POST',
			url: '/organization/create',
			data: $scope.form
		}).success(function(organization) {
			$modalInstance.close(organization);
			alert.success('Successfully created organization');
		}).error(function(err) {
			alert.danger(err);
		});
	};
}]);