angular.module('scoreApp').service('userCache', ['$rootScope', function($rootScope) {
	var cachedUser = {};

	$rootScope.$on('fetchUser', function(event, user) {
		cachedUser = user;
	});

	return {
		get: function() {
			return cachedUser;
		}
	};
}]);