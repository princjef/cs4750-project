angular.module('scoreApp').controller('EventCreateCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.divisions = [
	{value:'A'}, 
	{value:'B'}, 
	{value:'C'}
	];
	$scope.division = $scope.divisions[0];
}]);

