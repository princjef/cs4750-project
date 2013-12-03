angular.module('scoreApp').controller('OrganizationUpdateCtrl', ['$scope', '$rootScope', '$http', '$modalInstance', 'alert', '$location', '$window', 'organization', function($scope, $rootScope, $http, $modalInstance, alert, $location, $window, organization) {
	$scope.organization = organization;
	$scope.form = {
		name: organization.name
	};

	$scope.updateOrganization = function() {
		$http({
			method: 'POST',
			url: '/organization/update',
			data: {
				name: $scope.form.name,
				id: organization.id
			}
		}).success(function(org) {
			alert.success('Organization successfully updated');
			$rootScope.$emit('updateUser');
			$modalInstance.close(org);
		}).error(function(err) {
			alert.danger(err);
		});
	};

	$scope.removeOrganization = function() {
		if($window.confirm('Are you sure you want to remove ' + organization.name + '? This cannot be undone!')) {
			$http({
				method: 'POST',
				url: '/organization/remove',
				data: {
					orgID: organization.id
				}
			}).success(function() {
				alert.success($scope.organization.name + ' successfully removed');
				$rootScope.$emit('updateUser');
				$location.path('/');
				$modalInstance.dismiss('cancel');
			}).error(function(err) {
				alert.danger(err);
			});
		}
		$location.path('/account/update');
	};

	$scope.close = function() {
		$modalInstance.dismiss('cancel');
	};
}]);