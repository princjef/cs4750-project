angular.module('scoreApp').filter('division', [function() {
	return function(inputs, value) {
		var result = [];
		if(inputs === undefined) {
			return inputs;
		} else {
			inputs.forEach(function(entry) {
				if(entry.division === value) {
					result.push(entry);
				}
			});
			console.log(result);
			return result;
		}
	};
}]);