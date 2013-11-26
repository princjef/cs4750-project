angular.module('scoreApp').service('user', ['$rootScope', '$http', '$q', function($rootScope, $http, $q) {
	return {
		current: function() {
			var d = $q.defer();
			$http({
				method: 'GET',
				url: '/account/current',
				cache: true
			}).success(function(user) {
				$rootScope.username = user.username;
				d.resolve(user);
			}).error(function(err) {
				d.reject(err);
			});
		}
	};
}]);