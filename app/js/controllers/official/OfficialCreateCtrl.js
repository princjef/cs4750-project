angular.module('scoreApp').controller('OfficialCreateCtrl', ['$scope', '$window', '$http', function($scope, $window, $http) {
	$scope.form = {};
	
	$scope.createOfficial = function() {
		$http({
			method:'POST',
			url:'/official/create',
			data:$scope.form
		}).success(function(res) {
			$window.alert('Created a new official');
		}).error(function(err) {
			console.log(err);
		});
	};
}]);