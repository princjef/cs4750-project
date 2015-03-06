angular.module('scoreApp').controller('SplashCtrl', ['$scope', '$location', 'api', 'userCache', function($scope, $location, api, userCache) {

	var user = userCache.get();

	if (user.username) {
		api.getUserOrganizations(user).then(function(organizations) {
			if (organizations.length > 0) {
				$location.path('/organization/' + organizations[0].id + '/dashboard');
			}
		});
	}

}]);
