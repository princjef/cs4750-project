angular.module('scoreApp').factory('authInterceptor', ['$location', '$q', 'alert', function($location, $q, alert) {
	return function(promise) {
		return promise.then(
			function(response) {	// Success
				return response;
			}, function(response) {	// Error
				if(response.status === 401) {
					alert.danger('You do not have access to this page');
					$location.path('/');
					return $q.reject(response);
				} else {
					return $q.reject(response);
				}
			}
		);
	};
}]);
