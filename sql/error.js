var codes = require('./errorCodes.json');
var defaultMessage = 'The server encountered an error processing your request';

exports.message = function(error, overrides) {
	overrides = overrides || {};
	return overrides[error.code] || codes[error.code] || defaultMessage;
};