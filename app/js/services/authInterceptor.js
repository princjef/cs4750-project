angular.module('scoreApp').factory('authInterceptor', ['$rootScope', '$location', '$q', 'alert', 'userCache', function($rootScope, $location, $q, alert, userCache) {
	return function(promise) {
		return promise.then(
			function(response) {	// Success
				return response;
			}, function(response) {	// Error
				if(response.status === 401) {
					alert.danger('You do not have access to this page');
					if(!userCache.get().username) {
						if($location.path() !== '/login') {
							$location.search('redirect', $location.path());
							$location.path('/login');
						}
					} else {
						$location.path('/401');
					}
					return $q.reject(response);
				} else {
					return $q.reject(response);
				}
			}
		);
	};
}]);
