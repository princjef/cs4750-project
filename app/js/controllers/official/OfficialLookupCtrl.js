angular.module('scoreApp').controller('OfficialLookupCtrl', ['$scope', '$http', function($scope, $http) {
	$http({
		method:'GET',
		url:'/official/all'
	}).success(function(data) {
		$scope.officials = data;
	}).error(function(err) {
		console.log('Could not Get Officials');
	});
}]);