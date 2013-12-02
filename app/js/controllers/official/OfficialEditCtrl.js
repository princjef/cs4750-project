angular.module('scoreApp').controller('OfficialEditCtrl', ['$scope', '$http', '$modalInstance', 'official', function($scope, $http, $modalInstance, official) {
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
	
	$scop.updateOfficial = function() {
		$http({
			method:'POST',
			url:'',
			data:$scope.form
		}).success(function(data) {
			
		}).error(function(err) {
			
		});
	};
}]);