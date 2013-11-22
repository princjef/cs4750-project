angular.module('scoreApp').directive('animationShowHide', function() {
	return function(scope, element, attrs) {
		if(attrs.animationShowHide) {
			element.removeClass('no-display');
		} else {
			element.addClass('no-display');
		}

		scope.$watch(attrs.animationShowHide, function(newVal, oldVal) {
			if(newVal) {
				element.removeClass(attrs.hideAnimation);
				element.addClass(attrs.showAnimation);
				element.removeClass('no-display');
			} else {
				element.removeClass(attrs.showAnimation);
				element.addClass(attrs.hideAnimation);
			}
		});

		element.on('animationend webkitAnimationEnd onanimationend MSAnimationEnd', function() {
			console.log('ending');
			if(element.hasClass(attrs.hideAnimation)) {
				element.addClass('no-display');
			}
		});
	};
});