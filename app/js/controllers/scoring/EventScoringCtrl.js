angular.module('scoreApp').controller('EventScoringCtrl', ['$scope', '$http', '$routeParams', 'alert', 'dropdowns', function($scope, $http, $routeParams, alert, dropdowns) {
	$scope.form = {};
	
	dropdowns.getScoreCodes().then(function(data) {
		$scope.scoreCodes = data;
	});

	$http({
		method: 'GET',
		url: '/tournament/' + $routeParams.tournamentID + '/info',
	}).success(function(res) {
		$scope.tournament = res;
	}).error(function(err) {
		alert.danger(err);
	});

	$http({
		method: 'GET',
		url: '/tournament/' + $routeParams.tournamentID + '/' + $routeParams.eventDivision + '/' + $routeParams.eventName + '/participators'
	}).success(function(res) {
		$scope.event = res.event;
		$scope.participators = res.participators;
	}).error(function(err) {
		alert.danger(err);
	});
}]);