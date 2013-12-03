angular.module('scoreApp', ['ui.bootstrap', 'ngCookies', 'ngRoute'])
	.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
		$httpProvider.responseInterceptors.push('authInterceptor');

		$routeProvider
			.when('/', {
				templateUrl: '/partials/splash.html',
				controller: 'SplashCtrl'
			})
			.when('/tournament/:tournamentID/dashboard', {
					templateUrl: '/partials/tournament/dashboard.html',
					controller: 'TournamentDashCtrl'
				})
			.when('/organization/:organizationID/dashboard', {
					templateUrl: '/partials/organization/dashboard.html',
					controller: 'OrganizationDashCtrl'
				})
			.when('/login', {
					templateUrl: '/partials/account/loginPage.html',
					controller: 'AccountLoginPageCtrl'
				})
			.when('/account/update', {
					templateUrl: '/partials/account/update.html',
					controller: 'AccountUpdateCtrl'
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
