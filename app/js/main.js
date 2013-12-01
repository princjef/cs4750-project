angular.module('scoreApp', ['ui.bootstrap', 'ngCookies', 'ngRoute'])
	.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
		$httpProvider.responseInterceptors.push('authInterceptor');

		$routeProvider
			.when('/', {
				templateUrl: '/partials/splash.html',
				controller: 'SplashCtrl'
			})
			.when('/tournament/new', {
					templateUrl: '/partials/tournament/new.html',
					controller: 'TournamentCreateCtrl'
				})
			.when('/tournament/:tournamentID/newevent', {
					templateUrl: '/partials/tournament/newevent.html',
					controller: 'TournamentAddEventCtrl'
			})
			.when('/tournament/:tournamentID/dashboard', {
					templateUrl: '/partials/tournament/dashboard.html',
					controller: 'TournamentDashCtrl'
				})
			.when('/tournament/:tournamentID/newteam', {
					templateUrl: '/partials/team/newteam.html',
					controller: 'TeamAddCtrl'
				})
			.when('/organization/new', {
					templateUrl: '/partials/organization/new.html',
					controller: 'OrganizationCreateCtrl'
				})
			.when('/organization/:organizationID/dashboard', {
					templateUrl: '/partials/organization/dashboard.html',
					controller: 'OrganizationDashCtrl'
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
			.when('/account/update', {
					templateUrl: '/partials/account/update.html',
					controller: 'AccountUpdateCtrl'
				})
			.when('/official/new', {
					templateUrl: '/partials/official/new.html',
					controller: 'OfficialCreateCtrl'
				})
			.when('/official/:officialID/info', {
					templateUrl: '/partials/official/info.html',
					controller: 'OfficialInfoCtrl'
				})
			.when('/official/lookup', {
				templateUrl:'/partials/official/lookup.html',
				controller: 'OfficialLookupCtrl'
				})
			.when('/tournament/:tournamentID/scoring/:eventDivision/:eventName', {
					templateUrl: '/partials/scoring/event.html',
					controller: 'EventScoringCtrl'
				})
			;

		$locationProvider.html5Mode(true).hashPrefix('!');
}]);
