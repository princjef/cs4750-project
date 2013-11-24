angular.module('scoreApp').controller('TournamentAddEventCtrl', ['$window', '$scope', '$dropdowns', function($window, $scope, $dropdowns) {
	$scope.form = {};
	$dropdowns.getTournamentEvents().then(function(data) {
		$scope.events = data;
		$scope.form.eventToAdd = data[0];
	});
	$scope.eventTypes = [
		{value:'Standard'}, 
		{value:'Trial'}
	];
	$scope.form.eventType = $scope.eventTypes[0];
}]);