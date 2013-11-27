angular.module('scoreApp', ['ui.bootstrap', 'ngCookies'])
	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider
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
				})
			.when('/tournament/:tournamentID/scoring/:eventDivision/:eventName', {
					templateUrl: '/partials/scoring/event.html',
					controller: 'EventScoringCtrl'
				})
			;

		$locationProvider.html5Mode(true).hashPrefix('!');
}]);
