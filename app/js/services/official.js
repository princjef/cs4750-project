angular.module('scoreApp').service('official', [function() {
	var official = {};
	
	return{
		set: function(officialData) {
			official = officialData;
		},
		get: function() {
			return official;
		}
	};
}]);