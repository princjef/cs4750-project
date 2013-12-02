angular.module('scoreApp').controller('OfficialEditCtrl', ['$scope', '$http', '$modalInstance', 'official', 'alert', function($scope, $http, $modalInstance, official, alert) {
	var editOfficial = official.get();
	$scope.form = {
		name_first:editOfficial.name_first,
		name_last:editOfficial.name_last,
		officialID:editOfficial.officialID,
		phone:editOfficial.phone,
		email:editOfficial.email
	};
	
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
	
	$scope.updateOfficial = function() {
		$http({
			method:'POST',
			url:'/official/update',
			data:$scope.form
		}).success(function(data) {
			editOfficial.name_first = $scope.form.name_first;
			editOfficial.name_last = $scope.form.name_last;
			editOfficial.phone = $scope.form.phone;
			editOfficial.email = $scope.form.email;
			$modalInstance.dismiss('success');
			alert.success('Successfully updated official!');
		}).error(function(err) {
			console.log('Error updating official');
			$scope.errorMessage = err;
		});
	};
}]);