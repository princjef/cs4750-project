angular.module('scoreApp').controller('TournamentDashCtrl', ['$scope', '$rootScope', '$window', 'dropdowns', '$http', '$routeParams', '$filter', function($scope, $rootScope, $window, dropdowns, $http, $routeParams, $filter) {
	$scope.form = {};
	// Get the tournament information
	$http({
		method:'GET',
		url:'/tournament/' + $routeParams.tournamentID + '/info',
		cache:true
	}).success(function(data) {
		$scope.tournament = data;
		$scope.tournamentDate = new Date(data.date);
	}).error(function(err) {
		console.log('Error getting tournament info');
	});
	
	$http({
		method:'GET',
		url:'/organization/' + $routeParams.tournamentID + '/getorganizers',
		cache:true
	}).success(function(data) {
		$scope.organizers = data;
	}).error(function(err) {
		console.log('Error getting organizers');
	});
	
	$http({
		method:'GET',
		url:'/tournament/' + $routeParams.tournamentID + '/teams',
		cache:true
	}).success(function(data) {
		$scope.teams = data;
	}).error(function(err) {
		console.log('Error getting teams');
	});
	
	$http({
		method:'GET',
		url:'/tournament/' + $routeParams.tournamentID + '/events',
		cache:true
	}).success(function(events) {
		$scope.eventStatuses = [{
			level:'Completed',
			events:$filter('status')(events, 'Completed')
		}, {
			level:'InProgress',
			events:$filter('status')(events, 'In Progress')
		}, {
			level:'NotStarted',
			events:$filter('status')(events, 'Not Started')
		}];
		$scope.total = $scope.eventStatuses[0].events.length + $scope.eventStatuses[1].events.length + $scope.eventStatuses[2].events.length;
		console.log('events ' + $scope.eventStatuses[0].events.length);
	}).error(function(err) {
		console.log('Error getting events');
	});
}]);