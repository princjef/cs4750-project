angular.module('scoreApp').service('team', [function() {
	var team = {};
	
	return{
		set: function(teamData) {
			team = teamData;
		},
		get: function() {
			return team;
		}
	};
}]);