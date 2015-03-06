angular.module('scoreApp').controller('AccountLoginPageCtrl', ['$scope', 'api', '$location', '$routeParams', '$rootScope', 'alert', function($scope, api, $location, $routeParams, $rootScope, alert) {
	$scope.form = {};

	$scope.login = function() {
		api.login($scope.form).then(function(msg) {
			if ($routeParams.redirect) {
				$location.url($routeParams.redirect);
			} else {
				console.log('no redirect :(');
			}
			$rootScope.$emit('login');
		}, function(err) {
			alert.danger(err);
		});
	};

}]);
