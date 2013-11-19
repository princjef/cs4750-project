angular.module('scoreApp', ['ui.bootstrap', 'ngCookies'])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/tournament/new', {
					templateUrl: '/partials/tournament/new.html',
					controller: 'TournamentCreateCtrl'
				})
			.when('/organization/new', {
					templateUrl: '/partials/organization/new.html',
					controller: 'OrganizationCreateCtrl'
				})
			.when('/event/new', {
					templateUrl: '/partials/event/new.html',
					controller: 'EventCreateCtrl'
				});
			.when('/account/new', {
					templateUrl: '/partials/account/new.html',
					controller: 'AccountCreateCtrl'
				})

		$locationProvider.html5Mode(true).hashPrefix('!');
}]);
