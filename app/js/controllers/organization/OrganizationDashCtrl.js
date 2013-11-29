angular.module('scoreApp').controller('OrganizationDashCtrl', ['$scope', '$http', '$routeParams', 'alert', function($scope, $http, $routeParams, alert) {
	$http({
		method: 'GET',
		url: '/organization/' + $routeParams.organizationID + '/info'
	}).success(function(res) {
		$scope.organization = res;
	}).error(function(err) {
		alert.danger(err);
	});

	$http({
		method: 'GET',
		url: '/organization/' + $routeParams.organizationID + '/admins'
	}).success(function(res) {
		$scope.admins = res;
	}).error(function(err) {
		alert.danger(err);
	});

	$http({
		method: 'GET',
		url: '/organization/' + $routeParams.organizationID + '/tournaments'
	}).success(function(res) {
		$scope.tournaments = res;
	}).error(function(err) {
		alert.danger(err);
	});
}]);