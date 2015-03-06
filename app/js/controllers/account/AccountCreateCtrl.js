angular.module('scoreApp').controller('AccountCreateCtrl',
	['$scope', 'api', 'alert', 'user', function($scope, api, alert, user) {

	$scope.form = {};

	$scope.createAccount = function() {
		api.createAccount($scope.form).then(function(msg) {
			alert.success(msg);
		}, function(err) {
			alert.danger(err);
		});
	};
}]);
