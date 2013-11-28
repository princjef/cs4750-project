angular.module('scoreApp').service('dropdowns', ['$q', '$http', function($q, $http) {
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
				deferred.reject(err);
			});
			return deferred.promise;
		},
		getOfficials: function() {
			var deferred = $q.defer();
			$http({
				method:'GET',
				url:'/official/all',
				cache:true
			}).success(function(data) {
				deferred.resolve(data);
			}).error(function(err) {
				deferred.reject(err);
			});
			return deferred.promise;
		},
		getScoreCodes: function() {
			var d = $q.defer();
			$http({
				method: 'GET',
				url: '/scoring/scoreCodes',
				cache: true
			}).success(function(data) {
				d.resolve(data);
			}).error(function(err) {
				d.reject(err);
			});
			return d.promise;
		},
		getTiers: function() {
			var d = $q.defer();
			$http({
				method: 'GET',
				url: '/scoring/tiers',
				cache: true
			}).success(function(tiers) {
				d.resolve(tiers);
			}).error(function(err) {
				d.reject(err);
			});
			return d.promise;
		},
		getEventStatuses: function() {
			var d = $q.defer();
			$http({
				method: 'GET',
				url: '/event/statuses',
				cache: true
			}).success(function(statuses) {
				d.resolve(statuses);
			}).error(function(err) {
				d.reject(err);
			});
			return d.promise;
		}
	};
}]);
