angular.module('scoreApp').directive('autosizeText', ['$window', function($window) {
	var resize = function(elem) {
		// console.log("elem:",elem.height(),", parent:", elem.parent().height());
		elem.css('font-size', elem.parent().height() + 'px');
		var iterations = 0;
		while((elem.height() < elem.parent().height() - 1 || elem.height() > elem.parent().height() + 1) && iterations < 100) {
			if(elem.height() < elem.parent().height() - 1) {
				elem.css('font-size', (parseInt(elem.css('font-size').slice(0, -2), 10) + 1) + 'px');
			} else {
				elem.css('font-size', (parseInt(elem.css('font-size').slice(0, -2), 10) - 1) + 'px');
			}
			iterations += 1;
			// console.log("elem:",elem.height(),", parent:", elem.parent().height(), "font-size:", (parseInt(elem.css('font-size').slice(0, -2), 10) + 1));
		}

		console.log("iterations", iterations);
	};

	return function(scope, elem, attrs) {
		var tryResize = function(elem, tries) {
			if(elem.text().length > 0) {
				resize(elem);
			} else if(tries < 3) {
				setTimeout(function() {
					tryResize(elem, tries + 1);
				}, 1000);
			}
		};

		tryResize(elem, 0);

		angular.element($window).bind('resize', function() {
			tryResize(elem, 0);
		});
	};
}]);