angular.module('scoreApp').factory('api', ['$q', '$http', 'user', function($q, $http, user) {

    return {

		login: function(formData) {
			var d = $q.defer();
			$http({
				method: 'POST',
				url: '/account/login/',
				data: formData
			}).success(function(res) {
				if (res.status) {
					d.resolve('Successfully logged in');
				} else {
					d.reject('Invalid login!');
				}
			}).error(function(err) {
				d.reject(err);
			});

			return d.promise;
		},

		logout: function() {
			var d = $q.defer();
			$http({
				method: 'POST',
				url: '/account/logout'
			}).success(function(res) {
				if (res.status) {
					d.resolve('Successfully logged out');
				} else {
					d.reject('Logout not successful');
				}
			}).error(function(err) {
				d.reject(err);
			});

			return d.promise;
		},

		createAccount: function(formData) {
			var d = $q.defer();
			$http({
				method: 'POST',
				url: '/account/create',
				data: formData
			}).success(function(res) {
				if (res.status) {
					user.current(); // Update current user.
					d.resolve('Successfully created account!');
				} else {
					d.reject('Account creation not successful!');
				}
			}).error(function(err) {
				d.reject(err);
			});

			return d.promise;
		},

		updatePassword: function(formData) {
			var d = $q.defer();
			$http({
				method: 'POST',
				url: '/account/updatePassword',
				data: formData
			}).success(function(res) {
				if (res.status) {
					d.resolve('Successfully updated password!');
				} else {
					d.reject('Password update not successful!');
				}
			}).error(function(err) {
				d.reject(err);
			});

			return d.promise;
		},

		updateEmail: function(formData) {
			var d = $q.defer();
			$http({
				method: 'POST',
				url: '/account/updateEmail',
				data: formData
			}).success(function(res) {
				if (res.status) {
					d.resolve('Successfully updated email!');
				} else {
					d.reject('Email update not successful');
				}
			}).error(function(err) {
				d.reject(err);
			});
		},

		getUserOrganizations: function(user) {
			var d = $q.defer();
			if (user.username) {
				$http({
					method: 'GET',
					url: '/account/' + user.username + '/organizations'
				}).success(function(organizations) {
					d.resolve(organizations);
				}).error(function(err) {
					console.log('Error getting user organizations')
					d.reject(err);
				});
			} else {
				d.resolve([]);
			}

			return d.promise;
		},

        getEvents: function(tournamentID) {
            var d = $q.defer();
            $http({
                method: 'GET',
                url: '/tournament/' + tournamentID + '/events'
            }).success(function(events) {
                d.resolve(events);
            }).error(function(err) {
                console.log('Error getting tournament events');
                d.reject(err);
            });

            return d.promise;
        },

        getEventScores: function(tournamentID, division, eventName) {
            var d = $q.defer();
            $http({
                method: 'GET',
                url: '/scoring/' + tournamentID + '/' + division + '/' + eventName + '/participators'
            }).success(function(scores) {
                d.resolve(scores);
            }).error(function(err) {
                console.log('Error fetching event scores');
                d.reject(err);
            });

            return d.promise;
        },

        getOverallTeamRankings: function(tournamentID, division) {
            var d = $q.defer();
            $http({
                method: 'GET',
                url: '/scoring/' + tournamentID + '/' + division + '/ranks'
            }).success(function(rankings) {
                d.resolve(rankings);
            }).error(function(err) {
                console.log('Error fetching team rankings');
                d.reject(err);
            });

            return d.promise;
        },

        getTournamentInfo: function(tournamentID) {
            var d = $q.defer();
            $http({
                method: 'GET',
                url: '/tournament/' + tournamentID + '/info'
            }).success(function(tournament) {
                d.resolve(tournament);
            }).error(function(err) {
                console.log('Error getting tournament info');
                d.reject(err);
            });

            return d.promise;
        }

    };

}]);
