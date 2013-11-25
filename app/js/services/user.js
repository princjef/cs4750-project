angular.module('scoreApp').service('user', ['$rootScope', '$http', function($rootScope, $http) {
	var getUser = function() {
		if ($rootscope.username !== res.username) {
			$http({
				method: 'GET',
				url: '/account/current'
			}).success(function(res) {
				$rootScope.username = res.username;
			}).error(function(err) {
				console.log(err);	// Don't know if you can log to console from here? Ask Jeff.
			});
		}
	};

	return {
		current: function() {
			$rootscope.console.log('hello');
			getUser();
		}
	};
}]);