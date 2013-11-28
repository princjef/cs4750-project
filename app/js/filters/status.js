angular.module('scoreApp').filter('status', [function() {
	return function(inputs, value) {
		var result = [];
		if(inputs === undefined) {
			return inputs;
		} else {
			inputs.forEach(function(entry) {
				if(entry.status === value) {
					result.push(entry);
				}
			});
			return result;
		}
	};
}]);