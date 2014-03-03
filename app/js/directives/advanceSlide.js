angular.module('scoreApp').directive('advanceSlide', [function() {
	return {
		restrict: 'A',
		scope: {
			reveal: '&',
			nextSlide: '&',
			index: '=',
			maxIndex: '=',
			disabled: '='
		},
		link: function(scope, elem, attrs) {
			elem.bind("keyup", function(evt) {
				console.log("key pressed", evt.which);
				if([39,40,13].indexOf(evt.which) !== -1) {	// right arrow (39), down arrow (40), enter (13)
					console.log("right key pressed");
					if(!scope.disabled) {
						scope.$apply(function() {
							console.log("index:",scope.index,"maxindex:",parseInt(scope.maxIndex, 10));
							if(scope.index < parseInt(scope.maxIndex, 10)) {
								console.log("about to reveal");
								scope.reveal(scope.index);
								scope.index++;
							} else {
								scope.nextSlide();
								scope.index = 0;
							}
						});
					}
				}
			});
		}
	};
}]);