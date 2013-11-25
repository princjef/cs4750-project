angular.module('scoreApp', ['ui.bootstrap', 'ngCookies'])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/tournament/new', {
					templateUrl: '/partials/tournament/new.html',
					controller: 'TournamentCreateCtrl'
				})
			.when('/tournament/newevent', {
					templateUrl: '/partials/tournament/newevent.html',
					controller: 'TournamentAddEventCtrl' 
			})
			.when('/organization/new', {
					templateUrl: '/partials/organization/new.html',
					controller: 'OrganizationCreateCtrl'
				})
			.when('/event/new', {
					templateUrl: '/partials/event/new.html',
					controller: 'EventCreateCtrl'
				})
			.when('/account/new', {
					templateUrl: '/partials/account/new.html',
					controller: 'AccountCreateCtrl'
				})
			.when('/login', {
					templateUrl: '/partials/account/login.html',
					controller: 'AccountLoginCtrl'
				})
			.when('/official/new', {
					templateUrl: '/partials/official/new.html',
					controller: 'OfficialCreateCtrl'	
				});

		$locationProvider.html5Mode(true).hashPrefix('!');
}]);
