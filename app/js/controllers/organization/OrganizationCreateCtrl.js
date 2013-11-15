angular.module('scoreApp').controller('OrganizationCreateCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.form = {};
	$scope.createOrganization = function() {
		$http({
			method: 'POST',
			url: '/organization/create',
			data: $scope.form
		}).success(function(res) {
			console.log('Successfully created organization');
		}).error(function(err) {
			console.log(err);
		});
	};
}]);