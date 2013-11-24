angular.module('scoreApp').controller('TournamentAddEventCtrl', ['$window', '$scope', 'dropdowns', function($window, $scope, dropdowns) {
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
		$scope.form.eventToAdd = eventNames[0];
	});
	
	dropdowns.getOfficials().then(function(data) {
		var names = [];
		data.forEach(function(entry) {
			var entryName = entry.name_first + ' ' + entry.name_last + ' (' + entry.officialID + ')';
			names.push({
				name:entryName,
				value:entry
			});
		});
		$scope.officials = names;
		// $scope.form.writerID = data[0].officialID;
		// $scope.form.supervisorID = data[0].officialID;
		
	});
	$scope.eventTypes = [
		{value:'Standard'}, 
		{value:'Trial'}
	];
	$scope.form.eventType = $scope.eventTypes[0];
}]);