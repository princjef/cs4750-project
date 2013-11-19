angular.module('scoreApp').controller('EventCreateCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.form = {};
	
	$scope.divisions = [
	{value:'A'}, 
	{value:'B'}, 
	{value:'C'}
	];
	
	$scope.form.division = $scope.divisions[0];
	
	$scope.create = function() {
		$http({
			method:'POST',
			url:'/event/create',
			data:$scope.form});
	};
}]);

