angular.module('scoreApp').controller('TournamentAddEventCtrl', ['$window', '$scope', '$http', '$modalInstance', 'dropdowns', 'tournament', 'alert', function($window, $scope, $http, $modalInstance, dropdowns, tournament, alert) {
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

	$scope.createForm = {
		active: false
	};

	$scope.divisions = ['A', 'B', 'C'];
	$scope.tournament = tournament.get();

	$scope.form = {};
	$scope.form.tournamentID = $scope.tournament.id;
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
	
	$scope.form.highTiebreakWins = '1';
	$scope.form.highScoreWins = '1';
	
	$scope.form.highScoreWinsHighTrigger = true;
	$scope.form.highScoreWinsLowTrigger = false;
	$scope.form.highTiebreakWinsHighTrigger = true;
	$scope.form.highTiebreakWinsLowTrigger = false;

	$scope.updateCheckboxes = function() {
		if($scope.form.highScoreWins === '1' && (!$scope.form.highScoreWinsHighTrigger || $scope.form.highScoreWinsLowTrigger)) {
			$scope.form.highScoreWins = '0';
			$scope.form.highScoreWinsHighTrigger = false;
			$scope.form.highScoreWinsLowTrigger = true;
		} else if($scope.form.highScoreWins === '0' && ($scope.form.highScoreWinsHighTrigger || !$scope.form.highScoreWinsLowTrigger)) {
			$scope.form.highScoreWins = '1';
			$scope.form.highScoreWinsHighTrigger = true;
			$scope.form.highScoreWinsLowTrigger = false;
		}

		if($scope.form.highTiebreakWins === '1' && (!$scope.form.highTiebreakWinsHighTrigger || $scope.form.highTiebreakWinsLowTrigger)) {
			$scope.form.highTiebreakWins = '0';
			$scope.form.highTiebreakWinsHighTrigger = false;
			$scope.form.highTiebreakWinsLowTrigger = true;
		} else if($scope.form.highTiebreakWins === '0' && ($scope.form.highTiebreakWinsHighTrigger || !$scope.form.highTiebreakWinsLowTrigger)) {
			$scope.form.highTiebreakWins = '1';
			$scope.form.highTiebreakWinsHighTrigger = true;
			$scope.form.highTiebreakWinsLowTrigger = false;
		}
	};

	$scope.addEvent = function() {
		$scope.officials.forEach(function(entry) {
			if(entry.name === $scope.supervisorName) {
				$scope.form.supervisorID = entry.value;
			}
			if(entry.name === $scope.writerName) {
				$scope.form.writerID = entry.value;
			}
		});

		if($scope.createForm.active) {
			console.log("Creating new event");
			$http({
				method: 'POST',
				url: '/event/create',
				data: $scope.createForm
			}).success(function (res) {
				$scope.form.eventToAdd.division = $scope.createForm.division;
				$scope.form.eventToAdd.eventName = $scope.createForm.name;
				$scope.submitAddEventForm();
			}).error(function (err) {
				alert.danger(err);
			});
		} else {
			$scope.submitAddEventForm();
		}
	};

	$scope.submitAddEventForm = function() {
		console.log($scope.form);
		$http({
			method:'POST',
			url:'/tournament/addevent',
			data: $scope.form
		}).success(function (event) {
			alert.success('Successfully added event to tournament');
			$modalInstance.close(event);
		}).error(function (err) {
			alert.danger(err);
		});
	};
}]);