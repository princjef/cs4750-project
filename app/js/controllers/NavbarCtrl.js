angular.module('scoreApp').controller('NavbarCtrl', ['$scope', '$http', '$modal', '$rootScope', '$location', 'user', 'alert', function($scope, $http, $modal, $rootScope, $location, user, alert) {
	$scope.user = {};

	$scope.getUser = function() {
		user.current().then(function(user) {
			$scope.user = user;
			if(user.username) {
				$http({
					method: 'GET',
					url: '/account/' + user.username + '/organizations'
				}).success(function(organizations) {
					$scope.user.organizations = organizations;
				}).error(function(err) {
					alert.danger(err);
				});
			}
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
		$http({
			method: 'POST',
			url: '/account/logout'
		}).success(function(res) {
			if (res.status) {
				alert.success('Successfully logged out');
				$scope.getUser();
			}
			else {
				alert.danger('Logout not successful');
			}
		}).error(function(err) {
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