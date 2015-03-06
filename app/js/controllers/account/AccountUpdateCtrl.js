angular.module('scoreApp').controller('AccountUpdateCtrl',
	['$scope', 'api', 'alert', 'user', function($scope, api, alert, user) {

	$scope.form = {};

	$scope.updatePassword = function() {
		api.updatePassword($scope.form).then(function(msg) {
			alert.success(msg);
		}, function(err) {
			alert.error(err);
		});
	};

	$scope.updateEmail = function() {
		api.updateEmail($scope.form).then(function(msg) {
			alert.success(msg);
		}, function(err) {
			alert.danger(err);
		});
	};
}]);
