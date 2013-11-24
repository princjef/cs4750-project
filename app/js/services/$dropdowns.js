angular.module('scoreApp').service('$dropdowns', ['$q', '$http', function($q, $http) {
	return {
		getTournamentLevels: function() {
			var d = $q.defer();
			$http({
				method: 'GET',
				url: '/tournament/levels',
				cache: true
			}).success(function(data) {
				d.resolve(data);
			}).error(function(err) {
				d.reject(err);
			});
			return d.promise;
		},
		getTournamentEvents: function() {
			var deferred = $q.defer();
			$http({
				method: 'GET',
				url: '/event/all',
				cache: true
			}).success(function(data) {
				deferred.resolve(data);
			}).error(function(err) {
				deferred.reject(data);
			});
			return deferred.promise;
		}
	};
}]);
