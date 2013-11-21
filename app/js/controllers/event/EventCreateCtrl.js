angular.module('scoreApp').controller('EventCreateCtrl', ['$scope', '$http', '$window', function($scope, $http, $window) {
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
			data:$scope.form})
			.success(function (res) {
				$window.alert('Successfully created event');})
			.error(function (error) {
				console.log(err);
			});
	};
}]);

