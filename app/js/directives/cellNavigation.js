angular.module('scoreApp').directive('cellNavigation', ['$timeout', function($timeout) {
	return {
		restrict: 'A',
		scope: {
			row: '=',
			col: '=',
			rowCount: '=',
			colCount: '=',
			focusCell: '='
		},
		link: function(scope, elem, attrs) {
			scope.$watch('focusCell', function(newVal) {
				if(newVal.row === scope.row && newVal.col === Number(scope.col)) {
					$timeout(function() {
						elem[0].focus();
					});
				}
			}, true);

			elem.bind("keydown", function(evt) {
				if([40,13].indexOf(evt.which) !== -1) {	// down arrow (40) or enter (13)
					if(scope.row >= scope.rowCount - 1) {
						if(Number(scope.col) >= Number(scope.colCount) - 1) {
							scope.$apply(function() {
								scope.focusCell.row = 0;
								scope.focusCell.col = 0;
							});
						} else {
							scope.$apply(function() {
								scope.focusCell.row = 0;
								scope.focusCell.col = Number(scope.col) + 1;
							});
						}
					} else {
						scope.$apply(function() {
							scope.focusCell.row = scope.row + 1;
							scope.focusCell.col = Number(scope.col);
						});
					}
				} else if(evt.which === 38) {	// up arrow (38)
					if(scope.row <= 0) {
						if(Number(scope.col) <= 0) {
							scope.$apply(function() {
								scope.focusCell.row = scope.rowCount - 1;
								scope.focusCell.col = Number(scope.colCount) - 1;
							});
						} else {
							scope.$apply(function() {
								scope.focusCell.row = scope.rowCount - 1;
								scope.focusCell.col = Number(scope.col) - 1;
							});
						}
					} else {
						scope.$apply(function() {
							scope.focusCell.row = scope.row - 1;
							scope.focusCell.col = Number(scope.col);
						});
					}
				}
			});
		}
	};
}]);