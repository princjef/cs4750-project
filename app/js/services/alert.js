angular.module('scoreApp').service('alert', ['$rootScope', function($rootScope) {
	var createMessage = function(type, message, timeout) {
		$rootScope.message = {
			type: type,
			text: message
		};
	};

	return {
		success: function(message, timeout) {
			createMessage('alert-success', message, timeout);
		},
		info: function(message, timeout) {
			createMessage('alert-info', message, timeout);
		},
		warning: function(message, timeout) {
			createMessage('alert-info', message, timeout);
		},
		danger: function(message, timeout) {
			createMessage('alert-danger', message, timeout);
		}
	};
}]);