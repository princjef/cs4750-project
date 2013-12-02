angular.module('scoreApp').controller('OfficialInfoCtrl', ['$scope', '$http', '$routeParams', '$location', '$modal', 'official', function($scope, $http, $routeParams, $location, $modal, official) {
	$scope.supervisedEvents = [];
	$scope.writtenEvents = [];
	
	$http({
		method:'GET',
		url:'/official/' + $routeParams.officialID + '/getbyid'
	}).success(function(data) {
		$scope.official = data;
	}).error(function(err) {
		console.log('Error getting official');
	});
	
	$http({
		method:'GET',
		url:'/official/' + $routeParams.officialID + '/coachedteams'
	}).success(function(data) {
		$scope.coachedTeams = data;
	}).error(function(err) {
		console.log('Error getting coached teams');
	});
	
	$http({
		method:'GET',
		url:'/official/' + $routeParams.officialID + '/writtenevents'
	}).success(function(data) {
		$scope.writtenEvents = data;
	}).error(function(err) {
		console.log('Error getting written events');
	});
	
	$http({
		method:'GET',
		url:'/official/' + $routeParams.officialID + '/supervisedevents'
	}).success(function(data) {
		$scope.supervisedEvents = data;
	}).error(function(err) {
		console.log('Error getting supervised events');
	});
	
	$scope.followPath =  function(path) {
		console.log(path);
		$location.path(path);
	};
	
	$scope.editOfficial = function() {
		official.set($scope.official);
		$modal.open({
			templateUrl:'/partials/official/edit.html',
			controller:'OfficialEditCtrl'
		});
	};
}]);