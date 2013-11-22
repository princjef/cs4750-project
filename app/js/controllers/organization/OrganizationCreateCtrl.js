angular.module('scoreApp').controller('OrganizationCreateCtrl', ['$scope', '$http', 'alert', function($scope, $http, alert) {
	$scope.form = {};
	$scope.createOrganization = function() {
		$http({
			method: 'POST',
			url: '/organization/create',
			data: $scope.form
		}).success(function(res) {
			alert.success('Successfully created organization');
		}).error(function(err) {
			alert.danger(err);
		});
	};
}]);