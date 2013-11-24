angular.module('scoreApp').controller('PageCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {

	$http({
		method: 'GET',
		url: '/account/current'
	}).success(function(res) {
		$rootScope.username = res.username;
	}).error(function(err) {
		console.log(err);
	});

}]);