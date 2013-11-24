angular.module('scoreApp').controller('PageCtrl', ['$scope', '$http', function($scope, $http) {

	$http({
		method: 'POST',
		url: '/account/current'
	}).success(function(res) {
		$scope.username = res.username;
	}).error(function(err) {
		console.log(err);
	});

}]);