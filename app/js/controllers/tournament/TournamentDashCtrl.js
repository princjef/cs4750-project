angular.module('scoreApp').controller('TournamentDashCtrl', ['$scope', '$rootScope', '$window', 'dropdowns', '$http', '$routeParams', '$q', function($scope, $rootScope, $window, dropdowns, $http, $routeParams, $q) {
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
	
}]);