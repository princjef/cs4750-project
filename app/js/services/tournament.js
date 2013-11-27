angular.module('scoreApp').service('tournament', [function() {
	var tournament = {};

	return {
		set: function(tournamentData) {
			tournament = tournamentData;
		},
		get: function() {
			return tournament;
		}
	};
}]);