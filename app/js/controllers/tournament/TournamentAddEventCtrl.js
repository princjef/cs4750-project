angular.module('scoreApp').controller('TournamentAddEventCtrl', ['$window', '$scope', '$http', 'dropdowns', function($window, $scope, $http, dropdowns) {
	$scope.form = {};
	dropdowns.getTournamentEvents().then(function(data) {
		eventNames = [];
		data.forEach(function(entry) {
			var entryName = entry.eventName + ' (Div: ' + entry.division + ')';
			eventNames.push({
				name:entryName,
				value:entry
			});	
		});
		$scope.events = eventNames;
		$scope.form.eventToAdd = eventNames[0].value;
	});
	
	dropdowns.getOfficials().then(function(data) {
		var names = [];
		data.forEach(function(entry) {
			var entryName = entry.name_first + ' ' + entry.name_last + ' (' + entry.officialID + ')';
			names.push({
				name:entryName,
				value:entry.officialID
			});
		});
		$scope.officials = names;
		
	});
	$scope.eventTypes = [
		{value:'Standard'}, 
		{value:'Trial'}
	];
	$scope.form.eventType = $scope.eventTypes[0];
	
	$scope.form.highTiebreakWins = "1";
	$scope.form.highScoreWins = "1";
	$scope.form.scored = "0";
	
	$scope.addEvent = function() {
		$scope.officials.forEach(function(entry) {
			if(entry.name === $scope.supervisorName) {
				$scope.form.supervisorID = entry.value;
			}
			if(entry.name === $scope.writerName) {
				$scope.form.writerID = entry.value;
			}
		});
		
		$scope.form.tournamentID = 45;
		$http({
			method:'POST',
			url:'/tournament/addevent',
			data:$scope.form})
			.success(function (res) {
				$window.alert('Successfully added event to tournament');})
			.error(function (error) {
				console.log(err);
			});
	};
}]);