angular.module('scoreApp').controller('TeamAddCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
	$scope.form = {};
	$scope.tournamentID = $routeParams.tournamentID;
}]);