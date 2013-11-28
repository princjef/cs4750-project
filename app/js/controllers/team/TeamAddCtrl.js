angular.module('scoreApp').controller('TeamAddCtrl', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http) {
	$scope.form = {};
	$scope.tournamentID = $routeParams.tournamentID;
	$scope.states = ['AL','AK','AZ','AR','CA','CO','CT','DC','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME',
					'MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI',
					'SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
	$scope.form.state = $scope.states[0];
	$scope.divisions = ['A', 'B', 'C'];
	$scope.form.division = $scope.divisions[0];
}]);