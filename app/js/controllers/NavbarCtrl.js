angular.module('scoreApp').controller('NavbarCtrl', ['$scope', 'api', '$modal', '$rootScope', '$location', 'user', 'alert', function($scope, api, $modal, $rootScope, $location, user, alert) {
	$scope.user = {};

	$scope.getUser = function() {
		user.current().then(function(user) {
			$scope.user = user;
			api.getUserOrganizations(user).then(function(organizations) {
				$scope.user.organizations = organizations;
			}, function(err) {
				alert.danger(err);
			});
		});
	};

	$scope.getUser();

	$rootScope.$on('login', function() {
		$scope.getUser();
	});

	$rootScope.$on('updateUser', function() {
		$scope.getUser();
	});

	$scope.openLogin = function() {
		var loginForm = $modal.open({
			templateUrl: '/partials/account/login.html',
			controller: 'AccountLoginCtrl'
		});

		loginForm.result.then(function() {
			$scope.getUser();
		});
	};

	$scope.logout = function() {
		api.logout().then(function(msg) {
			alert.success(msg);
			$scope.getUser();
		}, function(err) {
			alert.danger(err);
		});
	};

	$scope.createOrganization = function() {
		var newOrganization = $modal.open({
			templateUrl: '/partials/organization/new.html',
			controller: 'OrganizationCreateCtrl'
		});

		newOrganization.result.then(function(organization) {
			$scope.user.organizations.push(organization);
			$location.path('/organization/' + organization.id + '/dashboard');
		});
	};
	
	$scope.createOfficial = function() {
		var newOfficial = $modal.open({
			templateUrl: '/partials/official/new.html',
			controller: 'OfficialCreateCtrl'
		});
	};
}]);
