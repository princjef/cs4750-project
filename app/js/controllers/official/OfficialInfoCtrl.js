angular.module('scoreApp').controller('OfficialInfoCtrl', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
	$scope.supervisedEvents = [];
	$scope.writtenEvents = [];
	$scope.coachedTeams = [];
	$http({
		method:'GET',
		url:'/official/' + $routeParams.officialID + '/getbyid'
	}).success(function(data) {
		$scope.official = data;
	}).error(function(err) {
		console.log('Error getting official');
	});
}]);